# Site

[Eleventy](https://www.11ty.dev/) static site. Content under `src/`; data in `src/_data/`.

## Develop

```bash
npm install
npm run serve
```

## Build

```bash
npm run build
```

Output: `_site/`.

## Deploy

GitHub Actions workflow builds on push to `main`. In **Settings → Pages**, use **GitHub Actions** as the source (not a Jekyll branch build).
