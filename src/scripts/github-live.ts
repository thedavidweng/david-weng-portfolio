import { fillTemplate, formatAgo } from "@/lib/relative-time";

type Repo = { name: string; stargazers_count: number; pushed_at: string };
type RepoSearch = { total_count: number; incomplete_results: boolean; items: Repo[] };

const github = <T>(path: string) =>
  fetch(`https://api.github.com/${path}`).then((res) => (res.ok ? (res.json() as Promise<T>) : Promise.reject(res.status)));

export function initGithubLive() {
  const lang = document.documentElement.lang;
  const root = document.querySelector<HTMLElement>("[data-live]");
  if (!root?.dataset.githubUser) return;
  const { githubUser: user, updatedTemplate = "{time}", pushedTemplate = "{repo}" } = root.dataset;

  const renderTimes = () => {
    for (const time of document.querySelectorAll<HTMLTimeElement>("time[data-ago]")) {
      time.textContent = fillTemplate(updatedTemplate, { time: formatAgo(time.dateTime, lang) });
    }
  };
  renderTimes();

  github<RepoSearch>(`search/repositories?q=${encodeURIComponent(`user:${user} fork:false`)}&per_page=100`)
    .then(({ total_count, incomplete_results, items }) => {
      const repos = new Map(items.map((repo) => [repo.name, repo]));
      for (const row of document.querySelectorAll<HTMLElement>("[data-repo]")) {
        const repo = repos.get(row.dataset.repo!);
        if (!repo) continue;
        const stars = row.querySelector<HTMLElement>("[data-stars]");
        if (stars) {
          stars.querySelector("span")!.textContent = String(repo.stargazers_count);
          stars.toggleAttribute("data-zero", repo.stargazers_count === 0);
        }
        const time = row.querySelector("time");
        if (time) time.dateTime = repo.pushed_at;
      }
      renderTimes();

      const latest = items.reduce((a, b) => (a.pushed_at > b.pushed_at ? a : b));
      const activity = document.querySelector("[data-activity]");
      if (activity) activity.textContent = fillTemplate(pushedTemplate, { time: formatAgo(latest.pushed_at, lang), repo: latest.name });

      if (incomplete_results || items.length < total_count) return;
      document.querySelector('[data-stat="repos"]')!.textContent = String(total_count);
      document.querySelector('[data-stat="stars"]')!.textContent = String(items.reduce((sum, repo) => sum + repo.stargazers_count, 0));
    })
    .catch(() => {});

  github<{ total_count: number }>(`search/issues?q=${encodeURIComponent(`author:${user} type:pr is:merged -user:${user}`)}&per_page=1`)
    .then(({ total_count }) => {
      for (const el of document.querySelectorAll("[data-prs]")) el.textContent = String(total_count);
    })
    .catch(() => {});
}
