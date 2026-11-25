import './docs.css';
import { GROUPS } from './content';
import DocsSidebar from './DocsSidebar';
import { SITE } from './base';
import DocsHtmlClass from './DocsHtmlClass';

export const metadata = {
  title: { default: 'Glyphh Docs', template: '%s | Glyphh Docs' },
  description: 'Archived documentation of the Glyphh decision engine (Ada) and its former hosted service, Ada Cloud: the spec, the API, tuning, data, the plugin and the SDKs.',
};

export default function DocsLayout({ children }) {
  const nav = GROUPS.map((g) => ({ title: g.title, pages: g.pages.map(({ slug, title, lede }) => ({ slug, title, lede })) }));
  return (
    <div className="dx">
      <DocsHtmlClass />
      <div className="dx-shell">
        <DocsSidebar groups={nav} />
        <main className="dx-main">
          {/* The docs since 2026-11-25: the Labs documentation of the decision engine. Ada Cloud is shut down. */}
          <p className="dx-article" style={{ margin: '0 auto 24px', padding: '12px 16px', border: '1px dashed currentColor', borderRadius: 10, fontSize: 14, opacity: 0.9 }}>
            Archived documentation. Ada Cloud, the hosted service these pages describe, is shut down; the engine is open
            source at <a href="https://github.com/glyphh-ai/glyphh">github.com/glyphh-ai/glyphh</a>. Its story is in{' '}
            <a href={`${SITE}/labs`}>Glyphh Labs</a>.
          </p>
          {children}
          <footer className="dx-foot dx-article">
            <span>&copy; Glyphh</span>
            <a href={SITE}>glyphh.ai</a>
            <a href={`${SITE}/labs`}>Labs</a>
            <a href="https://github.com/glyphh-ai">GitHub</a>
            <a href="mailto:support@glyphh.ai">Support</a>
          </footer>
        </main>
      </div>
    </div>
  );
}
