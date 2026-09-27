import './globals.css';
import { Geist, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

// Homepage metadata — title carries the pitch; the description is the full
// hero subline, verbatim.
const HOME_TITLE = "Glyphh — the operating system for frontier AI";
const HOME_DESCRIPTION = "Productivity doesn't come from prompting. It comes from using blended AI models to build predictable semantic applications that run on your data deterministically — validated, distributed, and governed by your teams at scale.";

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

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${geist.variable} ${jetbrains.variable}`}>
      <head>
        {/* The theme, before first paint: the saved choice, else the OS preference (his order, 2026-09-22). */}
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
      <body>{children}</body>
    </html>
  );
}
