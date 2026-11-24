'use client';

import { useState } from 'react';

// One line to type into Claude, with a button that copies it.
export default function CopyLine({ text, label }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // no clipboard here: the line is still on the page to select
    }
  };
  return (
    <div className="mp-cmd">
      <code>{text}</code>
      <button type="button" onClick={copy} aria-label={label || `Copy ${text}`}>
        <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}
