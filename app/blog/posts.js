/**
 * The blog's posts — the store behind /blog, /blog/[slug], and the home
 * page's Latest section. Newest first. A post's `sections` carry an id, a
 * heading, and the paragraphs under it; the article page builds "On this
 * page" from them. Copy is his; spelling and grammar cleaned, voice left alone.
 */

export const POSTS = [
  {
    slug: 'glyphh-desktop-workspaces',
    title: 'Glyphh Desktop Workspaces — Stop Losing the Thread',
    summary: 'Context switching costs you 15 minutes and 40% of your brain power every single time, and AI made it 10x worse. Timme demos Glyphh workspaces: models, loops, apps and connectors in one place, and your session follows you through the day.',
    date: '2026-10-01',
    author: 'Chris "Timme"',
    minutes: 4,
    cover: 'https://i.ytimg.com/vi/ABXhO46Delw/maxresdefault.jpg',
    coverAlt: 'Glyphh Desktop Workspaces, the demo video.',
    video: 'ABXhO46Delw',
    tags: ['Desktop', 'Workspaces', 'Demo'],
    related: [
      ['Semantic Apps', 'https://docs.glyphh.ai/ada'],
      ['The Router', 'https://docs.glyphh.ai/gateway'],
      ['The Critical Inversion', '/blog/the-critical-inversion'],
    ],
    sections: [
      {
        id: 'the-video',
        heading: null,
        body: [
          'Hi everyone, Chris here. Today we\'re talking Glyphh desktop workspaces. If you haven\'t heard about Glyphh desktop yet, it\'s the brand new vendor neutral alternative to Claude Code or Cowork on your desktop, OpenAI, Gemini, and potentially Cursor. Watch the demo above, or read on, I\'ll walk you through the highlights.',
        ],
      },
      {
        id: 'context-switching',
        heading: 'The real cost of context switching',
        body: [
          'My typical day starts with about 15 to 20 tabs open in my browser. To be clear, this isn\'t my dev workflow, when I\'m in engineering mode with VS Code open. These are the things I\'m doing when I get distracted from the workflows that are really well oriented. My day spans me trying to get some work done, doing 50 meetings in between, and at the same time bouncing between five or six different chat interfaces and copying and pasting everywhere.',
          'The problem with that is context switching, and I\'m not talking about switching between large language models. I\'m talking about I was working on one thing, someone interrupted me and I had to switch to something else. That costs you 15 minutes at least in clock time every single time and about 40% of your brain power. You lose the thread. You lose the context. And getting back into that rhythm again is very difficult. In the world of AI that is 10x worse in my opinion, we are constantly context switching. That\'s the premise behind workspaces.',
        ],
      },
      {
        id: 'feels-like-an-os',
        heading: 'It should feel like an operating system',
        body: [
          'When you close everything down Glyphh starts to look different, more like an operating system, more like an iPad or the command center on your Mac. I can click and drag and open up what we call work panels, these are like browser tabs. I hit Command Shift Space (Control Shift Space on Windows) and I\'m back in the Echo panel. You might hear the little click, the most satisfying sound ever, that\'s why we call it Echo. From there I can add another panel, close panels, drag them around, expand them full screen, hold Command (or Control) and pick and choose the apps I want to open. It\'s a dynamic workspace and it\'s a very handy way of working.',
          'In the code/vibe layout you get files, diff and a browser, work panels that should feel very familiar if you\'re used to Claude Code on the desktop or Codex or other IDEs that are more vibe in nature. And here\'s the important point that comes up again and again: these work panels are what we call semantic applications, written in Glyphh for Glyphh. You can add applications to a workspace that extend the MCP tools available to the agent as you work.',
        ],
      },
      {
        id: 'workspaces',
        heading: 'Workspaces',
        body: [
          'My development workspace is where I do most of my work when I\'m coding, and I\'ve got the CLI version of Claude Code running in it. I like the CLI when I\'m writing software, it\'s just my preference and I like Claude\'s interface for it. The Glyphh CLI is also wicked cool and you could use it, but I happen to prefer Claude even though I build Glyphh. What that means is Claude is not only wired into the workspace with access to the 250+ MCP tools the workspace provides, it\'s also wired through the Glyphh model router. Glyphh supports 80+ models today and can reach somewhere around 3,900 across 129 providers, because we forked LiteLLM. Very important to understand.',
          'But I can come up to the dock, click on another workspace, and completely reorient how I\'m working. Those four work panels are Glyphh semantic applications, and each one comes with a set of MCP tools hardwired into the workspace and accessible from the agent, whatever CLI or loop I happen to be running. Through our gateway we also support semantic routing of models, really cool feature, but that\'s another post. The core concept is a workspace with semantic applications oriented to the job I\'m trying to get done. There\'s one for design, one for email, so on and so forth.',
        ],
      },
      {
        id: 'never-lose-the-thread',
        heading: 'Never lose the thread',
        body: [
          'So what does that have to do with context switching? Let\'s say I\'m in my design layout in the middle of working and someone pings me, or I hear Slack going off in the background. Command Shift Space, straight into Slack, and it jumped right where I pinned it. Need to send an email? Dip into Gmail and it orients there. Glyphh has many ways to jump around without losing the thread you\'re working on, and behind the scenes there are over 3,500 MCP servers and connections available through Pipedream, one of our partners.',
          'Why is that important? Because in the middle of working, when I need to jump from one task to the next, I can move the context of the agent I\'m working with along with me as I progress through the day. I dip to my email layout and the thread I was working on in design comes with me. Then I jump back into Slack, back into the workspace, and away I go. It\'s really really quite effective.',
        ],
      },
      {
        id: 'build-your-own',
        heading: 'Build your own',
        body: [
          'The other major piece is how you orient each workspace to each other. My design, development and Jira workspaces may be closer together than say my email or financial workspaces. When you build a workspace you set the number of columns and the number of rows per column, then you pick the semantic applications (or applications) to fill those slots. Pick the Glyphh agent and some options show up. Some orient the workspace to itself: run this model, this loop. Others orient the workspace to everything else you\'re doing: start a new session, or carry the current session from agent to agent, workspace to workspace, so you are never losing the context or the thread. You can also keep an agent from getting interrupted on what it\'s currently working on. Take all the models and loops we support into consideration and that\'s really quite profound.',
          'And yes, I\'m still using my hands. I feel like the kids in Back to the Future, "oh my gosh, you still have to use your hands." All of this can be driven through your desktop agent too, but that\'s a video for another day.',
        ],
      },
      {
        id: 'summary',
        heading: 'To summarize',
        body: [
          'Glyphh gives you desktop applications, semantic applications that you build using Glyphh. Workspaces combine models, loops, applications and connectors into one thing so your session follows you as you work through the day. Yielding all those superpowers, all 3,900+ models, gives you the ability to play them in the right order at the right time and make you superhuman at the things you do all day long.',
          'I\'d love to hear your comments and thoughts. Give me your ideas or questions and I\'ll be happy to respond.',
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
    tags: ['Strategy', 'Open Weights', 'The Router'],
    related: [
      ['The Router', 'https://docs.glyphh.ai/gateway'],
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
      ['Ada', '/products/ada'],
      ['Ada models', 'https://docs.glyphh.ai/ada'],
      ['The Router', 'https://docs.glyphh.ai/gateway'],
    ],
    sections: [
      {
        id: 'hi',
        heading: null,
        body: [
          'Hi everyone, my name is Chris, aka Timme, and this is the official launch of Glyphh AI. Years in the making, a lot of rewrites, a lot of "hey, try this one more time" calls to our beta testers. Thank you to everyone who put up with the endless pursuit of this primitive and how to wield it. We are still not there yet, but we are very proud of what we have built thus far.',
          'Here\'s the whole idea in one breath: use AI to build the app, not to run it.',
          'Frontier models are incredible at one thing, iterative generation. For those of us in software that means code gen. They are not good at being the runtime. So Glyphh puts Claude, OpenAI, Gemini, or your open-weight model of choice at build time, where they shine, and then runs what you built deterministically on your data, with no LLM in the middle. You build it on your desktop, you run it on your desktop, you share it with your org, and your peers install it and run it on theirs. Same tool for both.',
          'That\'s it. Everything below is how we got there and why it matters.',
        ],
      },
      {
        id: 'origins',
        heading: 'Where it came from',
        body: [
          { html: 'Glyphh started as a memory substrate called <a href="/products/ada">Ada</a>, named after Ada Lovelace. Ada is a multi-dimensional HDC lattice, an attempt to harden semantic knowledge beyond RAG. It turned out to be excellent at storing temporal signal, and I kept building on top of it.' },
          { html: 'That path gave us what Ada is today: the first Glyphh model, software\'s reasoning substrate. Ada speaks in math. Seed her with data and she builds a lattice of algebraic meaning: hierarchical, weighted, typed and temporal. Send her a like glyph and she answers with a fact tree: what is near, how near, and why. Your agents build the typed models, and your software leverages them at runtime, with no LLM in the middle. Ada is a major part of this release, and she is what the apps you build stand on. More on <a href="/products/ada">the Ada page</a> and in <a href="https://docs.glyphh.ai/ada">the docs</a>.' },
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
          'Say your ops team lives in three SaaS tools and a spreadsheet. In Glyphh you describe the app, pick your model (or let the Router pick), and it generates the data model, the connectors to those three tools, and the UI. You iterate with the AI until it\'s right. Then you hit run. From that point on the app is just an app: no tokens, no latency lottery, same answer every time. When it needs to reason over your data, it asks Ada, not a model. You publish it to your org, someone reviews and approves it, and your teammates install it and run it locally against their own connections.',
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
        heading: 'Semantic apps',
        body: [
          { html: 'This is where <a href="/products/ada">Ada</a> comes in, and it is kind of the whole point. Use AI to build the app, not to run it: at build time your agents build typed Ada models and seed them with your data. At runtime the app asks Ada. The answer is deterministic, it comes back as a fact tree, and it tells you what it stands on. That is what makes a semantic app an app and not a chat transcript.' },
          { html: 'There are times when you\'ll want to extend your workspace itself and build apps that improve how you work. This is another critical insight from <a href="https://github.com/glyphh-ai/code" target="_blank" rel="noopener noreferrer">Glyphh Code v1</a>, now open source. With the Glyphh desktop runtime you get a database, a vector DB, a knowledge graph, and Ada built into the harness. Combine that with MCP tools and any loop you run can consume it all immediately. So build a new file browser that remembers everything you\'ve browsed, as a fun add, and watch that app get integrated into your harness and become part of how you work. Find an unlock, share it with your org or the world.' },
        ],
      },
      {
        id: 'connections',
        heading: 'Connections',
        body: [
          'We leverage Pipedream to extend 3,500+ MCP tools to your desktop, completely independent of any vendor. Your skills, apps, plugins, and tasks are all yours, completely portable across every vendor and model you use — the build capabilities come along seamlessly, every turn you take.',
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
