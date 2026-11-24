# glyphh-web

The Glyphh site, [glyphh.ai](https://glyphh.ai), and the user docs, [docs.glyphh.ai](https://docs.glyphh.ai). Next.js
(App Router); one app serves both hosts (`middleware.js` maps `docs.glyphh.ai/<page>` to `app/docs`).

| Path | What |
|---|---|
| `app/page.js` | The home page |
| `app/use-cases` | The use cases, each with its experiment |
| `app/marketplace` | The Marketplace: shows what is in [glyphh-ai/plugins](https://github.com/glyphh-ai/plugins), read from GitHub (`app/lib/marketplace.js`, refreshed every 10 minutes) |
| `app/pricing` | The plans of Ada Cloud |
| `app/docs` | The user docs: `content.js` and `pages.js` hold every page, `ui.js` the figures |
| `app/faq`, `app/blog` | The FAQ; the blog (`posts.js`) |
| `app/terms`, `app/privacy`, `app/refund`, … | The legal pages |

## Settings

| Variable | What |
|---|---|
| `NEXT_PUBLIC_PLATFORM_URL` | The platform, where Log in and Sign up go (default `https://platform.glyphh.ai`) |
| `NEXT_PUBLIC_DISCORD_URL`, `NEXT_PUBLIC_X_URL` | Footer links, shown only when set |

## Develop

```bash
npm ci
npm run dev      # http://localhost:3000; the docs at /docs
npm run build
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to Fly (`fly.toml`, app `glyphh-ai-web`) on every
push to `main`.
