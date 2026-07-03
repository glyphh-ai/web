import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata = {
  metadataBase: new URL('https://glyphh.ai'),
  title: 'Glyphh — Give your AI hands.',
  description: 'Glyphh is the workspace your AI drives. Connect Claude, ChatGPT, or any MCP client to your real desktop — open apps, tile layouts, work across 3,500+ connected services, run skills. Bring your own AI; no token markup.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Glyphh — Give your AI hands.',
    description: 'The workspace your AI drives. One secure MCP relay connects the AI you already use to your apps, windows, layouts, and tools — on Mac and Windows.',
    url: 'https://glyphh.ai',
    siteName: 'Glyphh',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glyphh — Give your AI hands.',
    description: 'The workspace your AI drives. One secure MCP relay connects the AI you already use to your apps, windows, layouts, and tools — on Mac and Windows.',
  },
};

export const viewport = {
  themeColor: '#000000',
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
