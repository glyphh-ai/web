# The Ada gate: robots at the door of glyphh.ai

**Date:** 2026-10-25. **State:** shadow mode in the code; off until the Fly secrets are set.

The site's proxy (`middleware.js`, the gate itself in `app/lib/gate.js`) keeps every request against its session
and, at the session's 5th, 20th and 60th request, turns how it has behaved into facts and asks Ada Cloud's
`bots-edge` model: allow (a person), challenge (either answer is dear), or block (a robot). The question is asked
after the response is sent (`waitUntil`), so no visitor waits on it; a verdict applies from the session's next
request.

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
| `ADA_GATE` | `off`; `shadow` (the default with a key): log every decision, enforce nothing, answer `x-ada-gate: shadow:<verdict>`; `enforce`: 403 for a session decided a bot, from its next request; a challenged one passes with the header. |
| `ADA_GATE_DAILY` | Decisions a day, default 120 (the Free plan's 5,000 requests a month). Past it the gate logs `skipped`. |
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
glyphh.ai's own; it was seeded with 650 sessions of another site (the benchmark's), which is a start, not a fit.

## What the origin does not see

Cloudflare answers most images, styles and scripts from its cache and the proxy's matcher skips `_next/static`, so
the content features (images, pages, their ratio) run low for people and robots alike here, and the busiest
second rarely shows a page's burst of assets. The pace and walk features carry the decision at this origin. A
real challenge (a proof of browser) is the next step before `enforce`; the gate's `challenge` verdict is the
hook for it.

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
probe runs again.

## Trying it

```sh
GLYPHH_API_KEY=… node scripts/probe.mjs https://glyphh.ai        # three sessions: a scraper, an agent, a person
curl -sI https://glyphh.ai/pricing | grep -i x-ada-gate            # shadow mode: the session's verdict so far
```
