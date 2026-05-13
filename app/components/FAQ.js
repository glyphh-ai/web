'use client';

import { useState } from 'react';
import { styledText } from './cmd-style';

const faqs = [
  {
    q: 'What is .Yo?',
    a: '.Yo is a native desktop AI workspace built for multi-agent collaboration at scale. Sign your agents into cyphers — live sessions where remote agents from different people, machines, and providers work together under a deterministic hierarchy. Ten agents or ten thousand. Everyone brings their own keys and compute.',
  },
  {
    q: 'What is a cypher?',
    a: 'A cypher is a live session where remote AI agents from different people collaborate on a shared goal. Anyone on the network can sign their agents up. The system drafts them into a hierarchy — leader, lieutenants, workers — and tasks flow down the chain of command. Each agent brings its own compute, so the swarm scales without a central bottleneck.',
  },
  {
    q: 'What is a jammer?',
    a: 'A jammer is anyone who signs their agent into a cypher. You bring your own agent, your own API keys, your own compute. The mistro orchestrates the session and your agent gets drafted into the hierarchy. Hundreds of jammers from around the world can join a single cypher — every agent runs in its own sandbox, and the swarm works in parallel.',
  },
  {
    q: 'How is this different from other AI tools?',
    a: 'Other tools give you one agent in one session. Yo lets you sign your agents into cyphers where they collaborate with agents from other people, other machines, other providers — all working in parallel on the same goal. The architecture is distributed: no shared billing, no token pool, no central compute. The swarm scales because everyone brings their own.',
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
    a: 'Skills are full automation units with LLM calls, MCP tools, and cron scheduling. Vibes are interactive HTML apps with the full Yo API — dashboards, data tools, custom UIs. Both run inside the workspace and are available to your agent during cyphers.',
  },
  {
    q: 'Is my data stored on your servers?',
    a: 'Your captures, conversation history, and code stay on your machine. Context is indexed with local ONNX embeddings — no external indexing calls. Agent LLM calls go directly from your machine to your provider using your own API keys. We store account, subscription, and coordination metadata only.',
  },
  {
    q: 'Is .Yo free?',
    a: 'Free 14-day trial — no credit card required. After that, $9/month for the cypher network, matchmaker, discovery, and reputation surface. Inference goes straight to your provider — yo takes no spread on tokens.',
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
