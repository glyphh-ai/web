/**
 * The blog's posts — the store behind /blog, /blog/[slug], and the home
 * page's Latest section. Newest first. A post's `sections` carry an id, a
 * heading, and the paragraphs under it; the article page builds "On this
 * page" from them. Copy is his; spelling and grammar cleaned, voice left alone.
 */

export const POSTS = [
  {
    slug: 'welcome-to-glyphh-ai',
    title: 'Welcome to Glyphh AI',
    summary: 'Chris, aka Timme, on the official launch of Glyphh AI: where it came from, what it turned into, and why AI belongs at build time.',
    date: '2026-09-22',
    author: 'Chris "Timme"',
    minutes: 8,
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
          'Hi everyone, my name is Chris, aka Timme, and this is the official launch of Glyphh AI. It has been years in the making and honestly an amazing journey. I can\'t thank everyone in my life enough for enduring the endless conversations, the re-writes, the failures, the "hey, try this one more time" calls to our beta testers. We are so proud of what we have built and we truly hope you see value from the technology.',
          'Our mission is one based on peace, love, and respect for everyone. We are putting the human back in intelligence. I believe respect is earned, not demanded, and with that I give my nights, weekends, and endless dev cycles to all of you in what I have created here.',
          'Will it cure cancer, or solve the world\'s problems? Likely not, but hey, I had to set my sights on something 🙂',
        ],
      },
      {
        id: 'what-is-glyphh',
        heading: 'What is Glyphh?',
        body: [
          'Turns out that is a very, very hard question to answer. Like so many AI products it started off trying to be everything to everyone. Coding these days, and I have 30 years under my belt, is much faster in some ways and way slower in others. Vibe coding is an exercise in restraint, process, and rigor. It is so, so easy to let a model run, so to speak. Then you\'re cleaning up thousands of lines of code that moved the needle hardly at all.',
          { html: 'Glyphh started as a memory substrate, <a href="https://github.com/glyphh-ai/ada" target="_blank" rel="noopener noreferrer">Ada</a>, named after Ada Lovelace. I did a write-up on her on our <a href="/research">research page</a>; fascinating to think about. Glyphh is a multi-dimensional HDC lattice, an attempt to harden semantic knowledge beyond RAG. Turns out it works incredibly well for storing temporal signal. Over time I built adaL, which took Ada to the next level with a new type of semantic graph, but ultimately found that RAG or simple SQL with large context windows is hard to beat. Though the research paved the way for what we call rrotors (recursive reasoning on top of reasoning) and the loop our Glyphh runtime executes on. As with any research, the finding isn\'t always the thing that moves the needle the furthest, but more the path that got you there.' },
          { html: 'Where we landed: Glyphh is more like an operating system than anything else. Honestly, if I was more zealous I would have written it that way, and may yet still. Why? If you\'re like me, AI didn\'t simplify my day, it complicated it 100 times over. My context switching from task to task increased 10x, what seemed like overnight. The use of Ctrl+C and Ctrl+V was epic before gen AI and, well, around April it hit an all-time high. I wanted a way to combine the different model loops I was coding with and my app layouts, with more deterministic outcomes. It was clear to me very early on that these models are not good at runtime but excel at one thing clearly: iterative generation, which for most of us in software engineering means code gen. The first versions of Glyphh, beyond the Ada and adaL runtimes, were the primitive <a href="https://github.com/glyphh-ai/code" target="_blank" rel="noopener noreferrer">Glyphh Code</a>. However, that codebase lacked something I could never quite put my finger on, and then it hit me. I want context switching and loop / model selection combined with model routing and semantic data. Why?' },
          'What defines a software application? MVC is a common pattern which refers to Model, View, and Controller. I won\'t go into it; just ask your favorite model to break it down. Generally speaking we need data, which most will tell you is the start of all application development, but I am not sure that is entirely true. I have written software in some of the largest technology companies for some of the largest global customers, and sometimes starting with the experience and working backwards is the right call. But for this conversation, indulge me: let\'s start with data.',
        ],
      },
      {
        id: 'model',
        heading: 'Model',
        body: [
          'Now, unless you can connect to or derive the schemas of SaaS apps, and you have that skillset, you\'re going to need a way to understand data models. Nothing to do with AI. That skill, to become a DBA, is years of work, and I have the battle scars with those folks from building multi-tenant, HA-based data tiers that are active / active in high-volume orgs. What you\'re going to build isn\'t likely that, but you need some way to understand the data model.',
          'The model also generally holds the business logic, state, calculations, etc. So in order to build an application, somewhere you need to have a level of domain expertise or access to someone that can help you define the logic. Why? Well, as fun as it might be to try and guess how a team works or an app should work, there is no replacement for domain experts. AI is not a replacement, if you are wondering. I\'ll circle back to why this is so critical relative to Glyphh\'s architecture.',
        ],
      },
      {
        id: 'controller',
        heading: 'Controller',
        body: [
          'In order to move the data and store it we need a layer that sits between the user interface and the data. The controller acts mostly like a traffic cop of sorts. It takes a request from a caller, parses the data, calls the model, etc. CRUD operations (create, read, update, and delete) are the basics; controller bloat is a thing. Frameworks like the MEAN and MERN stacks are saviors in this regard, so is good old Rails, but frameworks like Go are my new go-to.',
        ],
      },
      {
        id: 'view',
        heading: 'View',
        body: [
          'This is obvious, I hope: the view is the interaction with the user and, IMHO, the place that matters most, even in the world of AI. In fact, maybe more so now that AI is in the picture.',
          'So why did I explain that relative to Glyphh? Glyphh is not just a "harness"; it is a way to create micro applications, using AI, to improve how you work. What? Let me say that again in a different way. Glyphh allows you to leverage AI, Claude, OpenAI, Gemini, Cursor, GitHub, etc., to build micro MVC applications that you can instantly use, share, and extend. Why does that matter?',
        ],
      },
      {
        id: 'prompt-ui',
        heading: 'Who said a prompt was a good UI?',
        body: [
          'For the life of me I can\'t figure out who came up with the idea that asking for something, getting a random-ish response, re-asking, another random-ish response, was a good way to interact with software. Is it cool? Yes, very, very cool. Is it efficient or effective? Not really. Gen AI is very, very good at build time, but if I have to ask for what I want in a sentence every time, have it interpret, charge me cash, then figure out it got it wrong, with no way to get a refund... that is not efficient, practical, or scalable. Great job, frontier AI, convincing the world this is the best thing since sliced bread. Not to burst anyone\'s bubble, but it isn\'t any of those things. You have to ask yourself: if this technology can do anything and solve any problem, then why does OpenAI or Anthropic or anyone want to sell it to anyone else? Why not just use it to take over the world, SaaS product by SaaS product? The answer, IMHO, is that the invention isn\'t a new way to use AI but the model itself, which is fantastic at several very specific things.',
        ],
      },
      {
        id: 'good-use',
        heading: 'So what is scalable and a good use of AI?',
        body: [
          'Using AI to build something, iteratively, is frankly the only real use case I can see that merits my investment. To that end, what makes good software? Good software is dependable, functional, scalable, easy to use, and secure. Creating a skill.md file with instructions in text is not software or business logic; it is a horrible way to make anything any of those words I just typed. Using a proven methodology of data engineering, API development, and UI / UX development is. Why not extend my 30 years of experience into a deterministic process to help anyone and everyone build software that can be run in the same tool you use to build it in? That is what Glyphh is. An efficient way to build AI with frontier and open-weight models, connectivity to thousands of endpoints, deterministic ways to push and pull data, with no LLM in the middle of running the application. We are using the LLM at build time to refine something that supercharges what we do at runtime.',
        ],
      },
      {
        id: 'ux',
        heading: 'The UX',
        body: [
          'Glyphh is more than just a harness; I have said that a few times. What I mean is that you leverage the desktop to build using AI, fun and, well, very fun even. Then in the same tooling you can build and run the apps you create. You can share those apps with your organization, they can review and approve, and then ship those same apps to your peers, who can install them locally and run them also. It is the opposite of SaaS. Why? Data residency is attentive to the persona making the call. In Glyphh our MCP connections can be scoped to the org (rarely advisable) or to the desktop user. This allows us to keep data scoped to just that user\'s writes without having to build single-instance multi-tenant SaaS apps the org would have to host. Glyphh apps are very effective at securely keeping data in the hands of only those allowed to see it. Sharing applications, not data, allows the desktop runtime to key off connections and not shared credentials.',
        ],
      },
      {
        id: 'router',
        heading: 'The Router',
        body: [
          'The Glyphh Router is a fork of LiteLLM. We took their server and improved and extended it. Why? Why not; it works, it is proven, and the license allowed us to do it. In doing that we extended our ability to make our desktop, or any agent loop, better at build time. How? The Router has the ability to semantically route calls to frontier and open-weight models based on the nature of the request, with overrides when needed. This can cut token usage within an organization dramatically. You combine that with our desktop and now you can burn down your frontier credits with a balance of open models. Thus allowing you to leverage whatever strategy you want; say, keep your frontier credits for super-expensive Fable and use open weights for dev tasks or sending emails ;). The balance is real and the dollars saved are legit.',
        ],
      },
      {
        id: 'why-glyphh',
        heading: 'Why Glyphh?',
        body: [
          'We have over 40 years of combined software engineering and architecture experience. As I said, I have traveled globally for almost 30 years architecting and implementing software for some of the largest global corporations at massive scale. We are not vibe coders, though we do vibe code a lot these days; we would be insane not to. Our software is HA, fault tolerant, secure, and reliable. We have extensive experience in security and governance and we applied that to our infrastructure architecture.',
          'All in all there has been a tremendous amount of development and this is an exciting day. I can\'t wait for you to try Glyphh and see the power we are putting in your hands and the value to your teams. You might just get addicted to this new way of working in the desktop. Super excited to get your feedback.',
          '— Timme',
        ],
      },
    ],
  },
];

export const postBySlug = (slug) => POSTS.find((p) => p.slug === slug);

export const fmtDate = (iso) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
