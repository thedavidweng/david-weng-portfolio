# Personal Archive

Put archive assets for this collection in the subfolders below.

- `covers/`: project cover images used by cards and detail heroes. Recommended size: `1600x1600`. Keep the key subject inside the center 60 percent.
- `posters/`: tall poster artwork or key visuals.
- `square/`: square exports, typically `1500x1500`.
- `slides/`: selected slide pages or presentation screenshots.
- `event-photos/`: photos taken on site during events.
- `thumbs/`: optional lightweight thumbnails if we later need separate optimized previews.

Notes:

- Store canonical assets as `avif` in the repository.
- Runtime delivery should negotiate `avif/webp` with fallback handled by the image pipeline.
- Keep filenames stable and descriptive, such as `personal-cover-main.avif` or `personal-square-01.avif`.
- Do not rely on embedded image metadata. Record titles, links, and notes in `content/archives/personal.ts`.
