# Why Ada Reel: voiceover and caption

The video is `why-ada-reel.mp4`: 1080 × 1920, 30 fps, 28.6 seconds, with a silent audio track. Record the voiceover against it from 0:00. The times below are when each line starts and should be finished.

## Voiceover

| Start | End | Say |
| --- | --- | --- |
| 0:00.1 | 0:03.0 | Quick race. Claude alone versus Glyphh Ada. |
| 0:03.1 | 0:05.6 | Same claim. Same forty past decisions. |
| 0:05.7 | 0:06.0 | Go. |
| 0:06.5 | 0:09.0 | Ada's done. Three twenty-six milliseconds. |
| 0:09.1 | 0:13.2 | Reject. Seventy-nine percent sure. Fifteen precedents behind it. |
| 0:13.4 | 0:14.6 | Claude's still working. |
| 0:14.9 | 0:15.7 | Great model. |
| 0:16.0 | 0:19.0 | But your history already answers this one. |
| 0:19.3 | 0:22.9 | Reject. Thirteen point three seconds. Twenty-eight cents. |
| 0:23.0 | 0:26.2 | Same answer. Ada never called an LLM. |
| 0:26.3 | 0:28.5 | glyphh dot ai. Free to start. |

What is on screen at those moments:

- **0:00 to 0:03:** the hook card, "Same question." and "Claude alone vs. Glyphh Ada.", with the claim.
- **0:06.0:** both questions go in at the same moment.
- **0:06.3:** Ada's badge appears: "reject · 79% sure · 326 ms".
- **0:19.3:** Claude answers, and its badge reads "reject · 13.3 s · $0.28".
- **0:22.6:** the end card fades in with both results, the tagline and "Free to start · glyphh.ai".

The silence after "Go." is on purpose: Ada's badge lands in it. Keep the pause before "Reject. Thirteen point three seconds" so Claude's answer lands first.

## Caption

```
Same question. Claude alone: 13.3 s. Glyphh Ada: 326 ms.

Both had the same 40 past expense decisions. Both said reject.
Claude alone: 19,752 tokens in, $0.28 at list price.
Glyphh Ada: 79% sure, 15 precedents behind it, 0 LLM tokens.
Give your code the ability to reason without an LLM. Free to start at glyphh.ai

#buildinpublic #devtools #softwareengineering #developers #AI #LLM #startups
```

## Where every number comes from

Both sides are terminal recordings made on one laptop on 26 October 2026 and played in real time. They are the same recordings as the Why Ada section on glyphh.ai.

- **13.3 s, 19,752 tokens in, 678 out:** these come from the Claude Code session's own transcript (Claude Fable 5.1 reading history.json with the Read tool only).
- **$0.28:** the same usage priced at Anthropic's list price, with 1-hour cache writes.
- **326 ms:** the Ada call's own clock, for the whole round trip from a fresh process.
- **79%, 15 precedents:** Ada Cloud's answer on launch-demo-expenses was reject at 0.7896, with 15 receipts.
- **40 past decisions:** history.json and the Ada model hold the same 40 expenses.
