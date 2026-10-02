import './docs.css';
import { GROUPS } from './content';
import DocsSidebar from './DocsSidebar';
import DocsHtmlClass from './DocsHtmlClass';

export const metadata = {
  title: { default: 'Glyphh Docs', template: '%s | Glyphh Docs' },
  description: 'Glyphh documentation: Ada, Glyphh Desktop, the Model Router and Connect.',
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
            <a href="/">glyphh.ai</a>
            <a href="https://platform.glyphh.ai">Console</a>
            <a href="https://github.com/glyphh-ai">GitHub</a>
            <a href="mailto:support@glyphh.ai">Support</a>
          </footer>
        </main>
      </div>
    </div>
  );
}
