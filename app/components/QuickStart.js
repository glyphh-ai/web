import { APP_URL } from './downloads';

const DOCS = 'https://docs.glyphh.ai';

/**
 * QuickStart — the real one (his order, 2026-10-04): the four steps a person
 * actually takes, in order. Sign in at app.glyphh.ai or install the desktop;
 * pick where the session works (a folder on your desktop, or a cloud folder);
 * pick a model (Default is your team's); say what to build. Each step links
 * to its guide on docs.glyphh.ai. A step may carry a screenshot (`shot`): the
 * docs' guides ship them under /screen-shots and the same files ride here.
 *
 * The terminal that stood here (the 2026-09-22 deviation) listed six ways to
 * get Glyphh; the downloads it carried are the Download section now.
 */

// The guide behind each step. One place to re-point when the docs move.
const GUIDES = {
  signin: `${DOCS}/quick-start`,
  folder: `${DOCS}/where-a-session-works`,
  model: `${DOCS}/pick-a-model`,
  build: `${DOCS}/work-and-code`,
};

const STEPS = [
  {
    n: '01',
    title: 'Sign in',
    body: (
      <>
        Open <a href={APP_URL}>app.glyphh.ai</a> and sign in with your email, Google, or your
        org&rsquo;s SSO. Or <a href="#download">install the desktop</a> and sign in the same way.
      </>
    ),
    guide: GUIDES.signin,
    shot: "/docs/sign-in.png",
  },
  {
    n: '02',
    title: 'Pick where the session works',
    body: (
      <>
        A folder on your desktop, or a cloud folder. A desktop session works in that folder on your
        machine; a cloud session runs in your org&rsquo;s cloud workspace and stays there.
      </>
    ),
    guide: GUIDES.folder,
    shot: "/docs/session-place.png",
  },
  {
    n: '03',
    title: 'Pick a model',
    body: (
      <>
        Default is your team&rsquo;s model. Every model on the list runs through your org&rsquo;s
        Router on your own key, frontier and open weights alike.
      </>
    ),
    guide: GUIDES.model,
    shot: "/docs/model-picker.png",
  },
  {
    n: '04',
    title: 'Say what to build',
    body: (
      <>
        Type the job. A Work session chats and acts with your apps and connections; a Code session
        adds files and a shell, confined to the folder you picked.
      </>
    ),
    guide: GUIDES.build,
    shot: "/docs/composer.png",
  },
];

export default function QuickStart() {
  return (
    <section className="qs" id="quick-start">
      <div className="qs-head">
        <span className="qs-kicker">Quick start</span>
        <a href={DOCS} className="qs-more">Read the docs &rarr;</a>
      </div>

      <div className="hv-panel qst">
        <div className="qst-bar">
          <span className="hv-tabs-label">Get started</span>
          <span className="qst-meta">four steps &middot; one account &middot; desktop or browser</span>
        </div>
        <ol className="qst-steps">
          {STEPS.map((s) => (
            <li key={s.n} className="qst-step">
              <span className="qst-n">{s.n}</span>
              <h3 className="qst-title">{s.title}</h3>
              <p className="qst-body">{s.body}</p>
              {s.shot ? (
                <a href={s.guide} className="qst-shot">
                  <img src={s.shot} alt="" loading="lazy" decoding="async" />
                </a>
              ) : null}
              <a href={s.guide} className="qst-guide">Read the guide &rarr;</a>
            </li>
          ))}
        </ol>
        <div className="ww-foot qst-foot">
          <a href={APP_URL}>Get started at app.glyphh.ai &rarr;</a>
          <a href="#download">Download the desktop &rarr;</a>
        </div>
      </div>
    </section>
  );
}
