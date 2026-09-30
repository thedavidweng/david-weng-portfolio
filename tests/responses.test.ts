import { markdownResponse, textResponse } from "@/lib/responses";

test("markdownResponse and textResponse set charset Content-Type only", async () => {
  const md = markdownResponse("# hi");
  const txt = textResponse("plain");

  expect(md.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
  expect(txt.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
  expect(md.headers.get("Cache-Control")).toBeNull();
  expect(txt.headers.get("Cache-Control")).toBeNull();
  expect(await md.text()).toBe("# hi");
  expect(await txt.text()).toBe("plain");
});
