// The FAQ: two or three sentences each, plain words, nothing that is not
// built. Answers are strings or, when they carry a link, { html }.

const DOCS = 'https://docs.glyphh.ai';

export const FAQ_GROUPS = [
  {
    title: 'Glyphh and Ada',
    items: [
      {
        id: 'what-is-glyphh',
        q: 'What is Glyphh?',
        a: { html: `A platform and runtimes for Ada. You sign in on <a href="https://platform.glyphh.ai">platform.glyphh.ai</a>, your Ada models live and run in a runtime of your own, and Claude and your software call them there.` },
      },
      {
        id: 'what-is-ada',
        q: 'What is Ada?',
        a: { html: `A typed spec and a precedent store. Each case you record with its outcome becomes a precedent; a new case is answered from the precedents closest to it, with how sure it is and the precedents it stands on. See <a href="${DOCS}/ada-introduction">What Ada is</a>.` },
      },
      {
        id: 'llm',
        q: 'Is there a language model in the answer?',
        a: 'No. An answer is arithmetic on your cases: the same question always gets the same answer, and when nothing is close enough Ada says so. Claude helps you build the model; the model answers on its own.',
      },
      {
        id: 'build',
        q: 'How do I build a model?',
        a: { html: `Ask Claude. With the <code>glyphh</code> plugin it writes the model’s three files with you, pushes them to your GitHub repo, deploys the commit to your runtime and calls it. See the <a href="${DOCS}/quick-start">quick start</a>.` },
      },
      {
        id: 'call',
        q: 'How does my software call a model?',
        a: { html: `With a runtime key, through the SDKs (<code>pip install glyphh</code>, <code>npm install @glyphh-ai/glyphh</code>) or <code>POST /v1/runs</code> at your runtime’s address. See <a href="${DOCS}/ada-sdk">SDKs</a>.` },
      },
    ],
  },
  {
    title: 'Runtimes',
    items: [
      {
        id: 'runtime',
        q: 'What is a runtime?',
        a: { html: `Where your models live and run: hosted by Glyphh at <code>https://&lt;machine&gt;.glyphh.app</code>, or on your own infrastructure at <code>https://&lt;host&gt;</code>. Claude adds it as a connector at that address plus <code>/mcp</code>. See <a href="${DOCS}/runtimes">Runtimes</a>.` },
      },
      {
        id: 'self-host',
        q: 'Can I run it myself?',
        a: { html: `Yes, on every plan, Free included, with no cap on precedents: Docker Compose, Helm or Terraform, from the image <code>ghcr.io/glyphh-ai/rrotor</code>. See the <a href="https://github.com/glyphh-ai/rrotor/tree/main/docs/self-hosting">self-hosting guides</a>.` },
      },
      {
        id: 'hosted',
        q: 'Who can have hosted machines?',
        a: 'Pro (3 machines), Team (10) and Enterprise. Each is billed per second while it runs, at the published rates, on top of the plan.',
      },
    ],
  },
  {
    title: 'Plans',
    items: [
      {
        id: 'pricing',
        q: 'What does it cost?',
        a: { html: 'Free is $0. Pro is $99 a month and Team $299 a month, flat; Enterprise is by contract. Never per seat, per model or per install. See <a href="/pricing">pricing</a>.' },
      },
      {
        id: 'free-plan',
        q: 'What is in the free plan?',
        a: 'Ada, every feature of it, self-hosted runtimes with no cap on precedents, and unlimited members, installs and models.',
      },
      {
        id: 'precedents',
        q: 'What are managed precedents?',
        a: 'How many precedents a hosted runtime may hold, all its models together: 100,000 on Pro, 1,000,000 on Team, unlimited on Enterprise. A self-hosted runtime has no cap.',
      },
    ],
  },
  {
    title: 'Data and security',
    items: [
      {
        id: 'data',
        q: 'Does Glyphh see my data?',
        a: 'No. Calls go straight to your runtime. Its link to Glyphh carries the licence, keys, deploys and each run’s status, never a model’s inputs or answers.',
      },
      {
        id: 'clearance',
        q: 'Can different callers see different things?',
        a: { html: `Yes. A spec can put layers behind a clearance; a caller below it gets the answer without them. See <a href="${DOCS}/ada-typed">The spec</a>.` },
      },
      {
        id: 'sign-in',
        q: 'How do I sign in?',
        a: { html: 'With Google or GitHub on the platform. A connector in Claude signs you in for that runtime with one Allow click. Found a problem? Write to <a href="mailto:security@glyphh.ai">security@glyphh.ai</a>.' },
      },
    ],
  },
];
