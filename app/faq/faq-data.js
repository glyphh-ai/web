// The FAQ: two or three sentences each, plain words, nothing that is not
// built. Answers are strings or, when they carry a link, { html }.
// Ada Cloud (live 2026-10-22) has no runtimes, nodes or licence keys. rrotor is shelved (2026-11-02): not on the site.

const DOCS = 'https://docs.glyphh.ai';

export const FAQ_GROUPS = [
  {
    title: 'Glyphh and Ada',
    items: [
      {
        id: 'what-is-glyphh',
        q: 'What is Glyphh?',
        a: { html: `The company behind Ada. You sign up on <a href="https://platform.glyphh.ai">platform.glyphh.ai</a>, your models run in Ada Cloud, and you call them from Claude and from your software.` },
      },
      {
        id: 'what-is-ada',
        q: 'What is Ada?',
        a: { html: `A classifier that learns from labelled examples, its precedents. A new case is answered from the precedents nearest to it, with a calibrated confidence and the precedents the answer stands on. See <a href="${DOCS}">how Glyphh works</a>.` },
      },
      {
        id: 'use-case',
        q: 'What is it for?',
        a: { html: 'Any decision you already make by hand and record: which team owns a support ticket, whether an account will churn, which queue a request belongs in. <a href="/use-cases/support-routing">See ticket routing in action</a>.' },
      },
      {
        id: 'learn',
        q: 'How does it learn?',
        a: 'Every case you record with its outcome becomes a precedent and counts from the next question. Ada also learns its own weights from the cases you have graded, so the parts of a case that predict the outcome count for more.',
      },
      {
        id: 'llm',
        q: 'Is there a language model in the answer?',
        a: 'No. An answer is arithmetic on your precedents: the same question always gets the same answer, and when nothing is close enough Ada says so instead of guessing.',
      },
      {
        id: 'hand-off',
        q: 'What happens when Ada is unsure?',
        a: 'Your application hands the case on, to an LLM or to a person, whichever you choose. The answer it gets back is recorded as a precedent, so the next case like it is Ada’s to answer, and the LLM is called less as Ada learns.',
      },
      {
        id: 'build',
        q: 'How do I build a model?',
        a: { html: `Ask Claude. With the <code>glyphh</code> plugin and the Glyphh connector it writes the model with you, loads your history, backtests it and asks it. Or start from an example on the platform. See <a href="${DOCS}/getting-started">Getting started</a>.` },
      },
      {
        id: 'plugin',
        q: 'How do I get the plugin?',
        a: { html: 'In Claude Code: <code>/plugin marketplace add glyphh-ai/glyphh</code>, then <code>/plugin install glyphh@glyphh</code>, and add the connector <code>https://api.glyphh.ai/mcp</code> in Claude. The source is at <a href="https://github.com/glyphh-ai/glyphh">github.com/glyphh-ai/glyphh</a>.' },
      },
      {
        id: 'call',
        q: 'How does my software call a model?',
        a: { html: `With an API key from the platform, through the SDKs (<code>pip install glyphh</code>, <code>npm i @glyphh-ai/glyphh</code>) or the API at <code>https://ada.glyphh.ai</code>. See <a href="${DOCS}/sdks">the SDKs</a>.` },
      },
    ],
  },
  {
    title: 'Ada Cloud',
    items: [
      {
        id: 'where',
        q: 'Where does it run?',
        a: 'In Glyphh’s cloud, in the United States. There is nothing to install or run: sign up, make an API key, and call it.',
      },
      {
        id: 'isolation',
        q: 'Is our data kept apart from other customers’?',
        a: 'Yes. Each organisation’s data lives in its own database schema, behind row-level security that fails closed, and a model learns only from its own precedents.',
      },
    ],
  },
  {
    title: 'Plans',
    items: [
      {
        id: 'pricing',
        q: 'What does it cost?',
        a: { html: 'Free is $0. Basic is $20 a month, Pro $99 a month and Team $299 a month, flat; Enterprise is by contract. Never per seat, per model or per install. See <a href="/pricing">pricing</a>.' },
      },
      {
        id: 'free-plan',
        q: 'What is in the free plan?',
        a: 'Ada, every feature of it, with up to 1,000 precedents and 5,000 reads a month, and unlimited members, models and keys.',
      },
      {
        id: 'precedents',
        q: 'How are precedents and reads counted?',
        a: 'Precedents across all your organisation’s models: 1,000 on Free, 10,000 on Basic, 100,000 on Pro, 1,000,000 on Team. Reads a month: 5,000, 50,000, 1,000,000 and 5,000,000.',
      },
      {
        id: 'overage',
        q: 'What happens past the month’s reads?',
        a: 'On Basic, Pro and Team, reads go on and the ones past the allowance are billed at $1 per 10,000. On Free they are refused until the month turns.',
      },
    ],
  },
  {
    title: 'Data and security',
    items: [
      {
        id: 'data',
        q: 'Do you train on my data?',
        a: { html: 'No. Glyphh never uses your data to train models and never sells it, and no language model is in Ada Cloud’s path. See the <a href="/privacy">Privacy Policy</a>.' },
      },
      {
        id: 'export',
        q: 'Can I take my data out?',
        a: 'Yes, any model at any time, on every plan, and you can delete any model or precedent at any time.',
      },
      {
        id: 'clearance',
        q: 'Can different callers see different things?',
        a: { html: `Yes. A spec can put layers behind a clearance; a caller below it gets the answer without them. See <a href="${DOCS}/api">the API</a>.` },
      },
      {
        id: 'sign-in',
        q: 'How do I sign in?',
        a: { html: 'With Google or GitHub on the platform. The connector in Claude signs you in with one Allow click. Found a problem? Write to <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.' },
      },
    ],
  },
];
