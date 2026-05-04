# Pattern Generator

Procedural art generator with selectable color themes and one-click pattern generation.

## Features

- 10+ procedural pattern algorithms (random lines, Mondrian, fractals, gradients, etc.)
- 30+ color themes (Lithuania, Thailand, Synthwave, Desert, etc.)
- Pure client-side JavaScript - no build step required
- Instant pattern generation

## Run Locally

Open `index.html` directly in a browser, or serve via HTTP:

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Deploy

This repo auto-deploys to GitHub Pages on every push to `main`.

**Manual deployment:**
1. Enable GitHub Pages in repo settings (Source: GitHub Actions)
2. Push to `main` branch
3. GitHub Actions will build and deploy automatically

**Live site:** https://k8port.github.io/pattern_gen/
