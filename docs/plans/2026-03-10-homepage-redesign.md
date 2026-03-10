# Homepage Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a cinematic, employer-facing portfolio homepage for David Weng with a filterable project wall, structured service messaging, and responsive project detail experiences.

**Architecture:** Use a Next.js App Router single-page homepage with data-driven sections and a structured project content source. Keep the homepage lean and route detailed project content through either modal overlays backed by the URL or dedicated project pages. Treat performance and responsive media handling as first-class constraints from the start.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion, MDX or typed local content modules, next/image

---

### Task 1: Scaffold the homepage app shell

**Files:**
- Create: `Personal-Website/package.json`
- Create: `Personal-Website/next.config.ts`
- Create: `Personal-Website/tsconfig.json`
- Create: `Personal-Website/postcss.config.js`
- Create: `Personal-Website/tailwind.config.ts`
- Create: `Personal-Website/app/layout.tsx`
- Create: `Personal-Website/app/page.tsx`
- Create: `Personal-Website/app/globals.css`

**Step 1: Write the failing test**

Create a basic app smoke test once the test runner is chosen.

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

test("renders homepage hero CTA", () => {
  render(<HomePage />);
  expect(screen.getByRole("link", { name: /view selected work/i })).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand`
Expected: FAIL because the app shell and test setup do not exist yet.

**Step 3: Write minimal implementation**

- Initialize the Next.js app structure in `Personal-Website/`.
- Add global fonts, metadata, and base layout.
- Render a temporary homepage section with the primary CTA.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand`
Expected: PASS for the smoke test.

**Step 5: Commit**

```bash
git add Personal-Website/package.json Personal-Website/next.config.ts Personal-Website/tsconfig.json Personal-Website/postcss.config.js Personal-Website/tailwind.config.ts Personal-Website/app/layout.tsx Personal-Website/app/page.tsx Personal-Website/app/globals.css
git commit -m "feat: scaffold personal website homepage app"
```

### Task 2: Define design tokens and layout primitives

**Files:**
- Create: `Personal-Website/lib/design-tokens.ts`
- Create: `Personal-Website/components/layout/Container.tsx`
- Create: `Personal-Website/components/layout/SectionHeading.tsx`
- Modify: `Personal-Website/app/globals.css`

**Step 1: Write the failing test**

Add a render test for a section heading component.

```tsx
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/layout/SectionHeading";

test("renders eyebrow, title, and description", () => {
  render(<SectionHeading eyebrow="What I Do" title="Creative production" description="Test copy" />);
  expect(screen.getByText("What I Do")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /creative production/i })).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand`
Expected: FAIL because the layout primitives do not exist.

**Step 3: Write minimal implementation**

- Define color, spacing, radius, and typography tokens.
- Create reusable `Container` and `SectionHeading` primitives.
- Add CSS variables for the cinematic palette and motion timing.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand`
Expected: PASS.

**Step 5: Commit**

```bash
git add Personal-Website/lib/design-tokens.ts Personal-Website/components/layout/Container.tsx Personal-Website/components/layout/SectionHeading.tsx Personal-Website/app/globals.css
git commit -m "feat: add homepage design primitives"
```

### Task 3: Model homepage content and project data

**Files:**
- Create: `Personal-Website/content/site.ts`
- Create: `Personal-Website/content/projects.ts`
- Create: `Personal-Website/types/content.ts`

**Step 1: Write the failing test**

Add a schema validation test for the project content model.

```tsx
import { projects } from "@/content/projects";

test("all featured projects include required metadata", () => {
  expect(projects.every((project) => project.title && project.slug && project.category && project.coverImage)).toBe(true);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand`
Expected: FAIL because the content files are missing.

**Step 3: Write minimal implementation**

- Define TypeScript types for hero, services, contact, and project objects.
- Create seed content from the approved messaging framework.
- Keep the content source independent from presentation components.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand`
Expected: PASS.

**Step 5: Commit**

```bash
git add Personal-Website/content/site.ts Personal-Website/content/projects.ts Personal-Website/types/content.ts
git commit -m "feat: add structured homepage content model"
```

### Task 4: Build the hero and top navigation

**Files:**
- Create: `Personal-Website/components/site/Header.tsx`
- Create: `Personal-Website/components/sections/HeroSection.tsx`
- Modify: `Personal-Website/app/page.tsx`

**Step 1: Write the failing test**

Add a homepage composition test.

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

test("renders hero copy and navigation links", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { name: /i build visual stories/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand`
Expected: FAIL because the hero and header are not rendered.

**Step 3: Write minimal implementation**

- Build a restrained sticky header.
- Create the hero section with headline, supporting copy, and CTAs.
- Add a static optimized hero image or poster surface.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand`
Expected: PASS.

**Step 5: Commit**

```bash
git add Personal-Website/components/site/Header.tsx Personal-Website/components/sections/HeroSection.tsx Personal-Website/app/page.tsx
git commit -m "feat: build homepage hero and navigation"
```

### Task 5: Build the services section

**Files:**
- Create: `Personal-Website/components/sections/ServicesSection.tsx`
- Create: `Personal-Website/components/cards/ServiceCard.tsx`
- Modify: `Personal-Website/app/page.tsx`

**Step 1: Write the failing test**

Add a test that verifies the four service categories render.

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

test("renders service categories", () => {
  render(<HomePage />);
  expect(screen.getByText(/video editing & post-production/i)).toBeInTheDocument();
  expect(screen.getByText(/ai-integrated creative workflows/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand`
Expected: FAIL because the services section is missing.

**Step 3: Write minimal implementation**

- Create a service grid with four cards.
- Use short value-oriented descriptions.
- Add subtle entry motion and hover emphasis.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand`
Expected: PASS.

**Step 5: Commit**

```bash
git add Personal-Website/components/sections/ServicesSection.tsx Personal-Website/components/cards/ServiceCard.tsx Personal-Website/app/page.tsx
git commit -m "feat: add service overview section"
```

### Task 6: Build the filterable project wall

**Files:**
- Create: `Personal-Website/components/sections/ProjectsSection.tsx`
- Create: `Personal-Website/components/projects/ProjectsFilterBar.tsx`
- Create: `Personal-Website/components/projects/ProjectsGrid.tsx`
- Create: `Personal-Website/components/projects/ProjectCard.tsx`
- Create: `Personal-Website/components/projects/useProjectFilter.ts`
- Modify: `Personal-Website/app/page.tsx`

**Step 1: Write the failing test**

Add an interaction test for category filtering.

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

test("filters project cards by category", async () => {
  const user = userEvent.setup();
  render(<ProjectsSection />);
  await user.click(screen.getByRole("button", { name: /film/i }));
  expect(screen.getAllByText(/film/i).length).toBeGreaterThan(0);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand`
Expected: FAIL because the projects UI does not exist.

**Step 3: Write minimal implementation**

- Render a dense, screen-filling grid of project cards.
- Build a filter bar from the project categories.
- Add hover lift, overlay expansion, and keyboard focus states.
- Keep the layout stable by fixing image ratios.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand`
Expected: PASS.

**Step 5: Commit**

```bash
git add Personal-Website/components/sections/ProjectsSection.tsx Personal-Website/components/projects/ProjectsFilterBar.tsx Personal-Website/components/projects/ProjectsGrid.tsx Personal-Website/components/projects/ProjectCard.tsx Personal-Website/components/projects/useProjectFilter.ts Personal-Website/app/page.tsx
git commit -m "feat: add filterable projects wall"
```

### Task 7: Implement project detail routes or modal overlays

**Files:**
- Create: `Personal-Website/app/projects/[slug]/page.tsx`
- Create: `Personal-Website/components/projects/ProjectDetailHero.tsx`
- Create: `Personal-Website/components/projects/ProjectMediaGallery.tsx`
- Create: `Personal-Website/components/projects/ProjectExternalLinks.tsx`
- Create: `Personal-Website/lib/projects.ts`

**Step 1: Write the failing test**

Add a route-level test for project details.

```tsx
import { getProjectBySlug } from "@/lib/projects";

test("returns project detail content by slug", () => {
  expect(getProjectBySlug("sample-project")?.slug).toBe("sample-project");
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand`
Expected: FAIL because the project detail layer is missing.

**Step 3: Write minimal implementation**

- Add slug lookup helpers.
- Build a detail page or modal-friendly component tree.
- Render title, roles, summary, highlights, media blocks, and external links.
- Handle image, video poster, and PDF preview patterns explicitly.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand`
Expected: PASS.

**Step 5: Commit**

```bash
git add Personal-Website/app/projects/[slug]/page.tsx Personal-Website/components/projects/ProjectDetailHero.tsx Personal-Website/components/projects/ProjectMediaGallery.tsx Personal-Website/components/projects/ProjectExternalLinks.tsx Personal-Website/lib/projects.ts
git commit -m "feat: build project detail experience"
```

### Task 8: Build the About and Contact sections

**Files:**
- Create: `Personal-Website/components/sections/AboutSection.tsx`
- Create: `Personal-Website/components/sections/ContactSection.tsx`
- Modify: `Personal-Website/app/page.tsx`

**Step 1: Write the failing test**

Add a test for About and Contact CTA copy.

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

test("renders about and contact CTAs", () => {
  render(<HomePage />);
  expect(screen.getByRole("link", { name: /view cv/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /email me/i })).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand`
Expected: FAIL because these sections do not exist.

**Step 3: Write minimal implementation**

- Add a concise professional biography block.
- Include resume, CV, and LinkedIn actions.
- Build a clear contact band with collaboration-oriented copy.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand`
Expected: PASS.

**Step 5: Commit**

```bash
git add Personal-Website/components/sections/AboutSection.tsx Personal-Website/components/sections/ContactSection.tsx Personal-Website/app/page.tsx
git commit -m "feat: add about and contact sections"
```

### Task 9: Finalize footer, responsiveness, and accessibility

**Files:**
- Create: `Personal-Website/components/site/Footer.tsx`
- Modify: `Personal-Website/app/page.tsx`
- Modify: `Personal-Website/app/globals.css`
- Modify: `Personal-Website/components/projects/ProjectCard.tsx`
- Modify: `Personal-Website/components/sections/HeroSection.tsx`

**Step 1: Write the failing test**

Add an accessibility-oriented regression test.

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

test("project cards remain keyboard reachable", () => {
  render(<HomePage />);
  expect(screen.getAllByRole("link", { name: /project/i }).length).toBeGreaterThan(0);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand`
Expected: FAIL until footer integration and accessible project card naming are complete.

**Step 3: Write minimal implementation**

- Add footer branding.
- Tune responsive spacing and typography for mobile, tablet, and desktop.
- Ensure keyboard focus, reduced motion, and contrast handling are correct.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand`
Expected: PASS.

**Step 5: Commit**

```bash
git add Personal-Website/components/site/Footer.tsx Personal-Website/app/page.tsx Personal-Website/app/globals.css Personal-Website/components/projects/ProjectCard.tsx Personal-Website/components/sections/HeroSection.tsx
git commit -m "feat: finalize homepage accessibility and responsiveness"
```

### Task 10: Optimize media delivery and deployment quality

**Files:**
- Create: `Personal-Website/lib/media.ts`
- Create: `Personal-Website/scripts/generate-placeholders.mjs`
- Modify: `Personal-Website/next.config.ts`
- Modify: `Personal-Website/package.json`
- Create: `Personal-Website/README.md`

**Step 1: Write the failing test**

Add a utility test for external media handling.

```tsx
import { getMediaLoadingStrategy } from "@/lib/media";

test("uses eager loading only for above-the-fold static media", () => {
  expect(getMediaLoadingStrategy({ priority: false, type: "image" })).toBe("lazy");
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand`
Expected: FAIL because the optimization helpers do not exist.

**Step 3: Write minimal implementation**

- Add media loading helpers and placeholder generation.
- Configure remote image patterns if needed.
- Document content entry, media prep, and deployment steps.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand`
Expected: PASS.

**Step 5: Commit**

```bash
git add Personal-Website/lib/media.ts Personal-Website/scripts/generate-placeholders.mjs Personal-Website/next.config.ts Personal-Website/package.json Personal-Website/README.md
git commit -m "feat: optimize portfolio media delivery"
```

## Verification Checklist

Run the following before claiming completion:

1. `npm install`
2. `npm test -- --runInBand`
3. `npm run lint`
4. `npm run build`
5. Manually verify desktop, tablet, and mobile layouts in the browser
6. Manually verify keyboard navigation and reduced motion behavior
7. Confirm external links open safely in a new tab where appropriate

## Content Inputs Needed Before Final Polish

1. Final project list and category labels
2. Final bio or LinkedIn-derived About copy
3. Resume, CV, LinkedIn, and email links
4. Hero visual selection
5. Project thumbnails, stills, posters, and PDFs

## Notes for the Implementer

1. Do not start with a CMS unless the content volume justifies it.
2. Use typed local content first and migrate later only if needed.
3. Default to static optimized images over autoplay video on the homepage.
4. Keep project detail views composable so the site can grow into a fuller archive later.
