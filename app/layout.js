import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

// Homepage metadata — title carries the pitch; the description is the full
// hero subline, verbatim.
const HOME_TITLE = 'Glyphh — This isn’t three products. It’s one workspace.';
const HOME_DESCRIPTION =
  'It connects to the 3,500+ apps you use every day — Gmail, Slack, Salesforce. And where every other AI is isolated, here Claude, ChatGPT, and open models all work from the same thread. You pick who does what: PowerPoints from Claude, images from GPT, grunt work from Mistral. You never start over.';

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
