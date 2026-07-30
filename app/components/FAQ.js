'use client';

import { useState } from 'react';
import { styledText } from './cmd-style';

const faqs = [
  {
    q: 'What is Glyphh Desktop?',
    a: 'A new class of desktop agent for Mac and Windows. Every task needs the right agents, workflow, and apps — Glyphh Desktop combines all three into Layouts you switch instantly. Your agents do real work — a deck, a brief, a batch of replies, shipped code — in the apps open beside them, on models you choose.',
  },
  {
    q: 'What are loops?',
    a: 'How your agents run a job: roles in a circuit — a planner, an architect, workers — each role a model slot you fill with a frontier or open-weight model. Loops come built in, you can create your own, and you can see exactly who did what.',
  },
  {
    q: 'What is a Layout?',
    a: 'A job’s whole setup, saved: which apps are on screen and how they’re arranged, which loop loads, which models fill its slots, and which connections your agents can use. Switch Layouts and all of it switches at once.',
  },
  {
    q: 'What can it actually do?',
    a: 'Anything that spans the tools you already use: read a Drive folder and build slides, digest your inbox and Slack every morning, update a sheet from Stripe, draft replies for your approval, build and publish a live app. One-off or on a schedule.',
  },
  {
    q: 'What is ghost mode?',
    a: 'Hit ⌘⇧G in any app — a Meet, Slack, your browser — and your agent overlays it with full context and your work ready to pull up. Esc puts you right back where you were.',
  },
  {
    q: 'Which models can I use?',
    a: 'Frontier models like Fable, GPT, and Gemini — and a growing index of open-weight models like Llama, Qwen, and Mistral. All in one picker, all on one subscription. And you can bring your own keys: any provider that speaks the OpenAI API plugs in, billed by your provider, never marked up — we only ever charge for compute on our infrastructure.',
  },
  {
    q: 'What is a credit?',
    a: 'The one currency for everything Glyphh does — model calls, tools, compute. Every plan includes a monthly allowance, open-weight models cost a fraction of frontier ones, and every charge is itemized in your usage feed.',
  },
  {
    q: 'What are connected services?',
    a: 'Your tools, linked once: Gmail, Slack, Drive, Notion, Salesforce — 3,500+ services. Connect an account and the agent can act on it: send the message, file the ticket, build the doc. Teams share org connections; members can add their own.',
  },
  {
    q: 'Is my data safe? Who approves what?',
    a: 'Anything risky — sending, deleting, spending — stops on an approval card until you say go. Org admins set the rules once at the gateway: which models are allowed, which tools each team can touch, and budgets that stop at the line.',
  },
  {
    q: 'Does it work for teams?',
    a: 'Yes — that is the point. Share connections, skills, and agents across your org, govern them by role, and see usage per member and per model. Enterprise plans add SSO and provisioned pricing.',
  },
  {
    q: 'What platforms does it support?',
    a: 'Mac (macOS 12+, Apple Silicon and Intel) and Windows (10+). Free to download — no card required.',
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
