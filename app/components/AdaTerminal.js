'use client';

import { useEffect, useRef, useState } from 'react';
import { SCRIPT, SDK_METHODS } from './adaTerminalScript';

/**
 * AdaTerminal: the picture beside "Ada speaks in math" (his order, 2026-10-02).
 * A command line where someone types the SDK's calls and the math answers:
 * bind, bundle and cosine down the input, then a query and its fact tree. Each
 * command is typed at a person's uneven pace, its output prints, and the
 * session starts over. It begins when it scrolls into view. Decorative.
 */
const METHOD = new RegExp(`\\b(${SDK_METHODS.join('|')})\\b`, 'g');
const HOLD_AT_END = 5200;
const BEFORE_ENTER = 320;
const OUTPUT_LINE = 110;
const BETWEEN_COMMANDS = 620;

// A person's keystroke: quick inside a word, slower after punctuation, with the odd hesitation.
const keystroke = (typed) => {
  const base = 26 + Math.random() * 46;
  const afterBreak = /[\s(){}\[\],=.]$/.test(typed) ? 30 + Math.random() * 70 : 0;
  const hesitation = Math.random() < 0.05 ? 180 + Math.random() * 200 : 0;
  return base + afterBreak + hesitation;
};

const highlighted = (text) =>
  text.split(METHOD).map((part, i) => (SDK_METHODS.includes(part) ? <b key={i}>{part}</b> : part));

const wholeSession = () => SCRIPT.flatMap(({ run, out = [] }) => [{ kind: 'in', text: run }, ...out.map((text) => ({ kind: 'out', text }))]);

export default function AdaTerminal() {
  const host = useRef(null);
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLines(wholeSession());
      return undefined;
    }
    let timer = 0;
    let stopped = false;
    const wait = (ms) => new Promise((resolve) => { timer = window.setTimeout(resolve, ms); });

    const session = async () => {
      while (!stopped) {
        setLines([]);
        for (const { run, out = [] } of SCRIPT) {
          for (let n = 1; n <= run.length && !stopped; n++) {
            setTyping(run.slice(0, n));
            await wait(keystroke(run.slice(0, n)));
          }
          await wait(BEFORE_ENTER);
          if (stopped) return;
          setTyping('');
          setLines((was) => [...was, { kind: 'in', text: run }]);
          for (const text of out) {
            await wait(OUTPUT_LINE);
            if (stopped) return;
            setLines((was) => [...was, { kind: 'out', text }]);
          }
          await wait(BETWEEN_COMMANDS);
        }
        await wait(HOLD_AT_END);
      }
    };

    const seen = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      seen.disconnect();
      void session();
    }, { threshold: 0.35 });
    seen.observe(host.current);
    return () => {
      stopped = true;
      seen.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="ada-term" aria-hidden="true" ref={host}>
      <div className="ada-term-bar"><i /><i /><i /><span>ada</span></div>
      <div className="ada-term-body">
        <div className="ada-term-scroll">
          {lines.map((line, i) => (
            <div key={i} className={`ada-term-line ada-term-${line.kind}`}>
              {line.kind === 'in' && <span className="ada-term-prompt">&gt;</span>}
              <span>{line.kind === 'in' ? highlighted(line.text) : line.text}</span>
            </div>
          ))}
          <div className="ada-term-line ada-term-in">
            <span className="ada-term-prompt">&gt;</span>
            <span>{highlighted(typing)}<span className="ada-term-caret" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
