// The FAQ: two or three sentences each, plain words, nothing that is not
// built. Answers are strings or, when they carry a link, { html }.

const DOCS = 'https://docs.glyphh.ai';
const SELF_HOSTING = 'https://github.com/glyphh-ai/rrotor/tree/main/docs/self-hosting';

export const FAQ_GROUPS = [
  {
    title: 'Glyphh and Ada',
    items: [
      {
        id: 'what-is-glyphh',
        q: 'What is Glyphh?',
        a: { html: `The company behind Ada. You sign in on <a href="https://platform.glyphh.ai">platform.glyphh.ai</a>, run Ada in rrotor on your own infrastructure, and call your models from Claude and from your software.` },
      },
      {
        id: 'what-is-ada',
        q: 'What is Ada?',
        a: { html: `A classifier that learns from precedent. You record graded cases; a new case is answered from the precedents nearest to it, with a calibrated probability for each outcome, and Ada asks when it is unsure. See <a href="${DOCS}/ada-introduction">What Ada is</a>.` },
      },
      {
        id: 'learn',
        q: 'How does it learn?',
        a: 'Every case you record with its outcome becomes a precedent and counts from the next question. Ada also learns its own weights from the cases you have graded, so the parts of a case that predict the outcome count for more.',
      },
      {
        id: 'llm',
        q: 'Is there a language model in the answer?',
        a: 'No. An answer is arithmetic on your cases: the same question always gets the same answer, and when nothing is close enough Ada says so. Claude helps you build the model; the model answers on its own.',
      },
      {
        id: 'build',
        q: 'How do I build a model?',
        a: { html: `Ask Claude. With the <code>glyphh</code> plugin it writes the model with you, pushes it to your GitHub repo, deploys the commit to your runtime and calls it. See the <a href="${DOCS}/quick-start">quick start</a>.` },
      },
      {
        id: 'call',
        q: 'How does my software call a model?',
        a: { html: `With a runtime key, through the SDKs (<code>pip install glyphh</code>, <code>npm i @glyphh-ai/glyphh</code>) or <code>POST /v1/runs</code> at your runtime’s address. See <a href="${DOCS}/ada-sdk">SDKs</a>.` },
      },
    ],
  },
  {
    title: 'Runtimes',
    items: [
      {
        id: 'runtime',
        q: 'What is a runtime?',
        a: { html: `rrotor, where your models live and run. You run it on your own infrastructure at an address of your own, <code>https://&lt;host&gt;</code>, and Claude adds it as a connector at that address plus <code>/mcp</code>. See <a href="${DOCS}/runtimes">Runtimes</a>.` },
      },
      {
        id: 'self-host',
        q: 'How do I run it?',
        a: { html: `With Docker Compose, Helm or Terraform, from the image <code>ghcr.io/glyphh-ai/rrotor</code>. See the <a href="${SELF_HOSTING}">self-hosting guides</a>.` },
      },
      {
        id: 'hosted',
        q: 'Does Glyphh host runtimes?',
        a: 'No. Every runtime is yours, on your own machines or in your own cloud. Glyphh is never between your callers and your runtime.',
      },
      {
        id: 'cluster',
        q: 'Can I run more than one node?',
        a: 'Yes, on Pro, Team and Enterprise. The nodes of a cluster sync: one is the head and the rest follow it. On Pro and Team you move the head by command; on Enterprise the cluster elects a new one on its own.',
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
        a: 'Ada, every feature of it, on one runtime node with up to 5,000 precedents, and unlimited members, installs and models.',
      },
      {
        id: 'precedents',
        q: 'How are precedents counted?',
        a: 'Per runtime node, all its models together: 5,000 on Free, 50,000 on Pro, 500,000 on Team, unlimited on Enterprise. Past the limit a new case is not indexed, and the answer says so.',
      },
      {
        id: 'key',
        q: 'How is a plan enforced?',
        a: 'With a licence key signed by Glyphh and checked on the node, with no call home. A new key comes with each paid month; with no key, a node runs as Free.',
      },
    ],
  },
  {
    title: 'Data and security',
    items: [
      {
        id: 'data',
        q: 'Does Glyphh see my data?',
        a: 'No. Calls go straight to your runtime. Glyphh sees your account, your plan, your licence keys and, for each node that links, its id, version and precedent count: never a model’s inputs or results, and never a caller’s address.',
      },
      {
        id: 'logs',
        q: 'Where do the logs go?',
        a: 'They stay on your runtime. You can drain them over OpenTelemetry to your own collector, or opt in to send them to Glyphh, where they are kept for 7 days so the platform can show them.',
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
