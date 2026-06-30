/** @typedef {{ ASSETS: { fetch: typeof fetch } }} Env */

/** @type {import("cloudflare:workers").ExportedHandler<Env>} */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.davidweng.eu.org") {
      url.hostname = "davidweng.eu.org";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  }
};