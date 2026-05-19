'use client';

import { useState } from 'react';
import { styledText } from './cmd-style';

const faqs = [
  {
    q: 'What is .Yo?',
    a: '.Yo is a native desktop AI workspace built for multi-agent work. Tell the .yo agent a goal and it spins up a swarm — a roster of your own agents that decompose the work, divide it down a deterministic hierarchy, and execute in parallel. All local: your machine, your API keys, your sandbox.',
  },
  {
    q: 'What is a swarm?',
    a: 'A swarm is a team of your agents working one goal together. The first agent leads — it breaks the goal into tasks and assigns them to the rest over an in-process bus. Workers accept, execute, report status, and complete; deep work nests under sub-leaders. It all runs locally and streams inline into your .yo conversation.',
  },
  {
    q: 'How do agents in a swarm run?',
    a: 'Each agent runs from your local Agents library with its own role, model, tools, and guardrails. An agent can run read-only — a one-shot model turn for a take or a debate — or as a full agent loop with file and shell access. The swarm picks the right mix for the goal.',
  },
  {
    q: 'How is this different from other AI tools?',
    a: 'Other tools give you one agent in one session. Yo lets the .yo agent spin up a whole swarm — a leader plus workers that decompose a goal and execute it in parallel, coordinating over a local bus. No server round-trip, no shared token pool: every agent runs on your machine with your keys.',
  },
  {
    q: 'Do I need to bring my own API key?',
    a: 'Yes — yo never holds provider keys. Configure your own keys for Anthropic, OpenAI, Gemini, xAI, Perplexity in Settings. They live encrypted on your machine via the OS keychain. Inference goes straight from yo to the provider — we never see your prompts or responses.',
  },
  {
    q: 'What is MCP and how does it work?',
    a: '.Yo includes a local MCP server that connects to any MCP-compatible tool over stdio, SSE, or streamable HTTP. Your agent gets access to tools from every connected server. The MCP relay bridges your tools to external clients like Claude Code or Cursor.',
  },
  {
    q: 'What are skills and vibes?',
    a: 'Skills are full automation units with LLM calls, MCP tools, and cron scheduling. Vibes are interactive HTML apps with the full Yo API — dashboards, data tools, custom UIs. Both run inside the workspace and are available to your agents.',
  },
  {
    q: 'Is my data stored on your servers?',
    a: 'Your captures, conversation history, and code stay on your machine. Context is indexed with local ONNX embeddings — no external indexing calls. Agent LLM calls go directly from your machine to your provider using your own API keys. We store account, subscription, and coordination metadata only.',
  },
  {
    q: 'Is .Yo free?',
    a: 'Free 14-day trial — no credit card required. After that, $9/month for the full workspace — swarms, MCP, skills, and vibes. Inference goes straight to your provider — yo takes no spread on tokens.',
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
