const PAGES_ORIGIN = "https://david-weng-portfolio-astro.pages.dev";

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    const target = new URL(incoming.pathname + incoming.search, PAGES_ORIGIN);
    const headers = new Headers(request.headers);
    headers.set("Host", new URL(PAGES_ORIGIN).host);

    return fetch(
      new Request(target, {
        method: request.method,
        headers,
        body: request.body,
        redirect: "manual",
      }),
    );
  },
};