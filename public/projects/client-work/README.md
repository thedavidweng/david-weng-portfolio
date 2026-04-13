# Client Work Archive

Use this folder as a namespace for archive assets grouped by client or organization.

- Each client gets its own subfolder, for example:
  - `beaty-biodiversity-museum/`
  - `bc-ai-ecosystem/`
  - `theupgrade-ai/`
- Inside each client folder, organize assets by media type such as `covers/`, `slides/`, `posters/`, `event-photos/`, `thumbs/`, `booklet/`, `report/`, or `video/`.

Notes:

- Store canonical assets as `avif` in the repository.
- Runtime delivery should negotiate `avif/webp` with fallback handled by the image pipeline.
- Keep filenames stable and descriptive, such as `client-cover-main.avif` or `client-slide-01.avif`.
- Do not rely on embedded image metadata. Record titles, links, and notes in the relevant archive collection file under `content/archives/`.
