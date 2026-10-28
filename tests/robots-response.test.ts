import { GET } from "@/src/pages/robots.txt";

test("robots response advertises the sitemap and content signal", async () => {
  const response = await GET({} as never);
  expect(response.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
  expect(await response.text()).toContain("Sitemap: https://davidweng.eu.org/sitemap.xml\n\nContent-Signal: ai-train=no, search=yes, ai-input=yes");
});
