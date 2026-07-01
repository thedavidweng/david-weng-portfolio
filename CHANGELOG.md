# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Fixed

- Replace the custom `<dialog>` project-media lightbox with `yet-another-react-lightbox` and its Zoom plugin so mobile archive images support pinch-to-zoom and fill the viewport

### Style

- Update project media card hover effects and refine global layout styles
- Enhance site header and footer with improved social links and responsive design adjustments
- Refine global styles and simplify header component

### ♻️ Refactoring

- Clean up homepage and project entrypoints
- Update UI to noir aesthetic, remove carousel dependency, and refine accessibility and image optimization.
- Overhaul visual identity with brutalist aesthetic, updated typography, and high-contrast black-and-red color palette
- Migrate project media assets to AVIF
- Replace resume.pdf link with homepage link (thedavidweng.github.io)

### ⚡ Performance

- Optimize font loading and image delivery hints

### ✨ New Features

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

### 🔧 Chores

- Adjust content phrasing per user request
- Refine chinese contact copy
- Remove portfolio pdf call-to-action
- Remove history log from repo and add og image
- Checkpoint pnpm migration baseline
- Update dependencies to latest

