import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata = {
  metadataBase: new URL('https://glyphh.ai'),
  title: 'Glyphh — A new class of desktop agent',
  description: 'Every task needs the right Agents, Workflow and Apps. Glyphh Desktop combines all three into Layouts you switch instantly — built on open research, all of it open source.',
  icons: {
    icon: [{ url: '/glyphh-mascot-square-black.png', type: 'image/png' }],
    shortcut: '/glyphh-mascot-square-black.png',
    apple: '/glyphh-mascot-square-black.png',
  },
  openGraph: {
    title: 'Glyphh — A new class of desktop agent',
    description: 'Every task needs the right Agents, Workflow and Apps. Glyphh Desktop combines all three into Layouts you switch instantly — built on open research at github.com/glyphh-ai.',
    url: 'https://glyphh.ai',
    siteName: 'Glyphh',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glyphh — A new class of desktop agent',
    description: 'Every task needs the right Agents, Workflow and Apps. Glyphh Desktop combines all three into Layouts you switch instantly — built on open research at github.com/glyphh-ai.',
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
