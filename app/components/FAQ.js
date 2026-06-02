'use client';

import { useState } from 'react';
import { styledText } from './cmd-style';

const faqs = [
  {
    q: 'What is Glyphh?',
    a: 'Glyphh is a native desktop AI workspace that connects every AI and app you use — ChatGPT, Claude, Gemini, Grok, Perplexity, plus 3,500+ apps via MCP and Pipedream — in one window with shared context. A built-in agent navigates panels, runs skills, builds vibes, and can spin up a swarm of agents to automate work across all of them.',
  },
  {
    q: 'How is this different from just using browser tabs?',
    a: 'Glyphh gives you a command layer, agent system, and local MCP server on top of every app. Context is captured automatically with local vector embeddings — no copy-pasting. The agent navigates, clicks, and extracts across panels. Skills automate repeatable workflows. Vibes let you build interactive tools. MCP relay exposes your tools to other clients.',
  },
  {
    q: 'How does context follow me?',
    a: 'Every panel you open is captured in the background and indexed with local vector embeddings. When you .yo, the agent already has the context from everything you have been doing — across apps, across panels. .dip to a new panel and it travels with you. No copy-paste, no re-explaining, no session to manage.',
  },
  {
    q: 'What is MCP and how does it work?',
    a: 'Glyphh includes a local MCP server that connects to any MCP-compatible tool over stdio, SSE, or streamable HTTP. Your agent gets access to tools from every connected server. The MCP relay bridges your tools to external clients like Claude Code or Cursor, so they can use your Yo tools directly.',
  },
  {
    q: 'Do I need to bring my own API key?',
    a: 'Yes — yo never holds provider keys. Configure your own keys for Anthropic, OpenAI, Gemini, xAI, Perplexity in Settings → Providers. They live encrypted on your machine via the OS keychain. Inference goes straight from yo to the provider; we never see your prompts. The agent loop runs on your existing Claude Code subscription, so if you have one, that path is already covered.',
  },
  {
    q: 'What apps are supported?',
    a: 'Glyphh ships with 100+ pre-configured native apps including ChatGPT, Claude, Gemini, Gmail, Slack, GitHub, and more. With MCP servers and Pipedream connectors, you get access to 3,500+ apps. You can also add any URL as a panel.',
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
    q: 'What is a swarm?',
    a: 'When one agent is not enough, the .yo agent can spin up a swarm — a roster of your own agents that split a goal, work it in parallel, and report back. A leader decomposes the goal and assigns tasks over a local bus; the rest execute. It all runs on your machine and streams inline into your conversation.',
  },
  {
    q: 'Is my data stored on your servers?',
    a: 'Your captures, notes, and conversation history are stored locally on your machine. Context is indexed with local ONNX embeddings — no external indexing calls. Agent LLM calls go directly from your machine to your provider (Anthropic, OpenAI, etc.) using your own API keys; yo never sees prompts or responses. We store account and subscription metadata only.',
  },
  {
    q: 'Is Glyphh free?',
    a: 'Free 14-day trial — no credit card required. After that, $9/month for the full workspace — agent, swarms, MCP, skills, and vibes. Inference is the only other cost and it goes straight to your provider — yo takes no spread on tokens.',
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
