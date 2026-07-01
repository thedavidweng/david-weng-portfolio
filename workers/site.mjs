/**
 * Legacy redirect helper — production redirects are handled at the Cloudflare Zone
 * layer (always_use_https + www→apex Redirect Rule). See scripts/apply-cf-zone-free-tier.mjs.
 *
 * Deploy uses assets-only Workers Static Assets (no `main` in wrangler.jsonc), so this
 * script is not invoked in production. Kept for local redirect behavior documentation.
 */

/** @typedef {{ ASSETS: { fetch: typeof fetch } }} Env */

/** @type {import("cloudflare:workers").ExportedHandler<Env>} */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let shouldRedirect = false;

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
