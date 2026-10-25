import './globals.css';
import { Geist, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import AdPixels from './components/AdPixels';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

// Homepage metadata — title carries the pitch; the description is the full
// hero subline, verbatim (app/lib/home-meta.js, shared with the home page).
import { HOME_TITLE, HOME_DESCRIPTION } from './lib/home-meta';

export const metadata = {
  metadataBase: new URL('https://glyphh.ai'),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  icons: {
    icon: [{ url: '/glyphh-mascot-square-black.png', type: 'image/png' }],
    shortcut: '/glyphh-mascot-square-black.png',
    apple: '/glyphh-mascot-square-black.png',
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: 'https://glyphh.ai',
    siteName: 'Glyphh',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

// What search engines read about Glyphh (schema.org): the company, and Ada
// with its plans (server docs/pricing.md). Only what exists.
const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://glyphh.ai/#org',
      name: 'Glyphh AI LLC',
      url: 'https://glyphh.ai',
      logo: 'https://glyphh.ai/glyphh-logo-text-white.png',
      email: 'support@glyphh.ai',
      sameAs: ['https://github.com/glyphh-ai', 'https://www.youtube.com/@glyphhai'],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Glyphh Ada',
      url: 'https://glyphh.ai/',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web (cloud API)',
      description: HOME_DESCRIPTION,
      publisher: { '@id': 'https://glyphh.ai/#org' },
      offers: [
        { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD', description: '1,000 precedents, 5,000 reads a month.' },
        { '@type': 'Offer', name: 'Basic', price: '20', priceCurrency: 'USD', description: 'A month: 10,000 precedents, 50,000 reads a month.' },
        { '@type': 'Offer', name: 'Pro', price: '99', priceCurrency: 'USD', description: 'A month: 100,000 precedents, 1,000,000 reads a month.' },
        { '@type': 'Offer', name: 'Team', price: '299', priceCurrency: 'USD', description: 'A month: 1,000,000 precedents, 5,000,000 reads a month.' },
      ],
    },
  ],
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${geist.variable} ${jetbrains.variable}`}>
      <head>
        {/* The theme, before first paint: the saved choice, else DARK — never the OS preference (his order, 2026-09-29: "the web and the server should default to the dark theme 100% of the time"). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{var t=localStorage.getItem('glyphh-theme');if(t!=='light'&&t!=='dark'){t='dark'}document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
        {/* Sentient italic — the emphasis face — from Fontshare. Geist (display + body) loads via next/font. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=sentient@400i&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YZ78CLMRWY"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YZ78CLMRWY');
          `}
        </Script>
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
        {children}
        <AdPixels />
      </body>
    </html>
  );
}
