'use client';

import { useState, useRef, useEffect } from 'react';

export default function CodeInput({ length = 6, onComplete }) {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  function handleChange(i, e) {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) return;

    const next = [...values];
    next[i] = val[0];
    setValues(next);

    if (i < length - 1) {
      inputs.current[i + 1]?.focus();
    }

    const full = next.join('');
    if (full.length === length && !next.includes('')) {
      onComplete?.(full);
    }
  }

  function handleKeyDown(i, e) {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = [...values];
      if (next[i]) {
        next[i] = '';
        setValues(next);
      } else if (i > 0) {
        next[i - 1] = '';
        setValues(next);
        inputs.current[i - 1]?.focus();
      }
    }
    if (e.key === 'ArrowLeft' && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < length - 1) inputs.current[i + 1]?.focus();
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;

    const next = [...values];
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setValues(next);

    const focusIdx = Math.min(pasted.length, length - 1);
    inputs.current[focusIdx]?.focus();

    if (pasted.length === length) {
      onComplete?.(pasted);
    }
  }

  return (
    <div className="code-input-grid">
      {values.map((val, i) => (
        <input
          key={i}
          ref={el => inputs.current[i] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          className="code-input-box"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}
