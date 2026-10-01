import { initGithubLive } from "@/src/scripts/github-live";

const repos = {
  total_count: 2,
  incomplete_results: false,
  items: [
    { name: "alpha", stargazers_count: 5, pushed_at: "2024-01-01T00:00:00Z" },
    { name: "beta", stargazers_count: 0, pushed_at: "2024-06-01T00:00:00Z" }
  ]
};

const respond = (body: unknown, ok = true) => Promise.resolve({ ok, status: ok ? 200 : 403, json: () => Promise.resolve(body) });

function mockFetch(repoResponse: Promise<unknown>, prResponse: Promise<unknown>) {
  const fetch = vi.fn((url: string) => (url.includes("search/repositories") ? repoResponse : prResponse));
  vi.stubGlobal("fetch", fetch);
  return fetch;
}

function mount(user = "dw") {
  document.documentElement.lang = "en";
  document.body.innerHTML = `
    <div data-live data-github-user="${user}" data-updated-template="updated {time}" data-pushed-template="{repo} pushed {time}">
      <span data-activity>idle</span>
      <b data-stat="repos">?</b><b data-stat="stars">?</b><b data-prs>?</b>
      <time data-ago datetime="2020-01-01T00:00:00Z"></time>
      <div data-repo="alpha"><i data-stars><span>?</span></i><time data-ago datetime="2000-01-01T00:00:00Z"></time></div>
      <div data-repo="beta"><i data-stars><span>?</span></i></div>
      <div data-repo="gamma"><i data-stars><span>?</span></i></div>
      <div data-repo="alpha"></div>
    </div>`;
}

const text = (selector: string) => document.querySelector(selector)!.textContent;

afterEach(() => vi.unstubAllGlobals());

test("does nothing without a live root or GitHub user", () => {
  const fetch = mockFetch(respond(repos), respond({ total_count: 1 }));
  document.body.innerHTML = "";
  initGithubLive();
  mount("");
  initGithubLive();
  expect(fetch).not.toHaveBeenCalled();
});

test("fills stars, push times, activity, totals, and merged PRs from the GitHub API", async () => {
  const fetch = mockFetch(respond(repos), respond({ total_count: 7 }));
  mount();
  initGithubLive();
  expect(text("time[data-ago]")).toMatch(/^updated .+ ago$/);
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining("search/repositories?q=user%3Adw%20fork%3Afalse"));
  await vi.waitFor(() => expect(text("[data-prs]")).toBe("7"));
  expect(text('[data-stat="repos"]')).toBe("2");
  expect(text('[data-stat="stars"]')).toBe("5");
  expect(text("[data-activity]")).toMatch(/^beta pushed /);
  expect(text('[data-repo="alpha"] [data-stars]')).toBe("5");
  expect(document.querySelector('[data-repo="beta"] [data-stars]')).toHaveAttribute("data-zero");
  expect(document.querySelector('[data-repo="alpha"] [data-stars]')).not.toHaveAttribute("data-zero");
  expect(document.querySelector<HTMLTimeElement>('[data-repo="alpha"] time')!.dateTime).toBe("2024-01-01T00:00:00Z");
  expect(text('[data-repo="gamma"] [data-stars]')).toBe("?");
});

test("partial search results keep the static totals", async () => {
  mockFetch(respond({ ...repos, total_count: 3 }), respond({ total_count: 1 }));
  mount();
  initGithubLive();
  await vi.waitFor(() => expect(text("[data-activity]")).toMatch(/^beta/));
  expect(text('[data-stat="repos"]')).toBe("?");
  expect(text('[data-stat="stars"]')).toBe("?");
});

test("failed requests leave the static content untouched", async () => {
  const fetch = mockFetch(respond({}, false), Promise.reject(new Error("offline")));
  mount();
  document.querySelector("[data-live]")!.removeAttribute("data-updated-template");
  initGithubLive();
  expect(text("time[data-ago]")).toMatch(/ago$/);
  await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
  await new Promise((resolve) => setTimeout(resolve));
  expect(text("[data-activity]")).toBe("idle");
  expect(text("[data-prs]")).toBe("?");
});
