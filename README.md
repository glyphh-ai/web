# glyphh-web

The Glyphh marketing site (glyphh.ai). Next.js (App Router).

## Prerequisites

- Node.js 20+

## Setup

```bash
npm install
cp .env.example .env.local     # if present
```

Set as needed (point at the live or local services):

- `NEXT_PUBLIC_API_URL` — the glyphh-server API
- `NEXT_PUBLIC_PLATFORM_URL` — the glyphh-platform app
- `NEXT_PUBLIC_SERVER_URL` — the glyphh-server origin

## Run (development)

```bash
npm run dev              # http://localhost:3000
```

## Build / production

```bash
npm run build
npm start
```

## Deploy

Deploys to Heroku via `.github/workflows/deploy.yml` on push to `main`.
Requires the repo secrets `HEROKU_API_KEY` and `HEROKU_APP_NAME`.

---

> _Formerly the **.yo** marketing site — rebranded to Glyphh._
