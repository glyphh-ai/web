'use client';

import { useState } from 'react';
import { styledText } from './cmd-style';

const faqs = [
  {
    q: 'What is .Yo?',
    a: '.Yo is a native desktop AI workspace that connects every AI and app you use — ChatGPT, Claude, Gemini, Grok, Perplexity, plus 3,500+ apps via MCP and Pipedream — in one window with shared context. A built-in multi-agent system navigates panels, runs skills, builds vibes, and automates workflows across all of them.',
  },
  {
    q: 'How is this different from just using browser tabs?',
    a: '.Yo gives you a command layer, agent system, and local MCP server on top of every app. Context is captured automatically with local vector embeddings — no copy-pasting. The agent navigates, clicks, and extracts across panels. Skills automate repeatable workflows. Vibes let you build interactive tools. MCP relay exposes your tools to other clients.',
  },
  {
    q: 'What is MCP and how does it work?',
    a: '.Yo includes a local MCP server that connects to any MCP-compatible tool over stdio, SSE, or streamable HTTP. Your agent gets access to tools from every connected server. The MCP relay bridges your tools to external clients like Claude Code or Cursor, so they can use your Yo tools directly.',
  },
  {
    q: 'Do I need to bring my own API key?',
    a: 'No API key needed. The .yo agent runs on Claude via yos credits — buy a pack and your agent draws from your balance with each call. The web apps (ChatGPT, Claude, etc.) still use your existing accounts as usual.',
  },
  {
    q: 'What apps are supported?',
    a: '.Yo ships with 100+ pre-configured native apps including ChatGPT, Claude, Gemini, Gmail, Slack, GitHub, and more. With MCP servers and Pipedream connectors, you get access to 3,500+ apps. You can also add any URL as a panel.',
  },
  {
    q: 'What are skills?',
    a: 'Skills are full automation units — not just templates. A skill can be a prompt that the LLM processes, or a JavaScript runner with lifecycle hooks that calls LLMs, invokes MCP tools, chains sub-skills, runs on a cron schedule, prompts the user for input, and reads/writes files. Export and share them as ZIP files.',
  },
  {
    q: 'What are vibes?',
    a: 'Vibes are interactive HTML apps that run inside Yo with full access to the platform. They can run skills, search your captures, read files, store data, and render charts. Build dashboards, data tools, custom UIs — anything you can build in HTML/JS, with the full Yo API behind it.',
  },
  {
    q: 'What are Dev Spaces?',
    a: 'Dev Spaces are multi-agent workspaces you launch with .code. Type .code ui, server, web to spin up three coordinated agents in one command. Each agent gets its own inbox and shares a live event log so teammates stay in sync — without you brokering every message. Use .dip code <name> to drop into any running workspace.',
  },
  {
    q: 'Is my data stored on your servers?',
    a: 'Your captures, notes, and conversation history are stored locally on your machine. Context is indexed with local ONNX embeddings — no external indexing calls. Agent LLM calls are routed through the yosup platform to Claude; message content is not stored on our servers. We store account and billing info only.',
  },
  {
    q: 'Is .Yo free?',
    a: 'The Free plan gives you 10 apps, 5 skills, 5 layouts, a built-in terminal, and all commands — no credit card required. Basic ($8/seat/month) adds unlimited everything plus vibes. Advanced ($24/seat/month) adds MCP servers, MCP relay, Pipedream connectors, cloud sync, and voice.',
  },
  {
    q: 'What platforms does .Yo support?',
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
