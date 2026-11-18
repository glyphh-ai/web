import './legal.css';
import { FOOTER } from '../public/footer.js';

// The legal pages (app/terms, app/privacy, app/refund), in the look of the games pages: the same header, footer and
// stylesheet (public/games.css). The front page and the games' pages are plain files in public/ and do not pass here.

export const metadata = {
  metadataBase: new URL('https://glyphh.ai'),
  title: 'Glyphh',
  icons: { icon: [{ url: '/glyphh-mascot-square-black.png', type: 'image/png' }] },
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        <link rel="stylesheet" href="/games.css" />
      </head>
      <body>
        <header className="head">
          <div className="head-left">
            <a href="/" aria-label="Glyphh"><img src="/glyphh-logo-black.png" alt="Glyphh" className="logo" /></a>
            <a className="crumb" href="/">Games</a>
          </div>
        </header>
        {children}
        {/* The site's one footer, the same markup the plain pages carry (public/footer.js). */}
        <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: FOOTER }} />      </body>
    </html>
  );
}
