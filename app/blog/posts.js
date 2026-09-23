/**
 * The blog's posts — the store behind /blog, /blog/[slug], and the home
 * page's Latest section. Newest first. A post's `sections` carry an id, a
 * heading, and the paragraphs under it; the article page builds "On this
 * page" from them. Copy is his; spelling and grammar cleaned, voice left alone.
 */

export const POSTS = [
  {
    slug: 'the-critical-inversion',
    title: 'The Critical Inversion — Big AI vs. Open Weights',
    summary: 'The five promises of AI are all margin plays. Does the math math? Timme runs the numbers, and makes the case for vendor-neutral tooling and a heavy helping of open weights.',
    date: '2026-09-22',
    author: 'Chris "Timme"',
    minutes: 4,
    cover: '/blog/critical-inversion-hero.png',
    coverAlt: 'One massive Big AI cube against a field of small open-weight cubes, routed by Glyphh: frontier where it counts, open weights for the rest.',
    tags: ['Strategy', 'Open Weights', 'The Router'],
    related: [
      ['The Router', '/docs/router'],
      ['Every model', '/integrations/models'],
      ['Welcome to Glyphh AI', '/blog/welcome-to-glyphh-ai'],
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
          'An example: my IT org is 50 people and my AI spend with Anthropic is $7 million. I need X more people to manage all the enablement, the training, the risk-mitigation software, the governance software — the people, the process, and so on — so my total AI spend is closer to $10–11 million. Can we cut or outgrow that delta materially in the same window as the burn? Does sending AI emails, building fancier decks, and getting half-baked agentic solutions equate to more revenue? No. This math does not math.',
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
          'This is going to sound anti-AI, but it isn\'t: do more with AI, and for your business, by reducing AI usage at runtime. Only use it when you have absolutely no choice — which, in reality, should be seldom.',
          'Put the human back in intelligence.',
          '— Timme',
        ],
      },
    ],
  },
  {
    slug: 'welcome-to-glyphh-ai',
    title: 'Welcome to Glyphh AI',
    summary: 'Chris, aka Timme, on the official launch of Glyphh AI. The whole idea in one breath: use AI to build the app, not to run it.',
    date: '2026-09-22',
    author: 'Chris "Timme"',
    minutes: 6,
    cover: '/blog/welcome-hero.png',
    coverAlt: 'The Glyphh mascot under a shower of glyph confetti: Glyphh AI is live — build with AI, run without it.',
    tags: ['Launch', 'Architecture', 'Research'],
    related: [
      ['Research', '/research'],
      ['The Router', '/docs/router'],
      ['Semantic Apps', '/docs/semantic-apps'],
      ['Rrotor', '/docs/rrotor'],
    ],
    sections: [
      {
        id: 'hi',
        heading: null,
        body: [
          'Hi everyone, my name is Chris, aka Timme, and this is the official launch of Glyphh AI. Years in the making, a lot of rewrites, a lot of "hey, try this one more time" calls to our beta testers. Thank you to everyone who put up with the endless conversations. We are very proud of what we built.',
          'Here\'s the whole idea in one breath: use AI to build the app, not to run it.',
          'Frontier models are incredible at one thing, iterative generation. For those of us in software that means code gen. They are not good at being the runtime. So Glyphh puts Claude, OpenAI, Gemini, or your open-weight model of choice at build time, where they shine, and then runs what you built deterministically on your data, with no LLM in the middle. You build it on your desktop, you run it on your desktop, you share it with your org, and your peers install it and run it on theirs. Same tool for both.',
          'That\'s it. Everything below is how we got there and why it matters.',
        ],
      },
      {
        id: 'origins',
        heading: 'Where it came from',
        body: [
          { html: 'Glyphh started as a memory substrate called <a href="https://github.com/glyphh-ai/ada" target="_blank" rel="noopener noreferrer">Ada</a>, named after Ada Lovelace (I did a write-up on her on our <a href="/research">research page</a>; fascinating to think about). Ada is a multi-dimensional HDC lattice, an attempt to harden semantic knowledge beyond RAG. It turned out to be excellent at storing temporal signal. I built <a href="https://github.com/glyphh-ai/adaL" target="_blank" rel="noopener noreferrer">adaL</a> on top of it with a new kind of semantic graph, and then ran into an honest finding: for most workloads, RAG or plain SQL with a big context window is really hard to beat.' },
          { html: 'That\'s research. The finding isn\'t always the thing that moves the needle; the path usually is. The path here gave us <a href="https://github.com/glyphh-ai/rrotor" target="_blank" rel="noopener noreferrer">rrotors</a>, recursive reasoning on top of reasoning, which is the loop the Glyphh runtime executes at build time. More on that in <a href="/docs/rrotor">the docs</a>.' },
          { html: 'Meanwhile my actual day got worse, not better. AI didn\'t simplify anything, it multiplied my context switching 10x, seemingly overnight. Around April my Ctrl+C / Ctrl+V usage hit an all-time high. I had a pile of model loops I was coding with, a pile of app layouts, and no way to combine them into something predictable. The first attempt was <a href="https://github.com/glyphh-ai/code" target="_blank" rel="noopener noreferrer">Glyphh Code</a>. It was missing something I couldn\'t name for a while, and then it hit me: I wanted model selection, routing, and semantic data in one place, producing real applications, not chat transcripts.' },
        ],
      },
      {
        id: 'prompt-ui',
        heading: 'Who said a prompt was a good UI?',
        body: [
          'For the life of me I can\'t figure out who decided that asking for something, getting a random-ish answer, re-asking, paying again, and finding out it was wrong (no refunds) was a good way to interact with software. Is it cool? Very. Is it efficient, practical, or scalable? Not really.',
          'I don\'t think the models are the problem. The model is the invention, and it\'s fantastic at several very specific things. The mistake is treating the prompt box as the product. Every SaaS app you use is data, logic, and a UI, and those three things have to be built by someone who knows the domain. AI is not a replacement for that person, if you were wondering. But AI is a phenomenal accelerator for that person, if you give it a proven process instead of a text file of instructions and a prayer.',
          'Good software is dependable, functional, scalable, easy to use, and secure. A markdown file of instructions is none of those. Data engineering, API development, and real UI / UX work are. Glyphh is my almost-30 years of doing that, turned into a deterministic build process anyone can run.',
        ],
      },
      {
        id: 'what-it-looks-like',
        heading: 'What it looks like',
        body: [
          'Say your ops team lives in three SaaS tools and a spreadsheet. In Glyphh you describe the app, pick your model (or let the Router pick), and it generates the data model, the connectors to those three tools, and the UI. You iterate with the AI until it\'s right. Then you hit run. From that point on the app is just an app: no tokens, no latency lottery, same answer every time. You publish it to your org, someone reviews and approves it, and your teammates install it and run it locally against their own connections.',
        ],
      },
      {
        id: 'share-app-not-data',
        heading: 'Share the app, not the data',
        body: [
          'This is the part I care about most, and it\'s the opposite of SaaS. In Glyphh, MCP connections are scoped to the desktop user (you can scope them to the org, but I rarely advise it). Every app runs against the credentials of the person running it. So you can share an application with 200 people and never share a single row of data, and nobody has to stand up a multi-tenant instance to make that true. The runtime keys off connections, not shared secrets.',
        ],
      },
      {
        id: 'semantic-data',
        heading: 'Semantic data',
        body: [
          { html: 'There are times when you\'ll want to extend your workspace itself and build apps that improve how you work. This is another critical insight from <a href="https://github.com/glyphh-ai/code" target="_blank" rel="noopener noreferrer">Glyphh Code v1</a>, now open source. With the Glyphh desktop runtime you get a database, a vector DB, a knowledge graph, Ada, and adaL (KB graph triples) built into the harness. Combine that with MCP tools and any loop you run can consume it all immediately. So build a new file browser that remembers everything you\'ve browsed, as a fun add, and watch that app get integrated into your harness and become part of how you work. Find an unlock, share it with your org or the world.' },
        ],
      },
      {
        id: 'connections',
        heading: 'Connections',
        body: [
          'We leverage Pipedream to extend 3,500+ MCP tools to your desktop, completely independent of any vendor. Your skills, apps, plugins, and tasks (rrotor loops) are all yours, completely portable across every vendor and model you use — the build capabilities come along seamlessly, every turn you take.',
        ],
      },
      {
        id: 'router',
        heading: 'The Router',
        body: [
          'The Glyphh Router is a fork of LiteLLM. It works, it\'s proven, the license allowed it, and we needed things upstream didn\'t have. The main one: semantic routing. The Router reads the nature of a request and sends it to a frontier or open-weight model accordingly, with overrides when you need them. In practice that means you keep your frontier credits for the hard stuff (super-expensive Fable, say) and burn open weights on dev tasks and sending emails ;). The token savings across an org are real.',
        ],
      },
      {
        id: 'why-us',
        heading: 'Why us',
        body: [
          'I\'ve spent almost 30 years architecting and implementing software for some of the largest global companies at serious scale. My co-founder and I have built HA, fault-tolerant, secure systems for a living, and we brought that to Glyphh\'s infrastructure. We vibe code plenty these days, we\'d be insane not to, but vibe coding is an exercise in restraint, and restraint is what we sell.',
          'Glyphh puts the human back in intelligence: you decide what gets built, the AI helps you build it, and what runs is yours.',
          'Install Glyphh and tell me what you build. I\'m serious about the feedback.',
          '— Timme',
        ],
      },
    ],
  },
];

export const postBySlug = (slug) => POSTS.find((p) => p.slug === slug);

export const fmtDate = (iso) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
