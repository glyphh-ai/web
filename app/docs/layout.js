import './docs.css';
import { GROUPS } from './content';
import DocsSidebar from './DocsSidebar';
import { SITE } from './base';
import DocsHtmlClass from './DocsHtmlClass';

export const metadata = {
  title: { default: 'Glyphh Docs', template: '%s | Glyphh Docs' },
  description: 'Glyphh documentation: Ada Cloud, getting started, the API, tuning, data in and out, the plugin, the SDKs and the plans.',
};

export default function DocsLayout({ children }) {
  const nav = GROUPS.map((g) => ({ title: g.title, pages: g.pages.map(({ slug, title, lede }) => ({ slug, title, lede })) }));
  return (
    <div className="dx">
      <DocsHtmlClass />
      <div className="dx-shell">
        <DocsSidebar groups={nav} />
        <main className="dx-main">
          {children}
          <footer className="dx-foot dx-article">
            <span>&copy; Glyphh</span>
            <a href={SITE}>glyphh.ai</a>
            <a href="https://platform.glyphh.ai">Platform</a>
            <a href="https://github.com/glyphh-ai">GitHub</a>
            <a href="mailto:support@glyphh.ai">Support</a>
          </footer>
        </main>
      </div>
    </div>
  );
}
