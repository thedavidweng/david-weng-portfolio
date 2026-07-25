import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { carouselProjects } from "@/content/carousel-projects";
import { projects } from "@/content/projects";
import {
  buildCarouselProjects,
  formatCarouselProjectsModule
} from "@/lib/build-carousel-projects";

test("carousel-projects.ts stays in sync with projects.ts", () => {
  expect(carouselProjects).toEqual(buildCarouselProjects(projects));
});

test.runIf(process.env.GENERATE_CAROUSEL === "1")(
  "regenerate carousel-projects.ts from projects.ts",
  () => {
    const outputPath = join(process.cwd(), "content/carousel-projects.ts");
    const generated = buildCarouselProjects(projects);

    writeFileSync(outputPath, formatCarouselProjectsModule(generated));
  }
);
