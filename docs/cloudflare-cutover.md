# Cloudflare — glyphh.ai cutover runbook

**Date staged:** 2026-08-03
**Zone:** `glyphh.ai` on Cloudflare (NS `bingo`/`kirk` — flipped 2026-08-03, live).
**Current prod:** CF → **Heroku** for root/www/api/platform. Mail (Google MX) intact.
**Incoming origin:** Fly app **`glyphh-ai-web`** (2 machines, `iad`), deployed by GitHub
Actions (`.github/workflows/deploy.yml`, `deploy-fly` job) on every `main` push.
**Staging proof:** `https://next.glyphh.ai` — CF → Fly, cert issued, serving.

Certificates for `glyphh.ai` and `www.glyphh.ai` are **already ISSUED and active** on
the Fly app (rsa+ecdsa, Let's Encrypt, auto-renew via the grey-cloud ACME records).
Nothing below waits on cert issuance.

---

## The cutover (web only — api/platform move later with the server, task #4)

Two record edits in the CF dashboard → DNS → Records. Zero downtime: visitors stay on
Cloudflare's edge IPs the whole time; only CF's origin target changes.

| # | record | today | change to | proxy |
|---|---|---|---|---|
| 1 | `glyphh.ai` | 4× A (Heroku: 99.83.220.108, 13.248.244.96, 35.71.179.82, 75.2.60.68) | **delete the A records; add CNAME → `yko2wz6.glyphh-ai-web.fly.dev`** (CF flattens at apex) | 🟠 keep proxied |
| 2 | `www` | CNAME → `secure-silverfish-….herokudns.com` | **CNAME → `yko2wz6.glyphh-ai-web.fly.dev`** | 🟠 keep proxied |

Do #2 (`www`) first, verify, then #1 (root) — smallest blast radius first.

### Verify after each edit (from any shell)

```sh
curl -sI https://www.glyphh.ai/ | grep -iE "^HTTP|server|cf-ray"   # expect 200, server: cloudflare
curl -s https://www.glyphh.ai/ | grep -o "<title>[^<]*</title>"     # expect the Glyphh title
# then the same for https://glyphh.ai/ after edit #1
```

Origin confirmation (is CF actually pulling from Fly, not Heroku?):
`curl -sI https://glyphh.ai/ | grep -i x-powered-by` → `Next.js` appears on both origins,
so instead check Fly saw the traffic: `fly logs -a glyphh-ai-web | tail`.

### Rollback (any time, ~1 minute)

Put the records back exactly as the "today" column above. Heroku is untouched, still
running, and still deployed on every `main` push during the parallel period.

---

## Records that must NOT change in this cutover

- `api` → Heroku CNAME (🟠 proxied) — moves with the SERVER migration (task #4)
- `platform` → Heroku CNAME — same
- `next` → `yko2wz6.glyphh-ai-web.fly.dev` (🟠) — the staging host; delete AFTER cutover settles
- **MX × 4** (`aspmx.l.google.com` family) — mail; never touch
- TXT: `google-site-verification`, `stripe-verification`, `_dmarc`, `google._domainkey`,
  `resend._domainkey`
- Fly plumbing (grey/DNS-only — cert renewal depends on these):
  `_acme-challenge` / `_acme-challenge.www` / `_acme-challenge.next` CNAMEs,
  `_fly-ownership` / `_fly-ownership.www` / `_fly-ownership.next` TXTs

---

## Open items on this zone (tracked, not part of the flip)

| item | status |
|---|---|
| **SSL/TLS mode = Full (strict)** | ⚠ UNCONFIRMED — check dashboard → SSL/TLS. Must be Full (strict); Flexible would mean CF→origin plaintext and can loop redirects. |
| SPF record | Missing entirely (`v=spf1 include:_spf.google.com ~all` TXT on root) — pre-existing gap, hurts mail deliverability; add any time. |
| Origin lockdown | `glyphh-ai-web.fly.dev` still answers directly. Cosmetic for the marketing site; harden with Authenticated Origin Pulls as part of the server migration (task #4), where it actually matters. |
| `CF-Connecting-IP` in the server | `api.glyphh.ai` is ALREADY behind CF (since the zone import) — the server's IP-keyed rate limiter + guest usage cap must read the real client IP from CF's headers, trusted only from CF peers. Lands with task #4. |
| Heroku decommission (web) | After cutover + ~1 week clean: remove the `deploy-heroku` job from `web/.github/workflows/deploy.yml`, then scale down/delete the `glyphh-web` Heroku app. |
| `next.glyphh.ai` cleanup | After cutover settles: `fly certs remove next.glyphh.ai -a glyphh-ai-web`, delete the `next`, `_acme-challenge.next`, `_fly-ownership.next` records. |

## Naming convention (standing)

Fly apps are **`<org-slug>-<folder>`** mirroring the GitHub repos: `glyphh-ai-web`,
`glyphh-ai-server`, … Deploy tokens are app-scoped
(`fly tokens create deploy -a <app>`), one per repo, stored as `FLY_API_TOKEN` in that
repo's Actions secrets. Deploys go through GitHub Actions — never a local `fly deploy`.
