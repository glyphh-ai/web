'use client';

import { useState } from 'react';
import { styledText } from './cmd-style';

const faqs = [
  {
    q: 'What is Glyphh Desktop?',
    a: 'A desktop application for Mac, Windows, and Linux. It is the harness: chat, work, and code run on your machine, driven by whichever loop you pick, with your apps, files, skills, and connections beside them. It is vendor-agnostic, so the harness stays the same when the model changes.',
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
    q: 'Which models can I use?',
    a: 'Every model Glyphh runs, on every plan: frontier models like Claude, GPT and Gemini, and open-weight models like Kimi, Llama, Qwen and Mistral. An auto-router can pick per request, frontier where it counts and open weights for the rest. Each model has a published rate on each plan, and the bigger the plan, the better the rate.',
  },
  {
    q: 'How does the budget work?',
    a: 'Every plan includes a monthly budget in dollars, equal to its price: Solo’s $20 buys $20 of usage, and $40 a seat buys $40 a seat. Model calls and connector tools are paid from it at your plan’s published rates, metered on the tokens they send and return. Free is $0 and includes $1 a month for connector tools; it runs your own CLI and connected services, and Glyphh models start with Solo. Add funds any time, dollar for dollar; purchased funds never expire, and every charge is itemized in your usage feed.',
  },
  {
    q: 'What are connected services?',
    a: 'Glyphh Connect: 3,500+ services linked once and exposed as tools. Gmail, Slack, Drive, Notion, Salesforce, GitHub, and the rest. Connect an account and any loop can act on it. An admin can share a connection with the whole organization, or each person connects their own.',
  },
  {
    q: 'Is my data safe? Who approves what?',
    a: 'Anything risky — sending, deleting, spending — stops on an approval card until you say go. Org admins set the rules once: which models are allowed, which tools each team can touch, and budgets that stop at the line.',
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
