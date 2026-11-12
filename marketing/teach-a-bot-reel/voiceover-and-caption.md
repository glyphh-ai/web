# Teach a bot: voiceover and caption

A reel for Instagram about the live demo at demo.glyphh.ai/bot: a bot that learns a rule it is never told, from the
answers alone. The phone in the picture is a recording of the live demo on a phone-sized screen (390 × 844), played
by the rule "nothing over $500". In the explainer's look: black, Glyphh purple, Geist and JetBrains Mono, the glam
layer, the same voice and the same music.

`teach-a-bot-voiced.mp4` is the finished video: 1080 × 1920, 30 fps, 1:17, with one continuous ElevenLabs take (the
Eric voice on eleven_v3, no silence spliced in, nothing stretched), also saved as `voiceover.wav`, over the
explainer's ElevenLabs Music instrumental (`music.wav`, cut to length and ducked under the voice; `mix.wav` is the two
together). It ends on the logo screen, "We put the human back in intelligence", with no voice over it.
`teach-a-bot-phone.mp4` is the same video at a smaller size (16 MB), for sending and posting from a phone.
`teach-a-bot.mp4` is the same picture with no audio track, for Camtasia. The picture is retimed to the voice
(`retime.json`), so the times below are when each line starts and ends in the video. The headlines are on screen, so
it still reads with sound off.

## Voiceover

| Start | End | Say |
| --- | --- | --- |
| 0:00.3 | 0:03.6 | What if you could teach a bot your rule, without ever telling it the rule? |
| 0:03.8 | 0:08.1 | This is a bot that approves expenses. Right now, it knows nothing. |
| 0:08.5 | 0:12.9 | So I made up a rule: nothing over five hundred dollars. And I kept it to myself. |
| 0:13.3 | 0:19.3 | At first, it asks me about everything. I just answer: approve, reject. Every answer goes to Ada. |
| 0:19.6 | 0:27.3 | After six answers, it starts deciding on its own. It shows me which of my answers it's standing on, and I check its work. |
| 0:27.5 | 0:38.2 | Now look at this one. Ada says approve. But she has little to stand on, so the bot asks instead of guessing. Good thing: five eighty-three is over my limit. |
| 0:38.7 | 0:42.7 | Then it gets quiet. In the last twenty expenses, it asked me twice. |
| 0:43.0 | 0:50.2 | The result: it asked about thirteen of the forty, decided twenty-seven on its own, and got every one of them right. |
| 0:50.7 | 0:55.7 | And here's what it learned my decisions turn on: the amount. I never told it that. |
| 0:55.9 | 1:02.4 | No prompt. No training run. No language model. Just my answers, each one counted at once. |
| 1:02.5 | 1:11.3 | That's Ada: a bot that learns its job, and knows when to ask. Teach it your own rule at demo dot glyphh dot A I. |

The take was read back with ElevenLabs speech-to-text and says these words (the address heard as "demo.glif.ai").

## Where every number comes from

- **The recording** (`phone-recording.mp4`, `recording.json`): the live demo at https://demo.glyphh.ai/bot/ on
  12 November 2026, `record.mjs` tapping at a person's pace by the rule "approve at $500 or under, reject over". The
  rule is in the script alone; the page sends the bot an outcome and nothing else. Nothing in the recording is drawn
  or edited: the reel cuts it, holds it and speeds it up. The fast stretch (expenses 22 to 40) says "8× speed" on
  screen; elsewhere, fitted to the voice, it runs between a hold and about twice its speed. The white circles are
  where the script tapped.
- **13 asked, 27 alone, 0 wrong; 2 asked in the last 20:** the demo's own summary screen in that recording. Expense
  21 ($583, Ada "approve at 100%" with little to stand on, so the bot asked) is in it as it happened.
- **"After six answers":** in this take the bot asked about the first six expenses and decided the seventh alone.
- **"The amount":** the demo's "what your decisions turn on" bars at the end of that take: Amount 1.00, Policy
  check 0.54, Category 0.15, Department 0.09, Receipt 0.00.
- **"About a tenth of a second"** (on screen): the demo shows each decision's round trip to Ada Cloud; in the
  recording they run around 100 ms (88 to 133 ms in the frames checked).
- **This take against others:** four takes were recorded the same way that evening; the first three were not usable
  as picture (two at half resolution, one with black frames from the capture method). Their results: 13 asked and 0
  wrong, 20 and 0, 18 and 1. The measured average for this rule is 15 asked and 0.3 wrong a take
  (`platform/README.md`), so this take is on the good side of typical, and a take can have a wrong decision in it.
- **"No language model":** the demo page runs Ada alone, and says so.

## Caption

```
What if you could teach a bot your rule without ever telling it the rule?

I made up a rule for approving expenses and kept it to myself. The bot asked, I answered, and Ada learned it from my answers: 13 questions in 40 expenses, 27 decisions on its own, none wrong. No prompt, no training run, no language model.

Teach it your own rule, no sign-in: demo.glyphh.ai

#AI #agents #automation #startups #buildinpublic
```

## Making it again

```sh
node record.mjs /tmp/teachbot/rec        # the live demo, recorded (a new take: new numbers, so the words change)
python3 conform.py /tmp/teachbot/rec     # 30 frames a second; phone-recording.mp4 and recording.json
node voice.mjs                           # the voice take (vo.json), voice-lines.json and retime.json
node render.mjs /tmp/teachbot/rec        # teach-a-bot.mp4 and cover.jpg
sh mix.sh                                # music.wav, mix.wav, teach-a-bot-voiced.mp4
```

To render from the kept recording instead of a new take:
`ffmpeg -i phone-recording.mp4 -start_number 0 -q:v 2 /tmp/teachbot/rec/cfr/%05d.jpg`, then `render.mjs`.
`voice.mjs --retime` writes `retime.json` again from the take already made.
