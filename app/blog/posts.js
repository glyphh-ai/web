/**
 * The blog's posts — the store behind /blog, /blog/[slug], and the home
 * page's Latest section. Newest first. A post's `sections` carry an id, a
 * heading, and the paragraphs under it; the article page builds "On this
 * page" from them. Copy is his; spelling and grammar cleaned, voice left alone.
 */

export const POSTS = [
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
