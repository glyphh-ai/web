# Typed Answers Reel: voiceover and caption

The video is `typed-answers-reel.mp4`: 1080 × 1920, 30 fps, 30.0 seconds, with a silent audio track. Record the voiceover against it from 0:00. The times below are when each line starts and should be finished.

## Voiceover

| Start | End | Say |
| --- | --- | --- |
| 0:00.2 | 0:03.3 | Not every question is pick one. |
| 0:03.7 | 0:07.2 | Here's one support ticket, recorded once, and every answer comes back typed. |
| 0:07.6 | 0:08.2 | Five kinds. |
| 0:08.3 | 0:10.2 | A choice: what kind of ticket? A bug. |
| 0:10.3 | 0:12.2 | A score: how bad? Critical, in order. |
| 0:12.3 | 0:14.3 | Yes or no: is it urgent? Yes. |
| 0:14.4 | 0:16.4 | A number: how much to refund? |
| 0:16.5 | 0:18.9 | And many: every tag that fits. |
| 0:19.3 | 0:21.1 | Then unions. Ask only what applies. |
| 0:21.2 | 0:22.5 | It's a bug, so it rates the severity... |
| 0:22.6 | 0:25.0 | ...and it never guesses a refund. That one doesn't apply. |
| 0:25.3 | 0:28.0 | Build with AI. Run without it. |
| 0:28.1 | 0:29.8 | glyphh dot ai. Free to start. |

What is on screen at those moments:

- **0:00 to 0:03.4:** the hook, "Not every question is pick one."
- **0:03.6:** "One ticket. Every answer typed.", then the ticket card at 0:04.6: an enterprise customer on mobile, "app crashes on launch after update".
- **0:07.5:** "Say what the answer is." Then one row lands at each line: choice "bug" (0:08.3), score critical, level 2.997 (0:10.3), noul yes, p 0.9985 (0:12.3), number $281.90 for a billing ticket (0:14.4), many mobile and enterprise (0:16.5).
- **0:19.3:** "Ask only what applies." The kind box (0:20.0), then severity critical, applies true (0:21.2), then refund not asked, applies false, dashed (0:22.6), then the `when` line (0:23.4).
- **0:25.3:** the end card: "Build with AI. Run without it.", the five kinds and ada-1-2-beta, the wordmark and "Free to start · glyphh.ai".

The refund row is the only answer from a second ticket, a billing one, because a bug ticket has no refund. That is what the union scene then shows. If you want to say it, "on a billing ticket" fits after "how much to refund?".

## Caption

```
Not every question is pick one.

Ada now answers in types: a choice, an ordered score, a yes or no with its probability, an amount, or any number of labels at once. And with unions, a question is only asked when it applies, so a bug ticket never gets a refund guessed for it.

One case, recorded once. Every answer typed. In ada-1-2-beta, free to start at glyphh.ai

#buildinpublic #devtools #softwareengineering #developers #AI #typescript #python
```

## Where every number comes from

One run of Ada's kernel 3.15.0 on 29 October 2026: a support model with all five kinds (`kind` a choice, `severity` a score, `refund` a number from 0 to 500 in steps of 25, `urgent` a noul, `tags` many) and two unions (severity when the kind is bug, refund when it is billing). It recorded 400 tickets, 217 bugs and 183 billing, then answered two new ones.

- **Bug ticket**, an enterprise customer on mobile, "app crashes on launch after update": kind bug; severity critical, level 2.997; urgent yes, p 0.9985; tags mobile and enterprise; refund `applies: false`.
- **Billing ticket**, a pro customer on the web with a $299 invoice, "I was charged twice this month": refund value 281.9 (its likeliest step $275 to $300); urgent no, p 0.003; tags web; severity `applies: false`.

The same numbers are in the blog post, "Typed Answers".
