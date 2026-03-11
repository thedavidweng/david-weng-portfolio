# Homepage IA Cleanup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clean up the homepage and project-page information architecture by moving Blog to the header, removing the duplicated blog project, reframing article handoff pages, and removing duplicated film release links.

**Architecture:** Keep the changes localized to content-driven configuration and narrow page-type CSS overrides. Use test-first updates in the homepage, projects, and project detail tests so navigation, filtering, and per-layout rendering behavior stay locked.

**Tech Stack:** Next.js App Router, React, TypeScript, Vitest, Testing Library, CSS in `app/globals.css`

---

### Task 1: Documented Navigation Cleanup

**Files:**
- Modify: `content/site.ts`
- Modify: `components/site/Header.tsx`
- Test: `tests/homepage.test.tsx`

**Step 1: Write the failing test**
- Assert the header renders a `Blog` link in English and Chinese.
- Assert the link points to `https://blog.davidweng.eu.org/`.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/homepage.test.tsx`

**Step 3: Write minimal implementation**
- Add a localized `Blog` navigation item with an absolute URL.
- Update the header renderer so absolute URLs are passed through directly while internal anchors still resolve against the localized homepage path.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/homepage.test.tsx`

### Task 2: Remove Blog From Project Data

**Files:**
- Modify: `content/projects.ts`
- Test: `tests/projects-section.test.tsx`

**Step 1: Write the failing test**
- Assert the project reel no longer includes `David's Blog`.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/projects-section.test.tsx`

**Step 3: Write minimal implementation**
- Remove the `davids-blog` project entry from `projects`.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/projects-section.test.tsx`

### Task 3: Reframe Article Handoff Pages

**Files:**
- Modify: `components/pages/ProjectPageView.tsx`
- Modify: `app/globals.css`
- Test: `tests/project-page.test.tsx`
- Test: `tests/styles.test.ts`

**Step 1: Write the failing tests**
- Assert the article handoff page renders a reading-scale publication label block instead of the duplicate poster-style treatment.
- Add a CSS regression test for `external-handoff` title sizing and casing overrides.

**Step 2: Run tests to verify they fail**

Run: `npm test -- tests/project-page.test.tsx tests/styles.test.ts`

**Step 3: Write minimal implementation**
- Add a small article meta block to the left column for `external-handoff`.
- Override the external-handoff title typography and spacing to article scale.
- Reduce the right-hand card weight so it acts like a publication CTA card instead of competing hero content.

**Step 4: Run tests to verify they pass**

Run: `npm test -- tests/project-page.test.tsx tests/styles.test.ts`

### Task 4: Remove Duplicate Film Release Section

**Files:**
- Modify: `components/pages/ProjectPageView.tsx`
- Test: `tests/project-page.test.tsx`

**Step 1: Write the failing test**
- Assert film/video project pages no longer render the `Available on` support block.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/project-page.test.tsx`

**Step 3: Write minimal implementation**
- Remove the dedicated `project-video-stage__support` section while preserving hero CTA links and the embedded player.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/project-page.test.tsx`

### Task 5: Full Verification and Sync

**Files:**
- Verify modified files only

**Step 1: Run the full verification suite**

Run:
- `npm test`
- `npm run lint`
- `npm run build`

**Step 2: Commit**

```bash
git add app/globals.css components/pages/ProjectPageView.tsx components/site/Header.tsx content/projects.ts content/site.ts tests/homepage.test.tsx tests/project-page.test.tsx tests/projects-section.test.tsx tests/styles.test.ts docs/plans/2026-03-11-homepage-ia-cleanup-design.md docs/plans/2026-03-11-homepage-ia-cleanup.md
git commit -m "refactor: clean up project page information architecture"
```

**Step 3: Push**

```bash
git push origin codex/homepage-foundation
git branch -f main HEAD
git push origin main
```
