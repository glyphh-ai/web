import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata = {
  title: '.Yo — Multi-Agent Swarm Workspace',
  description: 'Tell the .yo agent a goal and it spins up a swarm — a team of your own agents that decompose the work and execute in parallel. All local: your machine, your keys, your sandbox.',
  icons: {
    icon: '/favicon.svg',
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
