import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

// Homepage metadata — title carries the pitch; the description is the full
// hero subline, verbatim.
const HOME_TITLE = 'Glyphh — the open desktop client for frontier AI';
const HOME_DESCRIPTION = "Glyphh is the vendor-neutral interface for Claude, ChatGPT, Gemini, and open-source models. Work with every top-tier AI provider through a single, consistent desktop app.";

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
  themeColor: '#1a1a1c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
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
