import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata = {
  metadataBase: new URL('https://glyphh.ai'),
  title: 'Glyphh — AI Research & Development',
  description: 'Glyphh is an AI research and development company working on vector-symbolic architectures, hyperdimensional computing, memory systems, and agentic runtimes. Everything we build is open source.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Glyphh — AI Research & Development',
    description: 'Research at the frontier: vector-symbolic architectures, hyperdimensional computing, memory systems, and agentic runtimes — all open source at github.com/glyphh-ai.',
    url: 'https://glyphh.ai',
    siteName: 'Glyphh',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glyphh — AI Research & Development',
    description: 'Research at the frontier: vector-symbolic architectures, hyperdimensional computing, memory systems, and agentic runtimes — all open source at github.com/glyphh-ai.',
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
