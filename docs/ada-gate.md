# The Ada gate: robots at the door of glyphh.ai

**Date:** 2026-10-25, the challenge and the first labels 2026-10-28. **State:** live in shadow mode on glyphh.ai
since 2026-10-25 21:20 UTC; the challenge is built and waits for `ADA_GATE_SECRET` and `ADA_GATE=enforce`.

The site's proxy (`middleware.js`, the gate itself in `app/lib/gate.js`) keeps every request against its session
and, at the session's 5th, 20th and 60th request, turns how it has behaved into facts and asks Ada Cloud's
`bots-edge` model: allow (a person), challenge (either answer is dear), or block (a robot). The question is asked
after the response is sent (`waitUntil`), so no visitor waits on it; a verdict applies from the session's next
request. The benchmark behind the model, and what it does and does not prove, is rrotor `benchmarks/bots/`.

## The facts of a session

What the proxy sees of a request is its time, method and path; the facts are the sixteen the benchmark calls
edge features, transformed exactly as there (counts and seconds as log10(1 + x) in quarter bins, shares in
tenths): requests, duration, mean and spread of the gaps between requests, the busiest second, the share at
night, repeats, the share by method, the share of images and of pages and their ratio, distinct paths, the
deepest path and the spread of depth. `scripts/probe.mjs` computes the same facts from outside, so a session can
be replayed against the model without the proxy.

A session is the `glyphh_sid` cookie (HttpOnly, 30 minutes idle), or, for a visitor that keeps no cookies, the
address and user agent together, so a scraper is one session however it ignores the cookie.

## Modes and settings

| Variable | Does |
|---|---|
| `GLYPHH_API_KEY` | An Ada Cloud key (made with the Glyphh connector's `create_api_key`). Unset: the gate is off. |
| `ADA_GATE` | `off`; `shadow` (the default with a key): log every decision, enforce nothing, answer `x-ada-gate: shadow:<verdict>`; `enforce`: 403 for a session decided a bot, from its next request; a challenged one is shown the challenge on its next page. |
| `ADA_GATE_SECRET` | Signs the challenge's nonces and the passes (any long random string: `openssl rand -hex 32`). Unset in `enforce`: no challenge, a challenged session passes; a bot is still refused. |
| `ADA_GATE_DAILY` | Decisions a day, default 120 (the Free plan's 5,000 requests a month). Past it the gate logs `skipped`, and a session with no verdict is never challenged or refused. |
| `ADA_URL` | Ada Cloud's address, default `https://ada.glyphh.ai`. |

They are Fly secrets on `glyphh-ai-web`, staged so the next deploy carries them:

```sh
fly secrets set --stage -a glyphh-ai-web GLYPHH_API_KEY=glyphh_ak_… ADA_GATE=shadow
```

## What the log says

One JSON line per decision on the app's stdout (`fly logs -a glyphh-ai-web | grep ada_gate`):

```json
{"ada_gate":{"mode":"shadow","key":"c:…","n":5,"ua":"…","cookie":true,"verdict":"allow","outcome":"human","ask":false,"probabilities":{"human":0.93,"bot":0.07},"expected_cost":0.07,"version":1,"ms":140,"data":{…}}}
```

`data` is the session's facts: the line is a precedent waiting for its label. Labelling them (a known crawler's
user agent, our own probes, a person who signed in) and recording them into `bots-edge` is how the model becomes
glyphh.ai's own; it was seeded with 650 sessions of another site (the benchmark's), which is a start, not a fit,
and holds 31 of glyphh.ai's since 2026-10-28 (below).

## What the origin does not see

Cloudflare answers most images, styles and scripts from its cache and the proxy's matcher skips `_next/static`, so
the content features (images, pages, their ratio) run low for people and robots alike here, and the busiest
second rarely shows a page's burst of assets. The pace and walk features carry the decision at this origin.

## The challenge (2026-10-28)

In `enforce`, a session Ada answers `challenge` for is shown, on its next page, a page of its own (403,
`no-store`, `noindex`, no assets): a script searches for a number whose SHA-256 with a nonce the gate signed
starts with 14 zero bits (about 16,000 tries, a tenth of a second; 113 ms load to load in Chrome), leaves it in
the `glyphh_proof` cookie and reloads. The gate checks the signature, the nonce's age (5 minutes) and the work,
and answers with `glyphh_pass`: HttpOnly, signed with `ADA_GATE_SECRET`, bound to the user agent, 12 hours.
Assets, `/_next/*`, `/api/*`, Next's RSC fetches and prefetches are never answered with the page, so a person
whose verdict lands mid-load is not broken. The signatures need no shared state, so a pass made on one machine
holds on the other.

- A session with a pass is never challenged again, but Ada still watches it: `block` still refuses it.
- Its first `passed` line in the log carries its facts: a session that ran the script is a label (a browser).
- What it stops: anything that does not run JavaScript (fetch, curl, requests, most scrapers). What it does not:
  an agent driving a real or headless browser runs the script too; those are Ada's to `block` on behaviour.
- Never a block without a verdict: before a session's 5th request, past the day's budget, or with Ada
  unreachable, it passes. Without `ADA_GATE_SECRET` a challenged session passes.
- Not gated at all: Fly's health check and the crawlers that say who they are (Google, Bing, Apple, DuckDuckGo,
  Yandex, Claude-SearchBot, OAI-SearchBot, Perplexity, link previews), so search and AI search keep reading the
  site under robots.txt. A user agent can lie; telling a real Googlebot from a liar needs its address checked
  (reverse DNS, or Cloudflare's verified-bot field), which the origin does not do yet.

## The first labels (2026-10-28)

`fly logs` keeps the last 100 lines, which held 51 decisions (of 2026-10-28). Labelled, and only where the
user agent says so plainly:

- **bot**: a scanner (BuildSignalScanner), HeadlessChrome, curl, a misspelt fake ("Mozlila … Bulid"),
  Claude-SearchBot (a crawler: a robot, now ungated anyway), and a cut-off Windows "AppleWebKit/537.36" with no
  browser in it that read 60 pages with no image;
- **human**: phones and desktops with a whole, current browser user agent that fetched images with their first
  page (a plain scraper fetches the page alone). That a real-looking user agent is a person is our assumption;
  most of these are ad clicks in in-app browsers, which is who the site's visitors are now;
- skipped: the health check, and a Chrome/131 desktop that read no image.

Deduplicated in the model's own bins, 24 sessions (9 bot, 15 human); with them one probe run's sessions at the
gate's own decision points (5th, 20th and 60th request: the scraper at 5 and the agent at all three as bot, the
scripted person at all three as human), 31 in all, recorded into `bots-edge` (650 → 681; the Free plan holds 1,000
across the org's models, and 966 were held), then `ada_learn`.

Scored on a second probe run that was not recorded, at the same decision points:

| Session, at request | Before: verdict, P(robot) | After |
|---|---|---|
| Scraper, 5 | challenge, 0.70 | **block, 0.91** |
| Agent, 5 | challenge, 0.74 | allow, 0.18 |
| Agent, 20 | allow, 0.00 | **challenge, 0.57** |
| Agent, 60 | allow, 0.00 | **challenge, 0.86** |
| Person (scripted), 5 | challenge, 0.74 | allow, 0.18 |
| Person (scripted), 20 | allow, 0.00 | allow, 0.16 |
| Person (scripted), 60 | allow, 0.00 | allow, 0.05 |

Before, every first page load was challenged (in the live log, 32 of 51 decisions, 29 of them phones)
and nothing that kept going was ever caught; after, a page load passes, the scraper is refused, and the agent
is caught by its 20th request. What this leaves out: the second run is the same three scripts as the recorded
one, so it shows the model learned these behaviours, not that it holds for others; at 5 requests an agent's
first page and a person's are the same facts (the model says 0.18 for both); and an agent that is challenged
passes the challenge, so stopping it takes a `block`, which takes more labelled agent sessions. Next: record
the `passed` lines and the shadow lines of crawlers as they come, and run the probe again at a few hundred.

## The first probe (2026-10-25)

`scripts/probe.mjs` against the live site, the model as seeded:

| Session | Requests | Seconds | Mean gap | Busiest second | Verdict | P(robot) |
|---|---|---|---|---|---|---|
| Scraper: plain fetches, no pauses, no cookies | 14 | 2 | 0.14 s | 6 | allow | 0.05 |
| Agent: headless browser, 1 to 2 s a page | 61 | 17 | 0.29 s | 7 | allow | 0.00 |
| Person (scripted): scrolls, 6 to 15 s a page | 59 | 119 | 2.05 s | 7 | allow | 0.00 |

The seed does not transfer: in the library's logs a robot's busiest second was empty and a person's held a
page's burst of assets; here Cloudflare serves the assets, so a scraper's burst of pages reads as a person's page
load. The gate stays in shadow until the model holds a few hundred of glyphh.ai's own labelled sessions; then this
probe runs again. The benchmark page (rrotor `benchmarks/bots/README.md`) has the full account.

## Going to enforce

```sh
fly secrets set --stage -a glyphh-ai-web ADA_GATE_SECRET=$(openssl rand -hex 32) ADA_GATE=enforce
```

then merge to `main` (the deploy carries the staged secrets). Back to watching: `fly secrets set -a glyphh-ai-web
ADA_GATE=shadow`. Changing the secret ends every pass (people see the challenge once more).

## The other hosts

The gate is glyphh.ai's (and docs.glyphh.ai's, the same app). The rest of the domain, as of 2026-10-28:

| Host | What answers | Behind Cloudflare | What it needs |
|---|---|---|---|
| platform.glyphh.ai | the platform, Hono on Node (Fly `glyphh-ai-app`) | no, straight to Fly | the gate as a Hono middleware |
| api.glyphh.ai | the server (Python) | yes | not a browser challenge: code calls it |
| ada.glyphh.ai | Ada Cloud | no, straight to Fly | the same as the API |
| demo.glyphh.ai | not built yet | — | the gate, as the platform |

- **The gate is portable as it is.** `app/lib/gate.js` imports nothing from Next: it needs a request with
  `url`, `method`, `headers` and `cookies.get(name)`, `fetch` and `crypto.subtle`. For the platform, a Hono
  middleware of a dozen lines wraps `observe()` (Hono's `getCookie`/`setCookie` for the cookies, `c.html()`
  for the challenge, `c.executionCtx.waitUntil` or a floating promise for the call to Ada). The module should
  move into a package both apps install, so the facts never drift from what the model learned.
- **One model or one per host.** The platform's pages are not the site's (sign-in, account, billing: few pages,
  many API calls from the page), so its sessions look different; start it in shadow with its own model
  (`bots-platform`, the same spec), label as here, then enforce. The Free plan's 1,000 precedents across the org
  is the limit to plan for: a second model needs room, or a paid plan.
- **Its address must be the visitor's.** The platform is not behind Cloudflare, so `cf-connecting-ip` is absent
  and anyone can send one; the gate keys a cookieless session on it. Put platform.glyphh.ai and ada.glyphh.ai
  behind Cloudflare (proxied DNS), or key on Fly's `fly-client-ip` there.
- **The API and Ada are called by code.** A proof of browser would break every SDK and the connector. What
  protects them is what they have: API keys, OAuth, and limits per key (the plan's requests a second and a
  month). Ada could judge a key's behaviour the same way, with facts about calls rather than pages, as a
  separate model; not built.
- **demo.glyphh.ai** (the expenses demo, no sign-in) is the one that needs the gate most, since its server holds
  an Ada key: the gate in front of it, its own per-visitor limit, and the model reset on a timer.
- **Or one gate for all.** A Cloudflare Worker on every proxied host could run `gate.js` as it is (it uses only
  web APIs), with sessions in a Durable Object instead of one machine's memory; that is one place to enforce,
  and the right end state once every host is behind Cloudflare.

## Trying it

```sh
GLYPHH_API_KEY=… node scripts/probe.mjs https://glyphh.ai        # three sessions: a scraper, an agent, a person
node scripts/probe.mjs --facts                                     # no key: the facts, at the gate's decision points too
PROBE_CHANNEL=chrome node scripts/probe.mjs --facts                # with the installed Chrome
curl -sI https://glyphh.ai/pricing | grep -i x-ada-gate            # shadow mode: the session's verdict so far
npm test                                                           # the gate and the challenge, no server
```
