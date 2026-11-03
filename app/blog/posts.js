/**
 * The blog's posts — the store behind /blog, /blog/[slug], and the home
 * page's Latest section. Newest first. A post's `sections` carry an id, a
 * heading, and the paragraphs under it; the article page builds "On this
 * page" from them. Copy is his; spelling and grammar cleaned, voice left alone.
 */

import { bars, pairs, scatter, lines, punchCard } from './charts';

export const POSTS = [
  {
    slug: 'a-bot-that-learned-its-job',
    title: 'A bot that learned its job, then did it for a twentieth of the cost',
    summary: 'A lab of Claude bots ran 103 coding trials for $3.97 and found Haiku passed everything Sonnet and Opus did. A coder bot taught by that lab then passed 10 of 10 new tasks for 5% of what always-Opus cost.',
    date: '2026-11-03',
    author: 'Chris "Timme"',
    minutes: 6,
    tags: ['Ada', 'Research', 'Benchmarks'],
    related: [
      ['Claude bots, the use case', '/use-cases/claude-bots'],
      ['The SDKs', 'https://docs.glyphh.ai/sdks'],
    ],
    sections: [
      {
        id: 'hi',
        heading: null,
        body: [
          'Hi everyone, Chris here. Most agents today are a prompt and a hope. You tell the model the rules, you tell it the budget, and you trust it to remember both. Then you pay for the biggest model on every step, because you don\'t know which steps need it.',
          'So I tried something else, and ran it on my Mac today. Here\'s what a Glyphh bot is, what a lab of them found out about Claude, and what it saved when a bot used what the lab learned.',
          {
            wide: true,
            html:
              '<div class="bl-stats">' +
              '<div class="bl-stat"><b>10 / 10</b><span>new coding tasks passed by the coder bot</span><small>always Sonnet: 9 / 10</small></div>' +
              '<div class="bl-stat"><b>0.05×</b><span>what always-Opus cost for the same 10</span><small>$0.050 against $1.057</small></div>' +
              '<div class="bl-stat"><b>103</b><span>trials the lab ran to learn it</span><small>$3.97 in all</small></div>' +
              '</div>',
          },
        ],
      },
      {
        id: 'what-a-bot-is',
        heading: 'What a bot is',
        body: [
          'A Glyphh bot is a Claude agent with a program around it. Four parts:',
          {
            html: '<ul><li><strong>The program</strong> runs the loop. What happens next, in what order, and when it\'s done is code, not a prompt.</li><li><strong>Hard gates</strong> are rules in that code: the budget, what the bot may do, what needs a person to approve. A step that breaks one is refused. Every time.</li><li><strong>Ada gates</strong> make the judgment calls between steps, like which model a task needs. Each one is an Ada model. It learns from real outcomes and from the answers a person gives.</li><li><strong>Claude</strong> is called only for the steps that need it.</li></ul>',
          },
          'And bots are made by a bot. The orchestrator is a bot like any other, with its own program and gates, and it learns from every bot it makes.',
        ],
      },
      {
        id: 'the-lab',
        heading: 'The lab',
        body: [
          'I pointed the orchestrator at one question: how does Claude do coding work best? Each generation it proposed experiments. Haiku against Sonnet against Opus. A plain prompt against tests first, plan first, or edge cases first. Its hard rules refused any proposal outside those arms, and any that changed more than one thing at once. For each proposal left, it made an experiment bot.',
          {
            html: 'A trial was <code>claude -p</code> in a fresh temporary folder on one of 12 small Python tasks: bugfixes, from-scratch builds and multi-file changes. A cron next-run, an expression evaluator, a bank ledger bug, CSV quoting, money rounding. Each was judged by hidden tests Claude never saw. Each experiment bot\'s Ada gate learned which cells, a task and an arm, were already known, and only sent trials where the outcome wasn\'t.',
          },
          'Here\'s what it found:',
          {
            html: '<ul><li><strong>Haiku passed every task Sonnet and Opus did</strong>, at about a tenth of Sonnet\'s cost and a 25th of Opus\'s, six trials an arm per experiment.</li><li><strong>Tests first and edge cases first cost more and gained nothing.</strong></li><li><strong>Haiku was slower</strong>, two to three times on the hardest tasks.</li></ul>',
          },
          {
            html: 'The part I like most is what the lab learned about itself. After its first three findings, its own <code>promising</code> gate rated two model-against-model proposals at P(decisive) 1.00 and 0.95, and a prompting proposal at 0.17. It ran them in that order. The orchestrator had learned which experiments pay off.',
          },
          'The whole lab was 103 trials and $3.97 of Claude usage. Per trial, on average: Haiku $0.0039, Sonnet $0.0395, Opus $0.1011.',
        ],
      },
      {
        id: 'the-proof',
        heading: 'The proof',
        body: [
          {
            html: 'A finding is only worth something if it carries over. So I made a <code>coder</code> bot and handed it what the lab learned: its Ada <code>route</code> gate was seeded from the lab\'s trials, each task\'s cheapest model that passed every time. Then I gave it five tasks the lab never saw: a slugify bugfix, a token-bucket rate limiter bugfix, a topological sort that reports cycles, a small template language, and a multi-file job queue with retries and dead letters. Twice each, against always Opus and always Sonnet, which is Claude Code\'s default.',
          },
          {
            wide: true,
            html: bars('What 10 held-out coding tasks cost', 'Total Claude usage for 5 new tasks, twice each, as Claude Code reports it.', [
              ['Always Opus, 10 of 10', 1.057],
              ['Always Sonnet, 9 of 10', 0.487],
              ['Routed by the bot, 10 of 10', 0.05, 'ada'],
            ], { max: 1.2, ticks: [0, 0.25, 0.5, 0.75, 1], fmt: (v) => `$${v.toFixed(3)}`, tickFmt: (v) => `$${v.toFixed(2)}` }),
          },
          {
            wide: true,
            html:
              '<div class="bl-table"><table><thead><tr><th></th><th class="n">Tasks</th><th class="n">Passed</th><th class="n">Total $</th><th class="n">vs always Opus</th><th class="n">Total s</th></tr></thead><tbody>' +
              '<tr><th>Always Opus</th><td class="n">10</td><td class="n">10</td><td class="n">1.057</td><td class="n">1.00×</td><td class="n">315</td></tr>' +
              '<tr><th>Always Sonnet (Claude Code\'s default)</th><td class="n">10</td><td class="n">9</td><td class="n">0.487</td><td class="n">0.46×</td><td class="n">280</td></tr>' +
              '<tr class="ada"><th>Routed by the coder bot</th><td class="n">10</td><td class="n">10</td><td class="n">0.050</td><td class="n">0.05×</td><td class="n">351</td></tr>' +
              '</tbody></table></div>',
          },
          {
            html: '<strong>The bot passed all ten, like always Opus, for a twentieth of the cost.</strong> It picked Haiku for every task at P 1.00, and never needed its escalation ladder, Haiku to Sonnet to Opus on a failure. Always Sonnet missed one and cost ten times as much.',
          },
        ],
      },
      {
        id: 'what-it-leaves-out',
        heading: 'What it leaves out',
        body: [
          'Here\'s what this test doesn\'t show, so you can weigh the rest:',
          {
            wide: true,
            html:
              '<aside class="bl-caveat"><span class="qs-kicker">Caveats</span><ul>' +
              '<li>The tasks are small, written for the test, and Python only. Your codebase is bigger and messier.</li>' +
              '<li>Five held-out tasks, twice each, is a small sample. Read the cost gap, not the pass counts.</li>' +
              '<li>The hidden tests stand in for a project\'s own tests. A bot is only as good as the outcome it learns from.</li>' +
              '<li>The route collapsed to one model, so the escalation ladder went untested.</li>' +
              '<li>Haiku was slower: 351 seconds in all, against 315 for Opus and 280 for Sonnet.</li>' +
              '<li>Costs are what Claude Code reports for each run, not an invoice.</li>' +
              '</ul></aside>',
          },
        ],
      },
      {
        id: 'next',
        heading: 'What\'s next',
        body: [
          'The point isn\'t that Haiku is always enough. It won\'t be, on harder work. The point is that a bot doesn\'t have to guess. It can find out what a job needs, remember it, and pay for that and no more. When a task does need Opus, the gate learns that too.',
          {
            html: 'The whole write-up, with the table and how a bot is put together, is on <a href="/use-cases/claude-bots">the Claude bots use case</a>.',
          },
          'Build with AI. Run without it.',
          '— Timme',
        ],
      },
    ],
  },
  {
    slug: 'typed-answers',
    title: 'Typed Answers — Scores, Yes or No, Numbers, Labels and Unions',
    summary: 'One case, recorded once, and every question about it answered in its own type: an ordered level, a yes or no, an amount, a set of labels, and questions that are only asked when they apply.',
    date: '2026-10-29',
    author: 'Chris "Timme"',
    minutes: 5,
    cover: '/blog/typed-outputs-cover.png',
    coverAlt: 'One case. Every answer typed. A bug ticket answered with a critical severity, urgent and two tags; a billing ticket answered with a refund of 281.9.',
    tags: ['Ada', 'Guides'],
    related: [
      ['The spec', 'https://docs.glyphh.ai/getting-started#the-spec'],
      ['Ada versions', 'https://docs.glyphh.ai/ada-versions'],
      ['The SDKs', 'https://docs.glyphh.ai/sdks'],
    ],
    sections: [
      {
        id: 'hi',
        heading: null,
        body: [
          'Hi everyone, Chris here. Until today every question you asked Ada had the same shape: pick one of these. Route to billing or platform. Approve or reject. That covers a lot, but it\'s not how real questions come. How bad is this bug is a level, and being one level off is not the same mistake as being three off. Is it urgent is a yes or no. How much should we refund is an amount. Which products does it touch can be more than one. And how much to refund only makes sense if it\'s a billing ticket in the first place.',
          {
            html: 'So now each of a model\'s named outputs says what its answer <em>is</em>, with a <code>kind</code>, and an output can say when it applies, with <code>when</code>. You still record a case once, with every answer it has, and you still ask once. Each answer just comes back in its own type.',
          },
          {
            html: '<img src="/blog/typed-outputs-kinds.png" alt="The five kinds: choice, score, noul, number and many, what each takes in the spec, what a case records, and what its answer adds." loading="lazy" />',
          },
        ],
      },
      {
        id: 'the-spec',
        heading: 'One spec, five kinds',
        body: [
          'Here\'s a support model with one of each. A ticket is its plan, its channel, the amount on it and what the customer wrote. Then the questions:',
          {
            html: '<pre><code>"outputs": {\n  "kind":     {"values": ["bug", "billing"]},\n  "severity": {"kind": "score", "values": ["low", "medium", "high", "critical"],\n               "when": {"output": "kind", "in": ["bug"]}},\n  "refund":   {"kind": "number", "number": {"min": 0, "max": 500, "step": 25},\n               "when": {"output": "kind", "in": ["billing"]}},\n  "urgent":   {"kind": "noul"},\n  "tags":     {"kind": "many", "values": ["mobile", "web", "api", "enterprise"]}\n}</code></pre>',
          },
          {
            html: '<ul><li><strong>choice</strong> is the default, one of its values, the way it always worked.</li><li><strong>score</strong> is ordered levels. A mistake costs how many levels it\'s off, so Ada picks the answer that\'s least wrong on average, not just the most likely one, and tells you the expected <code>level</code>.</li><li><strong>noul</strong> is yes or no. You record <code>true</code> or <code>false</code> and get back <code>p</code>, the chance it\'s yes.</li><li><strong>number</strong> is an amount between a min and a max. You record the number itself, Ada learns it in steps, and you get back the expected <code>value</code>.</li><li><strong>many</strong> is any of its values at once. You record a list and get a list back, with the chance of each value on its own.</li></ul>',
          },
        ],
      },
      {
        id: 'recording',
        heading: 'Recording is the same, just typed',
        body: [
          'A case carries every answer it has, each in its own type. No mapping booleans to strings, no bucketing amounts yourself:',
          {
            html: '<pre><code>tickets.record(data, outcomes={\n    "kind": "billing", "refund": 276.40, "urgent": False, "tags": ["web"],\n})</code></pre>',
          },
          {
            html: 'Anything that doesn\'t fit is refused before it\'s stored, same as before: a tag that isn\'t in the list, a severity that isn\'t a level, and now a refund on a bug ticket. A case can\'t grade a branch its own answers leave out (<code>E_OUTPUT_WHEN</code>).',
          },
        ],
      },
      {
        id: 'unions',
        heading: 'Unions, or asking only what applies',
        body: [
          {
            html: '<code>when</code> makes an output one branch of a discriminated union. Severity hangs on <code>kind</code> being bug, refund on it being billing. When you ask about every output at once, Ada decides <code>kind</code> first, then only the branch it lands on.',
          },
          {
            html: '<img src="/blog/typed-outputs-union.png" alt="A bug ticket: kind is bug, so severity is asked and answers critical with applies true; refund is not asked and answers applies false with a null outcome." loading="lazy" />',
          },
          {
            html: 'The branch not taken doesn\'t get a guess. It answers <code>{"outcome": null, "applies": false}</code>, so your code never sees a refund amount on a crash report, and nobody has to remember to ignore one. A branch can hang on a choice, a score or a yes or no, branches can chain, and Ada refuses a spec whose branches go round in a circle.',
          },
        ],
      },
      {
        id: 'asking',
        heading: 'What comes back',
        body: [
          'I recorded 400 tickets, 217 bugs and 183 billing, and asked about two new ones. An enterprise customer on mobile, "app crashes on launch after update":',
          {
            html: '<pre><code>"severity": {"outcome": "critical", "level": 2.997, "applies": true},\n"urgent":   {"outcome": "true", "p": 0.9985},\n"tags":     {"outcome": ["mobile", "enterprise"]},\n"refund":   {"outcome": null, "applies": false}</code></pre>',
          },
          'And a pro customer on the web with a $299 invoice, "I was charged twice this month":',
          {
            html: '<pre><code>"refund":   {"outcome": "287.5", "value": 281.9, "applies": true},\n"urgent":   {"outcome": "false", "p": 0.003},\n"tags":     {"outcome": ["web"]},\n"severity": {"outcome": null, "applies": false}</code></pre>',
          },
          {
            html: 'The refund\'s <code>outcome</code> is the middle of its most likely step, $275 to $300, and <code>value</code> is the amount weighed over every step. Every answer still has its probabilities, its expected cost and the precedents it stands on, and <code>ask</code> still tells you when a person should look instead.',
          },
        ],
      },
      {
        id: 'go',
        heading: 'Try it',
        body: [
          {
            html: 'Typed outputs are in <code>ada-1-2-beta</code>. Make a model on it with <code>"ada": "ada-1-2-beta"</code>, or backtest an existing one there first. A spec without a <code>kind</code> or a <code>when</code> answers exactly as it did, so nothing you have changes. The SDKs (<code>pip install glyphh</code>, <code>npm install @glyphh-ai/glyphh</code>) read every kind, and the Ada skill in Claude writes them for you when you describe your case.',
          },
          'Build with AI. Run without it.',
          '— Timme',
        ],
      },
    ],
  },
  {
    slug: 'introducing-ada',
    layout: 'feature',
    kicker: 'Launch · Ada beta',
    title: 'Introducing Ada',
    titleHtml: 'Introducing <em>Ada</em>',
    summary: 'A decision model that learns from your own precedents, answers in milliseconds, shows the cases behind every answer, and runs without a transformer.',
    date: '2026-10-23',
    author: 'Chris "Timme"',
    minutes: 9,
    cover: '/blog/introducing-ada-hero.png',
    coverAlt: 'Introducing Ada: decisions from your own precedent, beside a punched-card pattern.',
    // The cover carries the title for the index and the home page; the article itself shows the bare card.
    heroHtml: punchCard(120, 24, 'A punched-card pattern, after the cards of Babbage\'s Analytical Engine.'),
    coverCaption: 'Ada is named after Ada Lovelace, who wrote the first program for a machine that ran on punched cards.',
    tags: ['Ada', 'Research', 'Benchmarks'],
    related: [
      ['The benchmarks', 'https://github.com/glyphh-ai/glyphh/tree/main/benchmarks'],
      ['The SDKs', 'https://docs.glyphh.ai/sdks'],
      ['Ada', '/'],
    ],
    sections: [
      {
        id: 'third-way',
        heading: null,
        body: [
          'Most of the decisions a business makes are not new. Approve this loan or don\'t. Route this message to that team. Escalate this alert, close that one. Each has been made hundreds of times before, and the outcome of each is on record. Today those decisions go one of two ways: a person makes them, or an app sends the whole case to a frontier language model and pays for it to reason from scratch, every time, with a different answer on a bad day.',
          {
            html: 'Ada takes a third way. She\'s a <strong>precedent classifier</strong>: you record the decisions you\'ve already made, and she answers a new case from the ones it resembles. She\'s built on hyperdimensional computing, not a transformer. There\'s no training run, a new decision counts the moment it\'s recorded, and the same question always gets the same answer. Every answer comes with the precedents it stands on, and when nothing on record is close enough, she says so instead of guessing.',
          },
          'Ada also works well in front of a language model. She decides the cases she\'s sure of and hands the rest over, so the model sees a fifth of the traffic and every hand-off becomes a precedent for next time.',
          {
            html: 'We think the claims below are strong, so here are the receipts. Every result is published, with each contestant\'s answers, in <a href="https://github.com/glyphh-ai/glyphh/tree/main/benchmarks">our benchmarks</a>, and each one below has its caveats under it.',
          },
          {
            wide: true,
            html:
              '<div class="bl-stats">' +
              '<div class="bl-stat"><b>97.5%</b><span>of bank messages routed right, with Ada in front of Claude Fable</span><small>Fable alone: 96.5%</small></div>' +
              '<div class="bl-stat"><b>$0.22</b><span>for those 200 messages, against $300 for Fable alone</span><small>at list prices</small></div>' +
              '<div class="bl-stat"><b>100</b><span>the bank\'s cost on 200 loans, lowest on the table</span><small>LLM: 110 and 114</small></div>' +
              '<div class="bl-stat"><b>0 / 200</b><span>answers changed on a rerun. Two LLM runs disagreed on 12.</span><small>deterministic</small></div>' +
              '</div>',
          },
        ],
      },
      {
        id: 'different-kind',
        heading: 'A different kind of model',
        body: [
          'A language model is optimized to continue text. Ada is optimized to repeat a decision the way your own history made it. That one difference changes almost everything else.',
          {
            wide: true,
            html:
              '<div class="bl-table"><table><thead><tr><th></th><th>Frontier LLM</th><th>Ada</th></tr></thead><tbody>' +
              '<tr><th>Learns from</th><td class="dim">Pretraining, plus examples pasted into every prompt</td><td>Your own decisions, recorded once. A new one counts the moment it\'s recorded.</td></tr>' +
              '<tr><th>Inputs</th><td class="dim">Tokens</td><td>Your cases as they are: categories, numbers, text</td></tr>' +
              '<tr><th>Outputs</th><td class="dim">Text, parsed back into a decision</td><td>A decision, a calibrated confidence, and the precedents it stands on</td></tr>' +
              '<tr><th>Same input, same answer?</th><td class="dim">Usually</td><td>Always</td></tr>' +
              '<tr><th>When it doesn\'t know</th><td class="dim">Answers anyway</td><td>Says so, and hands the case to a person or a model</td></tr>' +
              '<tr><th>Cost per decision</th><td class="dim">$0.004–$1.50, depending on how many examples ride along</td><td>About $0.00000003</td></tr>' +
              '<tr><th>Speed</th><td class="dim">0.5–3 s</td><td>About 6 ms</td></tr>' +
              '<tr><th>Explains itself</th><td class="dim">In prose, after the fact</td><td>Which precedents, which fields matched, and how much each counted</td></tr>' +
              '<tr><th>Good for</th><td class="dim">Open-ended work, new problems, writing</td><td>Repeated decisions with a track record</td></tr>' +
              '</tbody></table></div>',
          },
        ],
      },
      {
        id: 'banking77',
        heading: 'Benchmark one, routing bank messages',
        body: [
          'Banking77 (PolyAI) is 13,083 real messages from a bank\'s customers, each labelled with one of 77 intents: card arrival, lost or stolen card, exchange rate, top-up failed and so on. They\'re short, informal and often ambiguous between neighbouring intents. It\'s free text, which is where a developer reaches for a language model today.',
          'Every system learned from the same 10,003 messages and was scored on the same 200 held-out ones, each routed as its own call, the way a chatbot makes them. The Claude models read the training file and routed by judgement. Nothing was tuned on the 200.',
          {
            wide: true,
            html: pairs('Each model alone, and with Ada in front', 'Share of 200 held-out messages routed to the right intent. With Ada in front, the model sees only the 22% she isn\'t sure of.', [
              ['Claude Fable 5.1', 97.5, 96.5, 'ada'],
              ['Claude Opus 5.5', 97.0, 96.0, 'ada'],
              ['Claude Sonnet 5.5', 94.0, 86.0, 'ada'],
              ['Claude Haiku 4.5', 91.5, 81.0, 'ada'],
            ], ['with Ada in front', 'model alone'], { fmt: (v) => `${v}%` }),
          },
          {
            html: '<strong>With Ada in front, every model does better than it does alone.</strong> Ada keeps the 156 messages she\'s sure of and gets 98.7% of them right. The other 44 go to the model with Ada\'s three nearest precedents in the prompt, instead of the whole training file. For the two largest models the pair beats the model alone; for the two smaller ones it adds eight to ten points, because the small model only has to handle the hard fifth. Alone, Ada routes 90.0%.',
          },
          {
            wide: true,
            html:
              '<div class="bl-table"><table><thead><tr><th></th><th class="n">Accuracy</th><th class="n">Cost for the 200</th><th class="n">Per 1,000 messages</th></tr></thead><tbody>' +
              '<tr><th>Claude Fable 5.1 alone</th><td class="n">96.5%</td><td class="n">$300</td><td class="n">$1,500</td></tr>' +
              '<tr class="ada"><th>Ada, then Fable for 22%</th><td class="n">97.5%</td><td class="n">$0.22</td><td class="n">$1.10</td></tr>' +
              '<tr><th>Claude Opus 5.5 alone</th><td class="n">96.0%</td><td class="n">$120</td><td class="n">$600</td></tr>' +
              '<tr class="ada"><th>Ada, then Opus for 22%</th><td class="n">97.0%</td><td class="n">$0.09</td><td class="n">$0.44</td></tr>' +
              '<tr class="ada"><th>Ada alone</th><td class="n">90.0%</td><td class="n">$0.000006</td><td class="n">$0.00003</td></tr>' +
              '</tbody></table></div>',
          },
          'A thousand times cheaper and more accurate than the best model alone. And because every hand-off is recorded, the model\'s share keeps falling.',
          {
            wide: true,
            html:
              '<aside class="bl-caveat"><span class="qs-kicker">Caveats</span><ul>' +
              '<li>200 messages means a point or two of noise either way. Alone, Ada is six points under the best LLM.</li>' +
              '<li>The sample was reissued once. The first round\'s ids leaked the label (the test file is sorted by intent), so every judge was rerun on shuffled, opaque ids. Both rounds are published.</li>' +
              '<li>Costs are at list prices, with each message its own call and the examples sent each time, as a chatbot does it. Batched, the LLM is cheaper per message.</li>' +
              '</ul></aside>',
          },
        ],
      },
      {
        id: 'credit',
        heading: 'Benchmark two, credit decisions',
        body: [
          'German Credit (UCI Statlog) is 1,000 real loan applications with 20 fields each and the bank\'s actual outcome. Every contestant learned from the same 800 and was scored on the same 200 held out. In this dataset\'s own cost matrix, approving a loan that goes bad costs five times as much as refusing a good one, so the number a bank cares about is the cost, not the accuracy.',
          {
            wide: true,
            html: bars('The bank\'s cost on 200 held-out loans', '5 per bad loan approved, plus 1 per good loan refused. Lower is better.', [
              ['Ada, calibrated', 100, 'ada'],
              ['LLM, run 1', 110],
              ['LLM, run 2', 114],
              ['Jev, all 800', 118],
              ['Jev, 300', 123],
              ['Ada, first run, untuned', 210, 'ada'],
              ['Always approve', 325, 'base'],
            ], { max: 350, ticks: [0, 100, 200, 300] }),
          },
          {
            html: '<strong>Ada costs the bank the least: 100, against 110 and 114 for two runs of Claude Fable, and 118 at best for TypeSafe\'s Jev.</strong> Every setting was chosen on the 800 before the 200 were opened. Ada gets there by refusing more: 70.0% of her decisions match the bank\'s, against 77–79% for the LLM, because a refused good loan is the cheap mistake.',
          },
          {
            wide: true,
            html:
              '<div class="bl-table"><table><thead><tr><th></th><th class="n">Accuracy</th><th class="n">Bank\'s cost</th><th class="n">Same answer twice?</th></tr></thead><tbody>' +
              '<tr><th>Always approve</th><td class="n">67.5%</td><td class="n">325</td><td class="n">—</td></tr>' +
              '<tr><th>Claude Fable 5.1, two runs</th><td class="n">77.0% / 79.0%</td><td class="n">110 / 114</td><td class="n">188 of 200</td></tr>' +
              '<tr><th>Jev, 300 / all 800 precedents</th><td class="n">71.0% / 70.5%</td><td class="n">123 / 118 cost-aware</td><td class="n">not tested</td></tr>' +
              '<tr class="ada"><th>Ada, plain vote</th><td class="n">78.5%</td><td class="n">171</td><td class="n">yes</td></tr>' +
              '<tr class="ada"><th>Ada, calibrated</th><td class="n">70.0%</td><td class="n">100</td><td class="n">yes</td></tr>' +
              '<tr class="ada"><th>Ada, asking a person when every answer is dear</th><td class="n">81.1% of 111</td><td class="n">45 on those</td><td class="n">yes</td></tr>' +
              '</tbody></table></div>',
          },
          'The last row is the dial again. Priced so that asking a person costs half a refused good loan, Ada decides 111 of the 200 herself at a cost of 45 and sends the other 89 to a person.',
        ],
      },
      {
        id: 'speed-and-cost',
        heading: 'Speed and cost',
        body: [
          'Here\'s what each credit decision takes. The LLM and Jev keep nothing between calls, so the precedents are paid for on every request. Ada pays for them once, when they\'re recorded.',
          {
            wide: true,
            html: scatter('Cost and time per decision', 'Both axes are logarithmic. Bars are ranges: the LLM\'s price is bracketed by two public rates.', [
              ['Ada', 0.005, 0.005, 2.6e-8, 2.6e-8, 'ada', 'right'],
              ['Jev, no precedents', 0.21, 0.21, 3.5e-5, 3.5e-5, null, 'right'],
              ['Jev, 300 precedents', 0.47, 0.47, 1.25e-3, 1.25e-3, null, 'left'],
              ['Jev, all 800', 1.03, 1.03, 3.25e-3, 3.25e-3, null, 'right'],
              ['LLM, batched', 0.7, 0.7, 0.004, 0.012, null, 'left'],
              ['LLM, as apps call it', 1, 3, 0.5, 1.5, null, 'left'],
            ],
            { min: 0.001, max: 10, title: 'time per decision', ticks: [[0.001, '1 ms'], [0.01, '10 ms'], [0.1, '100 ms'], [1, '1 s'], [10, '10 s']] },
            { min: 1e-9, max: 10, title: 'cost per decision', ticks: [[1e-9, '$1e-9'], [1e-7, '$1e-7'], [1e-5, '$1e-5'], [1e-3, '$0.001'], [1e-1, '$0.10'], [10, '$10']] }),
          },
          'At roughly $0.00000003 and a few milliseconds a decision, Ada is about five orders of magnitude cheaper than a batched LLM call and 100 to 600 times faster.',
        ],
      },
      {
        id: 'typesafe-yardstick',
        heading: 'On TypeSafe\'s own yardstick',
        body: [
          'TypeSafe\'s published workflow evals have no ground truth. They score a contestant by agreement with the average of two frontier models. We built that reference for the 200 loans (Claude Fable 5.1 and Claude Opus 5.5, averaged) and scored the first-run contestants against it as well as against what really happened.',
          {
            wide: true,
            html:
              '<div class="bl-table"><table><thead><tr><th>Contestant</th><th class="n">vs real outcomes</th><th class="n">vs model consensus</th></tr></thead><tbody>' +
              '<tr class="ada"><th>Ada, first run</th><td class="n">77.0%</td><td class="n">88.5%</td></tr>' +
              '<tr><th>Jev, all 800 precedents</th><td class="n">70.5%</td><td class="n">79.0%</td></tr>' +
              '<tr><th>LLM, run 2</th><td class="n">79.0%</td><td class="n">78.5%</td></tr>' +
              '<tr><th>LLM, run 1</th><td class="n">77.0%</td><td class="n">74.5%</td></tr>' +
              '<tr><th>Jev, 300 precedents</th><td class="n">71.0%</td><td class="n">72.5%</td></tr>' +
              '<tr><th>Jev, no precedents</th><td class="n">49.5%</td><td class="n">44.0%</td></tr>' +
              '</tbody></table></div>',
          },
          'On TypeSafe\'s measure Ada leads Jev by 9.5 points. But the consensus itself matches the real outcomes only 74.5% of the time, and it calls 28 loans bad where 65 were. Agreement with other models measures how model-like a contestant is. We\'d rather be scored on what happened.',
          {
            wide: true,
            html:
              '<aside class="bl-caveat"><span class="qs-kicker">Caveats</span><ul>' +
              '<li>200 held-out loans means roughly ±6 points of noise on each accuracy, so read the ranking, not the third digit. Cross-validated accuracy inside the 800 was 71.8%, so this hold-out runs a little easy for everyone.</li>' +
              '<li>The LLM\'s per-token price is bracketed by two public rates. Neither LLM run read all 800 cases (430 and about 140).</li>' +
              '<li>German Credit is a small, well-known dataset that frontier models may have seen in training. One reference model said it leaned on that.</li>' +
              '</ul></aside>',
          },
        ],
      },
      {
        id: 'kubernetes',
        heading: 'Benchmark three, routing Kubernetes issues',
        body: [
          {
            html: 'We built an Ada memory from a year of <code>kubernetes/kubernetes</code> issues (1,527 to learn from) and asked her about 104 issues opened after the cutoff. The question: which SIG (special interest group) should own each one? We stripped every line where the reporter named a SIG, so she had to route from what the issue says: its template, the components it mentions, and the code paths it cites.',
          },
          {
            wide: true,
            html: pairs('Routing 104 held-out Kubernetes issues', 'Share routed to the right SIG on the first guess, and within three guesses.', [
              ['Most common SIG, always', 35, 62],
              ['Ada, untuned', 61, 79, 'ada'],
              ['Ada, tuned', 66, 86, 'ada'],
              ['Ada, tuned, calibrated', 66, 89, 'ada'],
            ], ['top 1', 'top 3']),
          },
          {
            html: 'Tuned on a validation slice, Ada routed <strong>66%</strong> right on the first try and <strong>86–89%</strong> within three, against 35% and 62% for always guessing the most common SIG. What makes this usable is that her confidence means something.',
          },
          {
            wide: true,
            html: pairs('When Ada is confident, she\'s right', 'For each confidence bar: the share of issues that cleared it, and how many of those she routed correctly.', [
              ['confidence ≥ 0.5', 86, 54, 'ada'],
              ['confidence ≥ 0.7', 94, 32, 'ada'],
              ['confidence ≥ 0.9', 100, 11, 'ada'],
            ], ['of those, right', 'share of issues answered']),
          },
          'Above 0.7 confidence she answered a third of all issues and got 94% of them right. Above 0.9, 100%. Let Ada take the cases she\'s sure of, and send the rest to a person.',
        ],
      },
      {
        id: 'finding-the-fix',
        heading: 'Finding the fix',
        body: [
          'Because every answer cites its precedents, Ada can do more than classify. For 56 held-out issues whose fix is known, we checked whether any of her three nearest solved precedents had been fixed in a directory the real fix also touched.',
          {
            wide: true,
            html: bars('Do the nearest precedents point at the code that fixed it?', 'Hit rate on 56 held-out issues with a known fix.', [
              ['Ada, 3 nearest precedents', 77, 'ada'],
              ['3 most-fixed directories', 34],
              ['3 random precedents', 23, 'base'],
            ], { max: 100, ticks: [0, 25, 50, 75, 100], tickFmt: (t) => `${t}%`, fmt: (v) => `${v}%` }),
          },
          '77% of the time, the cited precedent pointed at the right part of the codebase. Here\'s the start of one answer:',
          {
            html: '<pre><code>#141993 Memory Manager accepts an incomplete pod-level checkpoint\n        as a restored allocation after kubelet restart\n  -&gt; sig/node via #141069 Memory Manager pod-scope restore\n     compares container blocks…\n     fixed by PR 141070 in pkg/kubelet</code></pre>',
          },
          'That\'s the explanation: which earlier issue, and where it was fixed. No prose to trust or doubt.',
          {
            wide: true,
            html:
              '<aside class="bl-caveat"><span class="qs-kicker">Caveats</span><ul>' +
              '<li>104 test cases means about ±9 points on each percentage.</li>' +
              '<li>The issue fields come from a simple keyword extractor. A better one would likely move every number here.</li>' +
              '<li>Fix directories are coarse: <code>pkg/kubelet</code> is a big target.</li>' +
              '</ul></aside>',
          },
        ],
      },
      {
        id: 'scale',
        heading: 'Does it scale?',
        body: [
          'A precedent memory is only useful if it can hold your whole history. Ada Cloud records about 7,800 precedents a second, so a million take about two minutes, and answers stay quick as the memory grows.',
          {
            wide: true,
            html: lines('Query time as the memory grows', 'p50 in milliseconds, both axes logarithmic. Comparing a query against every precedent, against Ada Cloud.', [
              ['every precedent: 12.9 s', [[5000, 280.1], [20000, 3039.3], [50000, 12909.7]]],
              ['Ada Cloud: 170 ms', [[5000, 53.6], [20000, 65.2], [50000, 142.8], [100000, 149.1], [1000000, 170.2]], 'ada'],
            ],
            { min: 3000, max: 1300000, title: 'precedents in memory', ticks: [[5000, '5k'], [20000, '20k'], [50000, '50k'], [100000, '100k'], [1000000, '1M']] },
            { min: 10, max: 20000, ticks: [[10, '10 ms'], [100, '100 ms'], [1000, '1 s'], [10000, '10 s']] }),
          },
          {
            html: 'Comparing against every precedent grows with the memory: 280 ms at 5,000, 12.9 s at 50,000. Ada Cloud stays between 54 and 170 ms all the way to a million. On Banking77 it gave the same answer as the exhaustive comparison on every one of 500 test messages, at 39 ms instead of 334. All of it was measured on one 12-CPU machine.',
          },
        ],
      },
      {
        id: 'what-ada-isnt',
        heading: 'What Ada isn\'t',
        body: [
          'Ada doesn\'t write, summarize, plan or chat. She can\'t decide something nobody has decided before; when nothing on record is close enough she says so and hands it back. If your problem is new every time, use a language model. If you\'ve made the same decision a thousand times, you already have what Ada needs.',
        ],
      },
      {
        id: 'next',
        heading: 'What\'s next',
        body: [
          'Ada is in beta today. Next are more public benchmarks, including TypeSafe\'s security-incident workflow end to end, and models that answer every question about a case at once.',
          {
            html:
              '<div class="bl-faq">' +
              '<details><summary>Why name it after Ada Lovelace?</summary><p>She wrote the first published program, for Babbage\'s Analytical Engine, a machine fed by punched cards. She also wrote that the engine "has no pretensions whatever to originate anything." For a decision model, that\'s a feature.</p></details>' +
              '<details><summary>Is there a neural network in it?</summary><p>No. There\'s no transformer, no GPU and no training run.</p></details>' +
              '<details><summary>How does Ada learn something new?</summary><p>You record the case with its outcome, and the next question can use it. There\'s nothing to retrain and nothing to redeploy.</p></details>' +
              '<details><summary>Can I see why it decided something?</summary><p>Every answer lists the precedents it stands on, and which of their fields matched.</p></details>' +
              '<details><summary>Where does my data live?</summary><p>Your models run in Glyphh\'s cloud, isolated per organisation. We never train on your data.</p></details>' +
              '</div>',
          },
          {
            html: '<p class="ft-close">If you make the same decision a thousand times a day, I\'d like to hear what it is.</p>',
          },
          'Build with AI. Run without it.',
          '— Timme',
        ],
      },
    ],
  },
  {
    slug: 'ada-in-your-code',
    title: 'Ada in Your Code — Tickets Routed, Churn Called',
    summary: 'The Ada SDKs are out for TypeScript and Python. Instead of telling you what Ada is for the hundredth time, Timme shows you two things he built with them this week: a helpdesk that routes its own tickets, and a churn call that shows its work.',
    date: '2026-10-02',
    author: 'Chris "Timme"',
    minutes: 6,
    cover: '/blog/ada-sdk-hero.png',
    coverAlt: 'Ask a model. Get a reason. Two answers from Ada: a ticket routed to platform, and an account called as churned.',
    tags: ['Ada', 'SDK', 'Guides'],
    related: [
      ['The Ada skill', 'https://docs.glyphh.ai/ada-skill'],
      ['The SDKs', 'https://docs.glyphh.ai/sdks'],
      ['Ada', '/'],
    ],
    sections: [
      {
        id: 'hi',
        heading: null,
        body: [
          'Hi everyone, Chris here. Today we\'re shipping the Ada SDKs, one for TypeScript and one for Python, and instead of telling you what Ada is for the hundredth time I\'m going to show you two things I built with them this week. Both are in the docs as step by step guides and both were run for real, every number you see below came back from the server, not from my imagination.',
          {
            html: '<pre><code>npm install @glyphh-ai/glyphh\npip install glyphh</code></pre>',
          },
          'Quick recap if you\'re new here. Glyphh\'s whole idea is use AI to build the thing, not to run it. Ada is the piece that makes that work when the thing has to reason. You (or your agent) build a model from your own records, and then your software calls it. No LLM in the middle, no tokens, no latency lottery, same answer every single time, and every answer tells you what it\'s standing on. That last part is very important to understand, and it\'s the part the examples are really about.',
        ],
      },
      {
        id: 'tickets',
        heading: 'Example one, a helpdesk that routes its own tickets',
        body: [
          'Every support org I have ever been in has the same problem. Tickets come in, somebody has to look at them and figure out which team owns them, and that somebody is usually the most senior person on the floor because they\'re the only one who knows. Hold that thought.',
          'I took 96 resolved tickets, which is nothing, you have thousands. I told Ada what a ticket is, a product, a component, a severity from 1 to 5, a plan, and a one line summary, every field with a type. Then I recorded each ticket with the team that actually fixed it. That\'s the whole setup. There is no training run, there\'s no fine tuning, there\'s no prompt. A record counts from the next question.',
          'Then I asked about a new one:',
          {
            html: '<pre><code>answer = model.query(ticket("api", "webhooks", 4, "pro", "webhook delivery fails with a 500"))\n\n{ "act": true, "top": "platform", "confidence": 1.0, "count": 16 }</code></pre>',
          },
          {
            html: '<code>act</code> is the only thing your code looks at. True, route it to platform, 16 tickets like it say so. Cool, sounds great. Here\'s the part I actually care about though. A ticket came in about SSO, and no ticket in the history had ever mentioned SSO:',
          },
          {
            html: '<pre><code>{ "act": false, "reason": "unseen", "top": "platform", "unseen": ["ticket.issue.component=sso"] }</code></pre>',
          },
          'Ada says no, I\'m not going to act on this, here is my nearest guess, and here is exactly what I\'ve never seen before. That ticket goes to a person. The person routes it to the identity team, I record that, and after three of those Ada routes SSO tickets on its own. The senior person on the floor just got their afternoon back, and nothing was guessed in the process.',
          'Same thing the other direction. A team bounces a ticket back? Record the failure. Ada stops making that call for that kind of ticket until a newer success says otherwise. Your helpdesk gets smarter because your business kept happening, not because somebody retrained something.',
          'And when the manager asks why did this go to platform, you don\'t shrug:',
          {
            html: '<img src="/blog/ada-sdk-facts.png" alt="The fact tree for a routed ticket: component, plan and product the same, severity near at 0.75, summary a partial match at 0.4486." loading="lazy" />',
          },
          'That is the nearest ticket on record, field by field. Same component, same plan, same product, severity one step off, summary about half the same words. Every one of those numbers is arithmetic on two values. It is not an opinion and it does not change tomorrow.',
        ],
      },
      {
        id: 'churn',
        heading: 'Example two, a churn call that shows its work',
        body: [
          'This one is for the folks who have sat in a renewal meeting looking at a dashboard that says "health score 62" with no idea where the 62 came from. I have been that guy. Here\'s the Ada version.',
          'Sixty past accounts, three monthly snapshots each, seats, logins per seat, open tickets, features used, and how the term ended, renewed or churned. In Ada a record with the same account id is a new version of that account, so the model keeps the whole slide, not just the last photo. Then you ask about a live account, as it is today, no id:',
          {
            html: '<pre><code>const a = await model.query(snapshot(account));\n\n{ "act": true, "top": "churned", "confidence": 0.9443, "count": 47,\n  "outcomes": { "churned": 0.9443, "renewed": 0.0557 } }</code></pre>',
          },
          '94% of the vote of 47 past accounts says churned. Which ones? Ask:',
          {
            html: '<pre><code>FIND SIMILAR TO $account WHERE outcome = $outcome LIMIT 3\n\n[ { "account": "acct-03", "score": 0.8889 },\n  { "account": "acct-06", "score": 0.7861 },\n  { "account": "acct-12", "score": 0.7694 } ]</code></pre>',
          },
          'Now your success manager has three names, not a score. And because every version was kept, you can pull up acct-03 and watch exactly how it went:',
          {
            html: '<img src="/blog/ada-sdk-churn.png" alt="Account acct-03 over three months: logins per seat fall from 6 to 2 while open tickets rise from 3 to 7. Risk: high, 94% of the vote of 47 past accounts." loading="lazy" />',
          },
          {
            html: 'Logins down, tickets up, drift measured, slope per day on every number. That\'s one GQL statement, Ada\'s query language, and it\'s the same statement whether you run it from TypeScript, Python, or an agent over MCP. Throw an account at it from an industry it has never seen and you get <code>unknown</code> with the reason, not a confident number pulled out of the air. I cannot stress enough how much I prefer that to the health score.',
          },
        ],
      },
      {
        id: 'the-loop',
        heading: 'Notice it\'s the same loop both times',
        body: [
          {
            html: '<ol><li>Say what the thing is. Every field gets a type, and anything that doesn\'t fit gets refused before it\'s stored.</li><li>Record what happened.</li><li>Ask, and branch on <code>act</code>.</li><li>When Ada won\'t act, hand it to a person with the reason.</li><li>Record what the person decided.</li></ol>',
          },
          'That loop is the product. It\'s how software should use AI in my opinion, the agent builds the model at build time where frontier models are genuinely great, and at runtime it\'s just math on your data with a receipt. I\'ve spent almost 30 years building the data, logic and UI parts of software, and this is the first time the reasoning part has felt like software too, dependable, same answer every time, and explainable to the person who has to sign off on it.',
        ],
      },
      {
        id: 'go',
        heading: 'Go build something',
        body: [
          {
            html: 'Both guides are in the docs with every line of code and every output: <a href="https://docs.glyphh.ai/sdks">route support tickets</a> in Python and <a href="https://docs.glyphh.ai/sdks">customer churn</a> in TypeScript. The SDKs are in <a href="https://github.com/glyphh-ai/glyphh">github.com/glyphh-ai/glyphh</a>. Grab a key from the console, run one, then point it at your own data and tell me what it found. I read every one of those emails.',
          },
          'Build with AI. Run without it.',
          '— Timme',
        ],
      },
    ],

  },
  {
    slug: 'the-critical-inversion',
    title: 'The Critical Inversion — Big AI vs. Open Weights',
    summary: 'The five promises of AI are all margin plays. Does the math math? Timme runs the numbers, and makes the case for vendor-neutral tooling and a heavy helping of open weights.',
    date: '2026-09-22',
    author: 'Chris "Timme"',
    minutes: 5,
    cover: '/blog/critical-inversion-hero.png',
    coverAlt: 'One massive Big AI cube against a field of small open-weight cubes, routed by Glyphh: frontier where it counts, open weights for the rest.',
    tags: ['Strategy', 'Open Weights'],
    related: [
      ['Ada', '/'],
    ],
    sections: [
      {
        id: 'hold-that-thought',
        heading: null,
        body: [
          'Take a step back and consider the message being pushed onto the world: Big AI is responsible, is reliable, and is morally on the side of good. Cool, sounds great. But I have heard this before, and what are you really selling me on? Hold that thought…',
        ],
      },
      {
        id: 'five-promises',
        heading: 'The five promises of AI',
        body: [
          'The five promises of AI are all margin plays. Does the math math? I am not so sure. Let me explain:',
          { html: '<ol><li>Because I am increasing my spend in frontier AI, I can continue to grow my business and keep my headcount flat.</li><li>Because I am increasing my spend in AI, I can reduce my costs — people and software — and maintain my current state.</li><li>Because I am increasing my spend in AI, I can increase my revenue by (a) selling more and (b) reaching net-new customers, without (c) increasing headcount in sales.</li><li>Because I am increasing my spend with AI, I can reduce my risk by having more security insight and intelligence.</li><li>Because I am increasing my spend in AI, I can produce more features, ship more code, and fix more holes and defects without increasing headcount.</li></ol>' },
          'All of these have to overcome (a) the amount of the increased AI spend, (b) the increased risk introduced by the increased AI usage, and (c) the increased headcount required to deploy, manage, and govern the net-new AI in the org.',
        ],
      },
      {
        id: 'the-math',
        heading: 'Does the math math?',
        body: [
          'An example: take a 2,500-person org running Anthropic at list prices. Seats alone at $100 per person per month are $3 million a year, and usage on top of that takes the spend to $7 million without much effort. Now add the headcount uplift: roughly 20 more people across security, enterprise AI, data science, and business transformation to handle the enablement, the training, the risk-mitigation software, the governance software — the people, the process, and so on. Fully loaded, the total AI spend is closer to $10–11 million. Can the org cut or outgrow that delta materially in the same window as the burn? Does sending AI emails, building fancier decks, and getting half-baked agentic solutions equate to more revenue? No. This math does not math.',
        ],
      },
      {
        id: 'what-does',
        heading: 'So what does?',
        body: [
          'Using AI responsibly to improve efficiency: very little frontier AI and a heavy helping of open-weight models, blended by semantic routing. The question becomes: what tooling does your user base adopt? Claude, OpenAI, Gemini, Cursor, Copilot… Glyphh?',
        ],
      },
      {
        id: 'why-pick-a-vendor',
        heading: 'Why pick a vendor?',
        body: [
          'You don\'t want to be constantly changing interfaces; the user population can\'t sustain the pace at which change is already coming. So pick something vendor-neutral. Something that maximizes your spend and fits nicely into a strategy that lets you pivot to new tech without changing harnesses or getting stuck with a massive, unpredictable AI bill.',
        ],
      },
      {
        id: 'what-is-big-ai-selling',
        heading: 'So what is Big AI selling?',
        body: [
          'Remember that thought I asked you to hold? They have a lot to sell you, actually, and most of it is good. But the bigger picture here, I fear, isn\'t for the good of all mankind — it\'s good for those who invested billions. The point is that we will eventually race to the bottom on LLM rate cards, and the models will become just like infra, or even — oddly — TVs. Yes, televisions. They will slow-roll, increase, and charge premiums for as long as possible. The tell is on the table: the same funding motion behind Big AI is funding the GPU-farm data centers.',
          'Why is this a concern? I\'m not sure that it is, but it is interesting. It is very clear to me — and I am not alone — that the industry is finding open-weight and fine-tuned models outperform frontier models in many ways. So your self-hosted models need to run somewhere, and no matter what we do, in the end, the hyperscalers of AI sustain the curve. The NVIDIA move is the most interesting one: I have a Spark on my desk, the best model I own, and it\'s free to use every single day… it runs Glyphh 🙂',
          'This is going to sound anti-AI, but it isn\'t: do more with AI, and for your business, by reducing AI usage at runtime. Only use it when you have absolutely no choice — which, in reality, should be seldom.',
          'Put the human back in intelligence.',
          '— Timme',
        ],
      },
    ],
  },
];

export const postBySlug = (slug) => POSTS.find((p) => p.slug === slug);

export const fmtDate = (iso) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
