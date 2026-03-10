import { getProjectBySlug } from "@/lib/projects";

test("returns project content by slug", () => {
  expect(getProjectBySlug("fraud")?.slug).toBe("fraud");
});
