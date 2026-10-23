/**
 * The blog's posts — the store behind /blog, /blog/[slug], and the home
 * page's Latest section. Newest first. A post's `sections` carry an id, a
 * heading, and the paragraphs under it; the article page builds "On this
 * page" from them. Copy is his; spelling and grammar cleaned, voice left alone.
 */

import { bars, pairs, scatter, lines, glyphCard } from './charts';

export const POSTS = [
  {
    slug: 'introducing-ada',
    layout: 'feature',
    kicker: 'Launch · Ada beta',
    title: 'Introducing Ada',
    titleHtml: 'Introducing <em>Ada</em>',
    summary: 'A decision model that learns from your precedents in one write, answers in milliseconds, cites the cases behind every answer, and runs without a transformer.',
    date: '2026-10-23',
    author: 'Chris "Timme"',
    minutes: 9,
    cover: '/blog/introducing-ada-hero.png',
    coverAlt: 'A loan application as Ada sees it: 4,096 values of plus or minus one, drawn as a punched card.',
    // The cover carries the title for the index and the home page; the article itself shows the bare glyph.
    heroHtml: glyphCard('oehfkznxYr4RqVsWS9+QG+wCH7Zwn0HralcuYMe2WtQJPPfNc5xivFmouDI2auzCq/C/3Ct++e+jJww/BecXu7+Dm5k7OAHJUjHoZaIFjGEHmrSR3fGowMj6agVxD7dqUAJ8zmhAnqNy0yWa0c5oY8lVMCquTxcRmkhAsSUiceWaCo21ntrI9A6Gbhps0/RpHwS8ZDIrOU5y8C99+UpHwxJKD1PGqJLw8ipFeA7yKa74W39ijqrNkA4bZQZ8+CImatOaCqT3i/828zVg6kj3C8o7DXPY2EOcDs4PypbdFwCnXoWy609y2IHEExtNIkX4JlzepvK3GpzJBHFy/Pr0ad8hG4EOx5MEtuluPm1vRgVxtIizJow76PIhhAIGRvmKtwR4mdYnpmt5OSYYEMvWDxPxidORSogrtLVDyT61Ynw01yXCRIvaVLhIZXebbn8H+jO67DRMFtwO9pllKHrNgjBN8hB4SQKFRXAOjCzPPS7QwMwMIiLoUloeuZFNuAJv7MTHjAGIYs38xOC5XG+Pk5zwa5TnP9Oq4L5Rs8TswltKQ0ru81wOS28U1bVyV/oKcNoPPVZm5945WUSzXEZy2SRMzxAy1Ry37t3och6qvCsyIViQxodGpmhy8N+Wquv//IvfI8WzljKkADDvvWHd2ZWkhhOYj4metVXNnKHLeIQ=', 128, 'A loan application as Ada sees it: 4,096 values of plus or minus one, drawn as a punched card.'),
    coverCaption: 'A loan application as Ada sees it (checking 0–200 DM, 24 months, used car, 4,870 DM, age 35, and four more fields): the 4,096 ±1 values of its glyph, drawn as a punched card. Same input, same card, on any machine.',
    tags: ['Ada', 'Research', 'Benchmarks'],
    related: [
      ['Ada', '/'],
      ['The SDKs', 'https://docs.glyphh.ai/sdks'],
      ['The Ada skill', 'https://docs.glyphh.ai/ada-skill'],
    ],
    sections: [
      {
        id: 'third-way',
        heading: null,
        body: [
          'Most of the decisions a business makes are not new. Approve this loan or don\'t. Route this ticket to that team. Escalate this alert, close that one. Each has been made hundreds of times before, and the outcome of each is on record. Today those decisions go one of two ways: a person makes them, or an app sends the whole case to a frontier language model and pays for it to reason from scratch, every time, with a different answer on a bad day.',
          {
            html: 'Ada takes a third way. She\'s named after Ada Lovelace, who wrote the first program for a machine that ran on punched cards. Ada is a <strong>precedent classifier</strong>. You record past cases with their outcomes, and she encodes each one as a <em class="bl-serif">glyph</em>: a 4,096-dimensional vector built with hyperdimensional computing (HDC), where roles are bound to their values and the parts are bundled into one card. A new case is answered by the precedents it resembles, weighted by how closely and on which attributes. There is no transformer, no gradient descent and no GPU. The kernel is one Python file whose only dependency is numpy.',
          },
          'Text fields are read through a lexicon instead of a language model. Ada ships with WordNet (77,817 words, each with its synonyms and near neighbours) and the Moby part-of-speech list (192,960 word forms). A word\'s glyph leans toward its neighbourhood, so "stolen" lands near "taken" and "arrive" near "come". Meaning arrives by multi-hop lookups through that lexicon. Nothing is sampled.',
          'We think the claims below are strong, so here are the receipts: three benchmarks, every contestant\'s answers on file, and a caveat note under each result.',
          {
            wide: true,
            html:
              '<div class="bl-stats">' +
              '<div class="bl-stat"><b>77%</b><span>held-out credit decisions right, level with a frontier LLM (77–79%)</span><small>German Credit, 200 held out</small></div>' +
              '<div class="bl-stat"><b>5 ms</b><span>per decision on a $0.019/hour shared CPU</span><small>LLM calls: 0.5–3 s</small></div>' +
              '<div class="bl-stat"><b>0 / 200</b><span>answers changed on a rerun. Two LLM runs disagreed on 12.</span><small>deterministic by construction</small></div>' +
              '<div class="bl-stat"><b>0.4 s</b><span>to learn 800 precedents, with no training run</span><small>one write each</small></div>' +
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
              '<tr><th>Learns from</th><td class="dim">Pretraining, plus examples pasted into every prompt</td><td>Your precedents, recorded once. A new case counts the moment it\'s recorded.</td></tr>' +
              '<tr><th>Inputs</th><td class="dim">Tokens</td><td>Typed fields: categories, numbers, text, nested records</td></tr>' +
              '<tr><th>Outputs</th><td class="dim">Text, parsed back into a decision</td><td>An outcome, a calibrated probability, and the precedents it stands on</td></tr>' +
              '<tr><th>Same input, same answer?</th><td class="dim">Usually</td><td>Always. Every glyph is a pure function of its input.</td></tr>' +
              '<tr><th>When it doesn\'t know</th><td class="dim">Answers anyway</td><td>Says "insufficient" when no precedent clears the similarity bar</td></tr>' +
              '<tr><th>Cost per decision</th><td class="dim">$0.004–$1.50, depending on how many examples ride along</td><td>About $0.00000003</td></tr>' +
              '<tr><th>Speed</th><td class="dim">0.5–3 s</td><td>About 5 ms</td></tr>' +
              '<tr><th>Hardware</th><td class="dim">GPU cluster</td><td>Any CPU, with a SQLite file or Postgres for the memory</td></tr>' +
              '<tr><th>Explains itself</th><td class="dim">In prose, after the fact</td><td>A fact tree: which attributes matched, by how much, and at what weight</td></tr>' +
              '<tr><th>Good for</th><td class="dim">Open-ended work, new problems, writing</td><td>Repeated, structured decisions with a track record</td></tr>' +
              '</tbody></table></div>',
          },
        ],
      },
      {
        id: 'credit',
        heading: 'Benchmark one, credit decisions',
        body: [
          'German Credit (UCI Statlog) is 1,000 real loan applications with 20 typed fields (checking account, credit history, purpose, amount, duration, savings, employment, housing, age and more) and the bank\'s actual outcome. We shuffled once, gave every contestant the same 800 to learn from, and held out the same 200.',
          {
            html: '<ul><li><strong>Ada</strong> recorded the 800 into a spec with hand-set, untuned weights, then queried each of the 200.</li><li><strong>A frontier LLM</strong> (Claude Fable 5.1, medium effort) read the training cases and judged each held-out case. We ran it twice, independently.</li><li><strong>Jev</strong> (TypeSafe\'s System One model, jev-1.13.0) received the precedents in every request: none, 300 (the most that fit its 32k-token limit), or all 800 through its long-context header.</li></ul>',
          },
          {
            wide: true,
            html: bars('Accuracy on 200 held-out loans', 'Higher is better. The dashed line is "always approve" (67.5%).', [
              ['LLM, run 2', 79.0],
              ['LLM, run 1', 77.0],
              ['Ada', 77.0, 'ada'],
              ['Ada, learned weights', 76.5, 'ada'],
              ['Jev, 300 precedents', 71.0],
              ['Jev, all 800', 70.5],
              ['Always approve', 67.5, 'base'],
              ['Jev, no precedents', 49.5],
            ], { max: 100, ticks: [0, 25, 50, 75, 100], tickFmt: (t) => `${t}%`, fmt: (v) => `${v.toFixed(1)}%`, ref: 67.5 }),
          },
          {
            html: '<strong>Ada matches the LLM and leads Jev by six points.</strong> Ada scored 77.0%, the two LLM runs 77.0% and 79.0%, and Jev 71.0% at best. Jev with no precedents was a coin flip (49.5%), and giving it all 800 instead of 300 didn\'t help (70.5%).',
          },
          {
            html: 'Accuracy isn\'t what a bank optimizes, though. In this dataset\'s own cost matrix, approving a loan that goes bad costs five times as much as refusing a good one. Ada learns weights from the 800 (each field\'s information gain), calibrates her vote into a probability with five-fold cross-validation inside the 800, and refuses when <code>P(bad) &gt; 1/6</code>. None of those steps sees the 200.',
          },
          {
            wide: true,
            html: bars('The bank\'s cost on the same 200', '5 per bad loan approved, plus 1 per good loan refused. Lower is better.', [
              ['Ada, calibrated, cost rule', 110, 'ada'],
              ['LLM, run 1', 110],
              ['LLM, run 2', 114],
              ['Jev, all 800, cost-aware', 118],
              ['Jev, 300, cost-aware', 123],
              ['Ada, untuned', 210, 'ada'],
              ['Always approve', 325, 'base'],
            ], { max: 350, ticks: [0, 100, 200, 300] }),
          },
          'Calibrated and cost-aware, Ada\'s cost is 110, level with the best LLM run, with every choice made before the hold-out was opened.',
        ],
      },
      {
        id: 'speed-and-cost',
        heading: 'Speed and cost',
        body: [
          'Here\'s what each decision takes. The LLM and Jev keep nothing between calls, so the precedents are paid for on every request. Ada pays for them once, when they\'re recorded.',
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
          'At roughly $0.00000003 and 5 ms a decision, Ada is about five orders of magnitude cheaper than a batched LLM call and 100 to 600 times faster. Against an LLM as apps actually call it, with the examples resent every time, the gap is wider still.',
        ],
      },
      {
        id: 'typesafe-yardstick',
        heading: 'On TypeSafe\'s own yardstick',
        body: [
          'TypeSafe\'s published workflow evals have no ground truth. They score a contestant by agreement with the average of two frontier models. We built that reference for our 200 (Claude Fable 5.1 and Claude Opus 5.5, averaged) and scored everyone against it as well as against what really happened.',
          {
            wide: true,
            html:
              '<div class="bl-table"><table><thead><tr><th>Contestant</th><th class="n">vs real outcomes</th><th class="n">vs model consensus</th></tr></thead><tbody>' +
              '<tr class="ada"><th>Ada</th><td class="n">77.0%</td><td class="n">88.5%</td></tr>' +
              '<tr><th>Jev, all 800 precedents</th><td class="n">70.5%</td><td class="n">79.0%</td></tr>' +
              '<tr><th>LLM, run 2</th><td class="n">79.0%</td><td class="n">78.5%</td></tr>' +
              '<tr><th>LLM, run 1</th><td class="n">77.0%</td><td class="n">74.5%</td></tr>' +
              '<tr><th>Jev, 300 precedents</th><td class="n">71.0%</td><td class="n">72.5%</td></tr>' +
              '<tr><th>Jev, no precedents</th><td class="n">49.5%</td><td class="n">44.0%</td></tr>' +
              '</tbody></table></div>',
          },
          'On TypeSafe\'s measure Ada leads Jev by 9.5 points. But the consensus itself matches the real outcomes only 74.5% of the time, and it calls 28 loans bad where 65 were. Agreement with other models measures how model-like a contestant is. We\'d rather be scored on what happened.',
          {
            html:
              '<aside class="bl-caveat"><span class="qs-kicker">Caveats</span><ul>' +
              '<li>200 held-out cases means roughly ±6 points of noise on each accuracy, so read the ranking, not the third digit. Cross-validated accuracy inside the 800 was 71.8%, so this hold-out runs a little easy for everyone.</li>' +
              '<li>Ada\'s uncalibrated vote is not a probability. A naive cost threshold on it over-refuses (71 good loans turned away). Calibration fixes that, and it now ships in the kernel.</li>' +
              '<li>The LLM\'s per-token price is bracketed by two public rates because its exact rate wasn\'t to hand. Neither LLM run read all 800 cases (430 and about 140).</li>' +
              '<li>German Credit is a small, well-known dataset that frontier models may have seen in training. One reference model said it leaned on that.</li>' +
              '</ul></aside>',
          },
        ],
      },
      {
        id: 'kubernetes',
        heading: 'Benchmark two, routing Kubernetes issues',
        body: [
          {
            html: 'Credit is tidy. Real work isn\'t. We built an Ada memory from a year of <code>kubernetes/kubernetes</code> issues (1,527 to learn from) and asked her about 104 issues opened after the cutoff. The question: which SIG (special interest group) should own each one? We stripped every line where the reporter named a SIG, so she had to route from what the issue says: its template, the components it mentions, and the code paths it cites.',
          },
          {
            wide: true,
            html: pairs('Routing 104 held-out Kubernetes issues', 'Share routed to the right SIG on the first guess, and within three guesses.', [
              ['Most common SIG, always', 35, 62],
              ['Ada, no weights', 61, 79, 'ada'],
              ['Ada, learned weights', 66, 86, 'ada'],
              ['Ada, calibrated', 66, 89, 'ada'],
            ], ['top 1', 'top 3']),
          },
          {
            html: 'With weights learned on a validation slice, Ada routed <strong>66%</strong> right on the first try and <strong>86–89%</strong> within three, against 35% and 62% for always guessing the most common SIG. What makes this usable is that her confidence means something.',
          },
          {
            wide: true,
            html: pairs('When Ada is confident, she\'s right', 'Calibrated Ada. For each confidence bar: the share of issues that cleared it, and how many of those she routed correctly.', [
              ['confidence ≥ 0.5', 86, 54, 'ada'],
              ['confidence ≥ 0.7', 94, 32, 'ada'],
              ['confidence ≥ 0.9', 100, 11, 'ada'],
            ], ['of those, right', 'share of issues answered']),
          },
          'Above 0.7 confidence she answered a third of all issues and got 94% of them right. Above 0.9, 100%. That gives you an automation dial: let Ada take the cases she\'s sure of and send the rest to a person.',
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
          '77% of the time, the cited precedent pointed at the right part of the codebase. Here\'s the start of one answer, exactly as Ada returns it:',
          {
            html: '<pre><code>#141993 Memory Manager accepts an incomplete pod-level checkpoint\n        as a restored allocation after kubelet restart\n  truth: [\'sig/node\']\n  -&gt; sig/node score 0.657 via #141069 Memory Manager pod-scope restore\n     compares container blocks…\n     fixed by PR 141070 in pkg/kubelet\n       components: score 0.61 x w 4.0  -&gt; 0.47\n       kind:       score 1.00 x w 1.0  -&gt; 0.19\n       title:      score 0.00 x w 0.25 -&gt; 0.00</code></pre>',
          },
          'That\'s the whole explanation: which earlier issue, which attributes matched, at what weight. No prose to trust or doubt.',
          {
            html:
              '<aside class="bl-caveat"><span class="qs-kicker">Caveats</span><ul>' +
              '<li>104 test cases means about ±9 points on each percentage.</li>' +
              '<li>The features come from a simple keyword extractor. A better one would likely move every number here.</li>' +
              '<li>Fix directories are coarse: <code>pkg/kubelet</code> is a big target.</li>' +
              '<li>Learned weights trade some calibration for coverage. Calibrated probability pulls it back, which is why the confidence chart uses it.</li>' +
              '</ul></aside>',
          },
        ],
      },
      {
        id: 'scale',
        heading: 'Benchmark three, does it scale?',
        body: [
          'A precedent memory is only useful if it can hold your whole history. Ada Cloud keeps precedents in Postgres with pgvector. It shortlists candidates with an HNSW index, then scores the shortlist exactly. Recording runs at about 7,800 precedents a second, so a million takes about two minutes. The question is whether the shortlist changes the answers.',
          {
            wide: true,
            html: lines('Query latency as the memory grows', 'p50 in milliseconds, both axes logarithmic. Exact scores every precedent; the shortlist scores the 500 nearest by index.', [
              ['exact: 12.9 s', [[5000, 280.1], [20000, 3039.3], [50000, 12909.7]]],
              ['shortlist: 170 ms', [[5000, 53.6], [20000, 65.2], [50000, 142.8], [100000, 149.1], [1000000, 170.2]], 'ada'],
            ],
            { min: 3000, max: 1300000, title: 'precedents in memory', ticks: [[5000, '5k'], [20000, '20k'], [50000, '50k'], [100000, '100k'], [1000000, '1M']] },
            { min: 10, max: 20000, ticks: [[10, '10 ms'], [100, '100 ms'], [1000, '1 s'], [10000, '10 s']] }),
          },
          {
            html: 'Exact scoring grows with the store: 280 ms at 5,000 precedents, 12.9 s at 50,000. The shortlist stays between 54 and 170 ms all the way to a million. On Banking77 (10,003 real customer-service messages, 77 intents) it gave the same answer as exact scoring on all 500 test queries: <strong>88.8% accuracy either way</strong>, at 39 ms instead of 334.',
          },
          {
            html:
              '<aside class="bl-caveat"><span class="qs-kicker">Caveats</span><ul>' +
              '<li>Run on one Docker host (12 CPUs, 7.6 GB), Postgres 17, pgvector 0.8.7.</li>' +
              '<li>Queries that fill in only some fields are harder for the index. At a million precedents a shortlist of 500 recovers only 20% of the exact top results for them. Shortlisting 1,000 by Hamming distance instead raises that to 81%, at about 0.7 s a query. This is the part we\'re still working on.</li>' +
              '</ul></aside>',
          },
        ],
      },
      {
        id: 'what-ada-isnt',
        heading: 'What Ada isn\'t',
        body: [
          'Ada doesn\'t write, summarize, plan or chat. She can\'t decide something nobody has decided before; when no precedent is close enough she says "insufficient" and hands it back. Similarity voting also has known blind spots. An outcome that depends on a combination of fields, rather than on the fields themselves, is hard for her, and we\'re working on it. If your problem is new every time, use a language model. If you\'ve made the same decision a thousand times, you already have the training data for Ada.',
        ],
      },
      {
        id: 'next',
        heading: 'What\'s next',
        body: [
          'Ada is in beta today. Next on the list are more public benchmarks (including TypeSafe\'s security-incident workflow, end to end), multi-output models that answer every question about a case from one memory, and the partial-query recall work above.',
          {
            html:
              '<div class="bl-faq">' +
              '<details><summary>Why name it after Ada Lovelace?</summary><p>She wrote the first published program, for Babbage\'s Analytical Engine, a machine fed by punched cards. Ada\'s glyphs are punched cards of a sort: fixed-length patterns of on and off, composed by rule. She also wrote that the engine "has no pretensions whatever to originate anything." For a decision model, that\'s a feature.</p></details>' +
              '<details><summary>Is there a neural network anywhere in it?</summary><p>No. Encoding is deterministic hashing into ±1 vectors, composed with bind, bundle and permute. Answers come from similarity over recorded precedents. Weights and calibration are fitted with simple statistics over your precedents (information gain, isotonic and temperature calibration), not backpropagation.</p></details>' +
              '<details><summary>How does Ada learn something new?</summary><p>You record the case with its outcome. That\'s one database write, and the next query can use it. There\'s no retraining step and nothing to redeploy.</p></details>' +
              '<details><summary>What does "lexical multi-hop" mean?</summary><p>A text field is read word by word through the lexicon. Each word\'s glyph is bundled with its synonyms, its near words (hypernyms, hyponyms, related forms) and its parts of speech, so two descriptions that share no words can still match through the words around them.</p></details>' +
              '<details><summary>Can I see why it decided something?</summary><p>Every answer lists the precedents it stands on, with their similarity and outcome, and a fact tree that breaks the match down attribute by attribute.</p></details>' +
              '<details><summary>Where does my data live?</summary><p>In your memory: a SQLite file you own, or your own Postgres. The kernel runs anywhere numpy does.</p></details>' +
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
