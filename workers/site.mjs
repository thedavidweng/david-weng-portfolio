/** @typedef {{ ASSETS: { fetch: typeof fetch } }} Env */

/** @type {import("cloudflare:workers").ExportedHandler<Env>} */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let shouldRedirect = false;

    // Minimize redirects: force HTTPS and apex domain in a single jump
    if (url.protocol === "http:") {
      url.protocol = "https:";
      shouldRedirect = true;
    }

    if (url.hostname === "www.davidweng.eu.org") {
      url.hostname = "davidweng.eu.org";
      shouldRedirect = true;
    }

    if (shouldRedirect) {
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  }
};