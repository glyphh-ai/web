# Ada vs. Jev: the launch-post video

`ada-vs-jev.mp4`: 1920 × 1080, 30 fps, 28.0 seconds, silent track. Built in the site's cut (white on black, grey
hairlines, Geist and JetBrains Mono, no accent colour) for the launch post and X. Every line of the voiceover is
also on screen as a caption, so it plays with sound off; record over it if you want a voice.

## Voiceover (optional)

| Start | End | Say |
| --- | --- | --- |
| 0:00.4 | 0:04.2 | TypeSafe published the workflow. We ran Ada through the same one. |
| 0:04.8 | 0:09.6 | Triage decides whether to act. Containment decides what to do. |
| 0:10.2 | 0:14.8 | Jev answers every question from pretraining. Ada answers from your own past alerts. |
| 0:15.4 | 0:18.2 | Alone, Jev and Ada tie: twenty-seven of fifty each. |
| 0:18.4 | 0:22.4 | Let Ada triage and hand Jev the ones it acts on: thirty-one of fifty. |
| 0:23.0 | 0:27.8 | Ada decides what it has seen. Everything else goes to the model. |

## What is on screen

- 0:00 the hook; 0:04.6 the workflow as four boxes, alert → triage → containment → action; 0:10 "answered by" tags
  on triage (Ada) and containment (Jev); 0:15 three bars on one scale, Jev 54%, Ada 54%, Ada + Jev 62%; 0:23 the end
  card with the wordmark, "Free to start · glyphh.ai", the benchmarks repo, and the fine print.

## Where every number comes from

benchmarks/typesafe-workflows (glyphh-ai/benchmarks): `score.py` and `hybrid.py` with `BENCH_SET=test`. TypeSafe's
published Security Incidents workflow (evals.typesafe.ai) rebuilt with its public questions and thresholds; the
reference action is the policy on the mean of two frontier LLMs' answers, as TypeSafe scores it. 50 held-out
alerts, generated and labelled after Ada's setup was frozen on the 239 dev alerts. Jev alone 27/50 (54.0%, jev-latest
on 29 Oct 2026, $0.0065 for the 50 at list price, 0.197 s an alert). Ada alone 27/50 (54.0%, ada-1-2-beta, kernel
3.15.0 at the time, trained on the 239, $0). Ada's triage with Jev's containment where Ada acts: 31/50 (62.0%), Jev
asked on 28 of the 50 ($0.0028). On the 239 dev alerts (five-fold) Jev alone is ahead, 59.4% to 49.8%; the video
shows the held-out set only, which is the fair one, and says "tie", not "wins".
