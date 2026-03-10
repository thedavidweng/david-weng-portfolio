import { getProjectBySlug } from "@/lib/projects";

test("returns project content by slug", () => {
  expect(getProjectBySlug("afterimage-city")?.slug).toBe("afterimage-city");
});
