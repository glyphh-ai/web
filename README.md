# glyphh-web

[glyphh.ai](https://glyphh.ai): the games Glyphh makes. The front page is a card per game, and each game has a page
(videos, screenshots, how to play, how it connects to Claude, Advertise). The games themselves run on their own sites;
these pages show them and link there (`?src=games`). Nothing else is on the site: no sign-in, no account, no API.

| Path | What |
|---|---|
| `public/index.html`, `home.js`, `games.css` | The front page |
| `public/games.js` | The list of games: one entry per card |
| `public/<game>/` | A game's page (`index.html`) and its pictures; `game.css` and `game.js` are shared by them |
| `proxy.js` | Answers `/` and `/<game>/` with those files; sends `docs.glyphh.ai` to the site |
| `app/[...gone]/route.js` | Every address the site no longer has redirects to `/` |
| `app/terms`, `app/privacy`, `app/refund` | The legal pages (Next.js, `app/layout.js`) |
| `public/press/`, `public/glyphh-logo-*.png`, `public/glyphh-mascot*.png` | Files other sites link to: keep their addresses |
| `marketing/` | Delivered files, kept in the repo and read on GitHub; the site does not serve them |

## Add a game

1. Make a folder `public/<name>/` with its `index.html` (copy a game's page; it uses `/games.css`, `/game.css` and
   `/game.js`) and its pictures, a `card.jpg` among them.
2. Add its entry to `public/games.js`: `href: '/<name>/'`, `title`, `blurb`, `art`, `tags`. An entry with
   `soon: true` and no `href` shows a card without a link.

The front page, the page's address and the sitemap all read `games.js`; nothing else needs a change.

## Develop

```bash
npm ci
npm run dev      # http://localhost:3000
npm test         # every game has its page and every file a page names is there
npm run build
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) tests, builds and deploys to Fly (`fly.toml`, app `glyphh-ai-web`) on
every push to `main`.
