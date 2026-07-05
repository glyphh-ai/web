'use client';

import { useState } from 'react';
import { styledText } from './cmd-style';

const faqs = [
  {
    q: 'What is Glyphh?',
    a: 'Glyphh is a native desktop workspace that the AI you already use can drive. Connect Claude, ChatGPT, Gemini, or any MCP client to your Glyphh endpoint and it can open your apps, tile your windows into layouts, work across 3,500+ connected services, and run your skills — on your real desktop, while you watch.',
  },
  {
    q: 'Which AI can drive it?',
    a: 'Any MCP-compatible client: Claude (Desktop, Code, claude.ai), ChatGPT, Gemini, Cursor, Windsurf, and more. You connect them to your Glyphh endpoint with a one-time approval — OAuth for clients that support it, or a revocable access token for the rest.',
  },
  {
    q: 'Do you resell AI models or mark up tokens?',
    a: 'No — never. You bring the AI subscription you already pay for, and your prompts go straight to your provider. Glyphh meters only the compute it does on your behalf: opening apps, driving windows, calling tools.',
  },
  {
    q: 'What is a credit?',
    a: '1 credit = 30 seconds of tool compute, rounded up, with a 1-credit minimum per call — the same way our infrastructure costs are metered. Browsing and listing your apps and tools is always free. Every charge is itemized per tool call in your usage feed, with the exact operation and duration.',
  },
  {
    q: 'What can it actually do on my desktop?',
    a: 'Open apps and web apps in native windows, tile every window on screen into saved layouts (real OS window control on Mac and Windows), click, type, read, and screenshot inside app panels, run installed Glyphh apps’ tools, and execute your skills. You can do all of the same from the built-in command palette.',
  },
  {
    q: 'What are connected services?',
    a: 'OAuth connections to 3,500+ apps — Gmail, Slack, Notion, GitHub, Salesforce and more. Connect an account once and it becomes a set of tools your AI can call: send the message, file the ticket, update the record. Available on paid plans.',
  },
  {
    q: 'What are skills?',
    a: 'Repeatable workflows saved as code in your org’s library. Your AI (or you, from the palette) runs them on demand and they execute deterministically — the same way every time. Exportable, shareable, and versioned.',
  },
  {
    q: 'Is my data safe?',
    a: 'Your AI conversations never pass through Glyphh — they stay between you and your provider. Relayed tool requests are screened by an injection firewall before they reach your machine, access tokens are revocable per client, and there’s a local-only server mode if you want no cloud in the loop at all. Provider keys you store with us are encrypted at rest.',
  },
  {
    q: 'Is Glyphh free?',
    a: 'Yes — free forever, no card. The full workspace, the command palette, layouts, native window control, and your own AI connected over the relay, with 15 compute credits a month included. Paid plans ($20/$50/$200) add monthly credit allowances of 1,000/2,000/10,000 plus connected services and cloud sync.',
  },
  {
    q: 'What platforms does Glyphh support?',
    a: 'Mac (macOS 12+ on Apple Silicon and Intel) and Windows (10+). Download links are on the homepage.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <h2 className="section-title reveal">Frequently asked questions</h2>
        <div className="faq-list reveal">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq-item${open === i ? ' faq-item-open' : ''}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="faq-q">
                <span>{styledText(item.q)}</span>
                <span className="faq-icon">{open === i ? '−' : '+'}</span>
              </div>
              {open === i && <div className="faq-a">{styledText(item.a)}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
