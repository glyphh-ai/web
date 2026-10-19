# glyphh-web

The Glyphh site, [glyphh.ai](https://glyphh.ai), and the user docs, [docs.glyphh.ai](https://docs.glyphh.ai). Next.js
(App Router); one app serves both hosts (`middleware.js` maps `docs.glyphh.ai/<page>` to `app/docs`).

| Path | What |
|---|---|
| `app/page.js` | The home page |
| `app/products/ada` | The Ada product page |
| `app/pricing` | Plans and the hosted machine rates, read from the server's `GET /v1/rates` |
| `app/docs` | The user docs: `content.js` and `pages.js` hold every page, `ui.js` the figures |
| `app/faq`, `app/blog` | The FAQ; the blog (`posts.js`) |
| `app/terms`, `app/privacy`, `app/refund`, … | The legal pages |

## Settings

| Variable | What |
|---|---|
| `NEXT_PUBLIC_PLATFORM_URL` | The platform, where Log in and Sign up go (default `https://platform.glyphh.ai`) |
| `NEXT_PUBLIC_SERVER_URL` | The Glyphh server (default `https://api.glyphh.ai`) |
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
