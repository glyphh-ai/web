'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'What is .Yo?',
    a: '.Yo is a desktop workspace that lets you use every AI tool — ChatGPT, Claude, Gemini, Grok, Perplexity — in one window with shared context. Navigate between them, capture content, run commands, and let the built-in agent automate workflows across all your panels.',
  },
  {
    q: 'How is this different from just using browser tabs?',
    a: '.Yo gives you a command layer on top of every app. Capture content from one AI with .sup, switch panels with .dip, and inject it into another with .yo — all without copy-pasting. The agent can navigate, click, and extract across panels for you. Layouts, skills, and vibes let you build repeatable workflows.',
  },
  {
    q: 'Do I need to bring my own API key?',
    a: 'Yes — for the .yo agent and inline processing (.yo . and .sup . commands), you provide your own LLM API key (Anthropic, OpenAI, Google, xAI, DeepSeek, or a custom endpoint). The web apps themselves (ChatGPT, Claude, etc.) use your existing accounts.',
  },
  {
    q: 'What apps are supported?',
    a: '.Yo ships with 10 pre-configured apps including ChatGPT, Claude, Gemini, Gmail, Slack, GitHub, and more. Each has mapped commands (grab, compose, search, etc.) that the agent and .waz can use. You can also add any web app.',
  },
  {
    q: 'What are skills, layouts, and vibes?',
    a: 'Skills are saved prompt templates — run them on captured content with .sup . summarize. Layouts are saved panel arrangements — restore a 3-panel workspace with one command. Vibes are recorded interaction sequences — automate multi-step workflows across apps.',
  },
  {
    q: 'Is my data stored on your servers?',
    a: 'Your captures, notes, and conversation history are stored locally on your machine. The .yo agent calls your LLM provider directly with your API key. We store account and billing info on our servers — nothing else.',
  },
  {
    q: 'Is .Yo free?',
    a: 'The Free plan gives you 10 apps, 5 skills, and 5 layouts with all commands — no credit card required. Upgrade to Basic ($8/seat/month) for unlimited everything, or Advanced ($24/seat/month) for MCP servers, cloud sync, and voice.',
  },
  {
    q: 'Does .Yo work on Windows?',
    a: 'Not yet — macOS only for now (12+ on Apple Silicon and Intel). Windows support is coming soon.',
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
                <span>{item.q}</span>
                <span className="faq-icon">{open === i ? '−' : '+'}</span>
              </div>
              {open === i && <div className="faq-a">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
