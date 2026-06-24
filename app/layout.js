import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata = {
  metadataBase: new URL('https://glyphh.ai'),
  title: 'Glyphh — A new way to build software and automate your work.',
  description: 'Glyphh is a native desktop AI workspace. An agent builds software in a real IDE, runs every app you use as a live panel, and automates work across all of them — you describe the outcome and it codes, clicks, and ships.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Glyphh — A new way to build software and automate your work.',
    description: 'A native desktop AI workspace. Build in your IDE of choice, automate across every app, and expose Glyphh’s MCP tools to any coding agent.',
    url: 'https://glyphh.ai',
    siteName: 'Glyphh',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glyphh — A new way to build software and automate your work.',
    description: 'A native desktop AI workspace. Build in your IDE of choice, automate across every app, and expose Glyphh’s MCP tools to any coding agent.',
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
