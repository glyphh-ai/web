# Teach a bot: voiceover and caption

A reel for Instagram about the live demo at demo.glyphh.ai/bot: a bot that learns a rule it is never told, from the
answers alone. The phone in the picture is a recording of the live demo on a phone-sized screen (390 × 844), played
by the rule "no receipt, no money". In the explainer's look: black, Glyphh purple, Geist and JetBrains Mono, the glam
layer, the same voice and the same music.

`teach-a-bot-voiced.mp4` is the finished video: 1080 × 1920, 30 fps, 1:25, with one continuous ElevenLabs take (the
Eric voice on eleven_v3, no silence spliced in, nothing stretched), also saved as `voiceover.wav`, over the
explainer's ElevenLabs Music instrumental (`music.wav`, cut to length and ducked under the voice; `mix.wav` is the two
together). It ends on the logo screen, "We put the human back in intelligence", with no voice over it.
`teach-a-bot-phone.mp4` is the same video at a smaller size, for sending and posting from a phone.
`teach-a-bot.mp4` is the same picture with no audio track, for Camtasia. The picture is retimed to the voice
(`retime.json`), so the times below are when each line starts and ends in the video. The headlines are on screen, so
it still reads with sound off.

## Voiceover

| Start | End | Say |
| --- | --- | --- |
| 0:00.3 | 0:04.3 | What if you could teach a bot your rule, without ever telling it the rule? |
| 0:04.7 | 0:09.7 | This is a bot that approves expenses. Right now, it knows nothing. |
| 0:10.0 | 0:15.9 | So I made up a rule: no receipt, no money. And I kept it to myself. |
| 0:16.4 | 0:24.2 | At first, it asks me about everything. I just answer: approve, reject. Every answer goes to Ada. |
| 0:24.6 | 0:32.6 | After five answers, it starts deciding on its own. It shows me which of my answers it's standing on, and I check its work. |
| 0:32.9 | 0:43.3 | Now look at this one. Ada says approve. But she has little to stand on, so the bot asks instead of guessing. Good thing: there's no receipt. |
| 0:43.7 | 0:48.6 | Then it gets quiet. In the last twenty expenses, it didn't ask once. |
| 0:48.9 | 0:55.8 | The result: it asked about ten of the forty, decided thirty on its own, and got every one of them right. |
| 0:56.2 | 1:01.7 | And here's what it learned my decisions turn on: the receipt. I never told it that. |
| 1:02.0 | 1:09.3 | No prompt. No training run. No language model. Just my answers, each one counted at once. |
| 1:09.6 | 1:19.8 | That's Ada: the model this bot runs on. It learns the job, and knows when to ask. Teach it your own rule at demo dot glyph dot A I. |

Two rules for the words. Ada is the model, never the bot: the bot is the program that asks or acts, and it runs on
Ada. Glyphh is said "glyph", so the voice is given "glyph" to read (`vo.json`). The take was read back with
ElevenLabs speech-to-text and says these words; nobody has listened to it yet.

## Where every number comes from

- **The recording** (`phone-recording.mp4`, `recording.json`): the live demo at https://demo.glyphh.ai/bot/ on
  12 November 2026, with the start screen and mascot of that evening, `record.mjs` tapping at a person's pace by the
  rule "approve with a receipt, reject without". The rule is in the script alone; the page sends the bot an outcome
  and nothing else. Nothing in the recording is drawn or edited: the reel cuts it, holds it and speeds it up. The
  fast stretch (expenses 8 to 40) says its speed on screen; elsewhere, fitted to the voice, it runs between a hold and
  about twice its speed. The white circles are where the script tapped.
- **10 asked, 30 alone, 0 wrong; none asked in the last 20:** the demo's own summary screen in that recording.
- **"After five answers":** the bot asked about the first five expenses and decided the sixth alone.
- **The safety catch:** expense 7 in that recording, a $2,091 taxi with no receipt. Ada said approve at 81% with
  little to stand on, so the bot asked; by the rule it is a reject.
- **"The receipt":** the demo's "what your decisions turn on" bars at the end of that take: Receipt 1.00, Amount
  0.36, Category 0.28, Policy check 0.05, Department 0.05.
- **"About a tenth of a second"** (on screen): the demo shows each decision's round trip to Ada Cloud; in the
  recordings they run around 100 ms.
- **Why this rule, and this take.** The first cut used "nothing over $500" and a take with 0 wrong. Re-recording
  showed that was lucky: seven takes of that rule that evening got 0, 0, 1, 0, 2, 3 and 2 decisions wrong, most of
  them within about $100 of the line. Chris chose to switch to "no receipt, no money", which the bot learned without
  a wrong decision in the three takes measured earlier (`platform/README.md`: 12 asked, 0.0 wrong a take). This is the first take
  recorded with it, not one picked from several.
- **"No language model":** the demo page runs Ada alone, and says so.

## Caption

```
What if you could teach a bot your rule without ever telling it the rule?

I made up a rule for approving expenses and kept it to myself: no receipt, no money. The bot asked, I answered, and Ada learned it from my answers: 10 questions in 40 expenses, 30 decisions on its own, none wrong. No prompt, no training run, no language model.

Teach it your own rule, no sign-in: demo.glyphh.ai

#AI #agents #automation #startups #buildinpublic
```

## Making it again

```sh
node record.mjs /tmp/teachbot/rec receipt   # the live demo, recorded (a new take: new numbers)
python3 conform.py /tmp/teachbot/rec        # 30 frames a second; phone-recording.mp4 and recording.json
node render.mjs /tmp/teachbot/rec --story   # what the take gives the script: write vo.json's lines from it
node voice.mjs                              # the voice take (vo.json), voice-lines.json and retime.json
node render.mjs /tmp/teachbot/rec           # teach-a-bot.mp4 and cover.jpg
sh mix.sh                                   # music.wav, mix.wav, teach-a-bot-voiced.mp4
```

The reel's cuts, the "after N answers" and result headlines and the speed label come from `recording.json`; the
voice's words (`vo.json`) are written by hand from `--story`. To render from the kept recording instead of a new
take: `ffmpeg -i phone-recording.mp4 -start_number 0 -q:v 2 /tmp/teachbot/rec/cfr/%05d.jpg`, then `render.mjs`.
`voice.mjs --retime` writes `retime.json` again from the take already made.
