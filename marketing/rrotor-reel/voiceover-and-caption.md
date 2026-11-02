# rrotor reel: voiceover and caption

The video is `rrotor-reel.mp4`: 1920 × 1080, 30 fps, 56.5 seconds, with a silent audio track, in the site's cut
(white on black, grey hairlines, Geist and JetBrains Mono, no accent colour). Every line of the voiceover is on screen
as a caption, so it plays with sound off; record over it from 0:00, or record yourself speaking to it. The times
below are when each line starts and should be finished. Each scene is also its own clip in `clips/`, and the whole
thing is laid out for Camtasia in `rrotor-reel.cmproj` (below).

## Voiceover

| Start | End | Say |
| --- | --- | --- |
| 0:00.3 | 0:02.6 | Your teams make pages, tools and jobs with AI. Then what? |
| 0:02.8 | 0:05.0 | rrotor is where that content lives, and is governed. |
| 0:05.4 | 0:08.6 | One session: a page, a command-line tool, a scheduled program. |
| 0:08.9 | 0:12.7 | Three things. One contract. |
| 0:13.3 | 0:16.2 | Each one is deployed by commit. |
| 0:16.4 | 0:19.6 | Runs in a sandbox that reaches only the hosts it names. |
| 0:19.8 | 0:23.0 | Waits for a person, where you said so. |
| 0:23.2 | 0:26.7 | And lands at your own host. Through Glyphh: nothing. |
| 0:27.3 | 0:30.5 | An app: the page Claude wrote, published to your people. |
| 0:30.7 | 0:34.7 | A reviewer approves it. Only the roles you named can open it. |
| 0:35.3 | 0:39.0 | A CLI: a tool Claude drives without touching your machine, as the person who asked. |
| 0:39.2 | 0:42.7 | Claude Code, Codex, Gemini, Cursor, Grok and Copilot come built in. |
| 0:43.3 | 0:46.4 | A program: its secrets in the vault, its schedule fired by the runtime. |
| 0:46.6 | 0:49.7 | Its approvals, yours. |
| 0:50.4 | 0:53.0 | Free on one node. Ask Claude to install rrotor. |
| 0:53.2 | 0:56.2 | glyphh dot ai, slash products, slash rrotor. |

## What is on screen

- **0:00 to 0:05, the hook:** "What your teams make with AI has nowhere to live." becomes "rrotor: the secure runtime where it lives, and is governed."
- **0:05 to 0:13, one session:** a Claude Code card where three asks go in (a dashboard, a PR merge with gh, a morning job) and three cards come out: App `deploy-failures`, CLI `github`, Program `daily_sales`; then the line "one contract: glyphh.json · deploy by commit · sandbox · vault · approvals · audit".
- **0:13 to 0:27, the race:** three lanes run through four gates on one clock: Deploy by commit (a SHA chip), Sandbox (the hosts each may reach), Approval (chris ✓, as reviewer, for "pr merge *", for "write") and Your host (`/apps/deploy-failures/`, `exit 0, as chris`, `ledger written`). The meter "Through Glyphh" stays at 0 bytes while "On your rrotor" counts 3 versions, 3 runs, 3 approvals at `rrotor.acme.internal`.
- **0:27 to 0:35, apps:** a browser at `https://rrotor.acme.internal/apps/deploy-failures/` says "409 not reviewed yet"; the catalogue card (version 3, draft, published by claude for chris) gets Approve pressed at 0:30.4, turns "approved · engineering", and the page appears, signed in as chris.
- **0:35 to 0:43, CLIs:** `cli_run github pr merge 42` → `needs_approval` → chris approves → `done exit 0, as chris, in chris's own home`; then the built-in row: Claude Code, Codex, Gemini, Cursor, Grok, Copilot, glyphh.
- **0:43 to 0:50, programs:** 06:15 UTC, the schedule fires `daily_sales.start`, it asks to write $4,812 to the ledger, chris approves, done; then the chips: vault, schedule, SQLite, hosts, audit.
- **0:50 to 0:56.5, the end card:** the wordmark, "rrotor", "Govern the AI content your teams create, in one place.", and "Free on one node · ask Claude: “install rrotor” · glyphh.ai/products/rrotor".

## Camtasia

`rrotor-reel.cmproj` opens in Camtasia 2026 on the Mac. Its timeline has three tracks: **Graphic** holds
`rrotor-reel-graphic.mp4` (the same video, no audio track) from 0:00; **Screen recording** and **Voice-over** are
empty, for a Camtasia recording of a real session and your voice. The scene clips are in the media bin too, so a
scene can be moved, trimmed or repeated around your recording. There is a marker at the start of every scene and one at
every voiceover line, named with the words to say, so the marker list is the script.

Suggested cuts:

- **The reel with your voice:** record the voice-over on its track against the markers, export.
- **Demo in the middle:** keep the hook, the session and the race (0:00 to 0:27), then your screen recording of the
  real thing (publish from Claude, approve on the platform, open the app; a `cli_run` with an approval), then the end
  card clip. The three close-up scenes can sit over the recording as picture-in-picture, or go.
- **You on camera:** your recording on the Screen recording track at the start and end, the graphic in the middle.

## Caption

```
Your teams make pages, tools and jobs with AI. Then what?

rrotor is the secure runtime where that content lives and is governed: pages, tools and jobs made with Claude, Codex, Gemini, Cursor, Grok or Copilot, each deployed by commit, run in a sandbox, reviewed by a person, opened by role and on record, at your own host. Through Glyphh: nothing.
Free on one node. Ask Claude to install rrotor. glyphh.ai/products/rrotor

#buildinpublic #devtools #claudecode #agents #AI #startups
```

## Where every fact comes from

Everything on screen is what rrotor 0.2.0 does (glyphh-ai/rrotor, docs/architecture.md 5.7, 5.8, 9, 13; glyphh-ai/server
docs/specs/apps.md; the glyphh plugin's publish and rrotor skills). The names (deploy-failures, acme, chris, $4,812,
the commit SHAs) are illustrative. `daily_sales` is rrotor's own example program; `github` is its example CLI
manifest (gh 2.62.0, allow "pr *", approvals "pr merge *"). The built-in CLIs and their pins are `image/clis.json`.
"0 bytes through Glyphh" is the architecture's rule: the server is never on the data path; it signs the licence and
keeps the catalogue entry (a title, a version, a state), and rrotor connects out for those, never the other way.
