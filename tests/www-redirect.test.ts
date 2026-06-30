import worker from "../workers/site.mjs";

const APEX = "https://davidweng.eu.org";
const WWW = "https://www.davidweng.eu.org";

test("redirects www host to apex with path and query preserved", async () => {
  const response = await worker.fetch(
    new Request(`${WWW}/projects/fraud/?lang=en`),
    { ASSETS: { fetch: async () => new Response("asset") } }
  );

  expect(response.status).toBe(301);
  expect(response.headers.get("Location")).toBe(`${APEX}/projects/fraud/?lang=en`);
});

test("serves assets on apex host", async () => {
  const assetResponse = new Response("homepage", { status: 200 });
  const response = await worker.fetch(new Request(`${APEX}/`), {
    ASSETS: { fetch: async () => assetResponse }
  });

  expect(response).toBe(assetResponse);
});