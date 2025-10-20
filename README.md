# Strategy Breakdowns — Winning Twitter Landing

Static landing hosted on GitHub Pages at `go.strategybreakdowns.com/wt` with the root redirecting to `/wt`.

## Local preview
Open `wt/index.html` directly in a browser (no build). Styles load from `/assets/styles.css`.

## Deploy (GitHub Pages)
1. Push to `main`.
2. GitHub → Settings → Pages:
   - Source: Deploy from a branch → `main` / root
   - Custom domain: `go.strategybreakdowns.com`
   - Enforce HTTPS: enabled

## DNS
Create a CNAME record:
- Name/Host: `go`
- Target: `<github-username>.github.io`
- TTL: auto/1h

## Validate
- `https://go.strategybreakdowns.com/` redirects to `/wt/`
- `https://go.strategybreakdowns.com/wt/` loads with styles
- CTA goes to `https://learn.strategybreakdowns.com/offers/4u7hm6rN`
