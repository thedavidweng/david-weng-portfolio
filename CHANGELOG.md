# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]


### ◀️ Revert

- Remove manual Cloudflare deployment status workflow



### ♻️ Refactoring

- Clean up homepage and project entrypoints

- Update UI to noir aesthetic, remove carousel dependency, and refine accessibility and image optimization.

- Overhaul visual identity with brutalist aesthetic, updated typography, and high-contrast black-and-red color palette

- Migrate project media assets to AVIF

- Replace resume.pdf link with homepage link (thedavidweng.github.io)

- Codebase cleanup to production review standard (#23)

- Self-explaining conventions + architecture deepening pass (#28)

- Generate AVIF variants with sharp at q55 instead of magick



### ⚡ Performance

- Optimize font loading and image delivery hints

- Shrink dist/client by moving build-only assets out of public/

- Subset CJK fonts, lazy-load archives, precompress assets

- Complete free-tier static asset optimizations

- Eliminate display font flash on first paint



### ✨ Features

- Build portfolio homepage foundation

- Restyle portfolio with poster-first art direction

- Migrate legacy portfolio content into responsive reel

- Refine homepage styling and stabilize linting

- Expand archive collections and beaty media

- Redesign film pages and consolidate archives

- Split film and video project categories

- Redesign header navigation and contact section with a minimalist hero layout

- Add April speaker series and recruit graphics to bc-ai-ecosystem archive

- Add agent-ready features — Link headers, markdown negotiation, Content-Signal directives

- Add JSON-LD structured data for SEO/AEO

- **aeo**: Add agent views, llms.txt, llms-full.txt, index.md, schema.org Person, Link headers

- Add vinext dual-stack build and Cloudflare Workers deploy

- Migrate production to vinext on Cloudflare Workers

- Redirect www.davidweng.eu.org to apex



### 🎨 Styling

- Update project media card hover effects and refine global layout styles

- Enhance site header and footer with improved social links and responsive design adjustments

- Refine global styles and simplify header component

- Hide YARL default zoom toolbar in project lightbox



### 🐛 Bug Fixes

- Clip gallery image overflow on hover to prevent bottom edge bleed

- Align archive media hover shadow with image scale

- Keep project hero title above cover art

- Hide duplicate beaty archive asset

- Optimize film pages for mobile

- Optimize mobile shell and homepage

- Optimize mobile project pages and remove home glow

- Smooth project carousel and complete social metadata

- **mobile**: Full-height menu drawer and single-row project filters

- **mobile**: Restore menu panel height to 100dvh

- **nav**: Smooth header scroll and mobile menu transitions

- Align project page UX and mobile menu behavior

- Exclude .next and .agents from oxlint

- Use ignorePatterns instead of ignore

- Remove unused ProjectItem import

- Pin action SHA, remove test.txt, add permissions

- Correct mirror action SHA

- Add force_push and fetch-depth: 0

- Mirror to GitLab instead of Codeberg

- Reach 100% vinext compatibility on main

- Restore Google Fonts parity for self-hosted local fonts

- Complete agent parity and shared static paths after Astro migration

- Emit /sitemap.xml for crawlers and robots.txt parity

- Move dist assertions to verify-dist post-build gate

- Route davidweng.eu.org to Pages via apex proxy Worker

- Restore clean-URL routing for Cloudflare static assets

- **header**: Scope mobile menu inert to non-header page content

- Replace custom lightbox with YARL zoom for mobile image preview

- Address Greptile review on lightbox nav labels and tests

- Resolve top 3 react-doctor issues (perf + a11y) (#27)

- Verify-zone no-redirect check never passed (null vs undefined) (#30)

- Keep iOS 26 Safari chrome dark while the red mobile drawer is open



### 📝 Documentation

- Add Cursor Cloud setup instructions to AGENTS.md

- Switch Node management to fnm; note Cloudflare auto-deploy on push



### 📦 Dependencies & CI

- Add Codecov integration with vitest coverage

- Add Codeberg mirror workflow

- Add Cloudflare Pages preview deploy for astro migration branch

- Mirror Cloudflare Pages results to GitHub Deployments

- Fix coverage generation (drop stray -- so vitest gets --coverage)

- Bump GitHub Actions to Node 24 runtimes



### 🔧 Chores

- Adjust content phrasing per user request

- Refine chinese contact copy

- Remove portfolio pdf call-to-action

- Remove history log from repo and add og image

- Checkpoint pnpm migration baseline

- Update dependencies to latest

- Ignore .vercel directory

- Bump toolchain to latest stable within release-age policy

- Upgrade pnpm to 11.9.0

- Align toolchain with Vite 8 and remove Next.js baggage

- Bump toolchain to latest and align pnpm trust with CI

- Document pnpm 11.9.0 as latest and dedupe CI version pin

- Align Node to 24 Active LTS (Krypton) in CI and engines

- Add .mise.toml for Node 24 Active LTS in project

- Switch preview deploy to Cloudflare Pages Git integration

- Production on Cloudflare Pages only

- Migrate production hosting to Workers static assets

- Remove migration baggage after Workers cutover

- Optimize cloudflare worker redirects and enable astro prefetch

- Enable wrangler smart placement and minification

- Add post-deploy Zone redirect verification script

- Remove legacy lightbox leftovers and refresh docs/tests

- Remove unused exports, clean up knip config (#25)

- Replace release-please with git-cliff changelog



### 🧪 Tests

- Assert auto-trailing-slash html_handling; doc routing gotcha

- Assert carousel-projects.ts stays in sync with projects.ts

- Merge duplicates, strengthen weak cases, raise coverage

- Cover media lightbox, film rail, and archive wall gaps



### 🧹 Polish

- Switch from eslint to oxlint

- **header**: Add dialog semantics to mobile menu panel



