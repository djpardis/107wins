# Future Shock Media (futureshock.media)

Static site built with [Eleventy](https://www.11ty.dev/). Markdown posts live in `src/content/posts/`; shared layout, nav, and footer are in `src/_includes/`. Episode metadata is `src/_data/episodes.json`.

## Local development

```bash
npm install
npm run serve
```

Open the URL shown (usually `http://localhost:8080`).

## Production build

```bash
npm run build
```

Output is written to `_site/`.

## GitHub Pages

In the repo **Settings → Pages**, set **Source** to **GitHub Actions**. Pushes to `main` run `.github/workflows/pages.yml`, which builds with Eleventy and deploys `_site`.

Custom domain (`CNAME`) is copied from `src/static/` into the build output (set to `futureshock.media`).

## Add a post

Create a new `.md` file under `src/content/posts/` with front matter:

```yaml
---
title: "Your title"
description: "Short summary for listings."
date: 2026-04-08
---
```

Body: Markdown. The page URL will be `/posts/your-filename/`.

## Add an episode

Edit `src/_data/episodes.json` (array of episode objects). Cards are rendered with `src/_includes/macros/episode-card.njk`.
