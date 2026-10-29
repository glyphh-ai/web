'use client';

import { useState } from 'react';

// The contact form: name, email, company (optional), topic and message, sent to
// /api/contact. `website` is a honeypot: hidden from people, filled by bots,
// and the route drops any message that has it.

const TOPICS = ['Sales', 'Support', 'Partnership', 'Press', 'Other'];

export default function ContactForm() {
  const [state, setState] = useState({ status: 'idle', error: '' });

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    setState({ status: 'sending', error: '' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const answer = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(answer.error || 'The message could not be sent.');
      form.reset();
      setState({ status: 'sent', error: '' });
    } catch (e) {
      setState({ status: 'error', error: e.message });
    }
  }

  if (state.status === 'sent') {
    return (
      <div className="ct-sent" role="status">
        <h2 className="ix-h2">Thanks, it&apos;s on its way.</h2>
        <p className="ix-desc">We&apos;ll answer at the email you gave, usually within one business day.</p>
        <button type="button" className="os-cta os-cta-ghost" onClick={() => setState({ status: 'idle', error: '' })}>
          Send another
        </button>
      </div>
    );
  }

  const sending = state.status === 'sending';
  return (
    <form className="ct-form" onSubmit={onSubmit} noValidate={false}>
      <div className="ct-row">
        <label className="ct-field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
        <label className="ct-field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
      </div>
      <div className="ct-row">
        <label className="ct-field">
          <span>Company <em>optional</em></span>
          <input name="company" type="text" autoComplete="organization" maxLength={160} />
        </label>
        <label className="ct-field">
          <span>Topic</span>
          <select name="topic" defaultValue="Sales">
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="ct-field">
        <span>Message</span>
        <textarea name="message" rows={7} required minLength={10} maxLength={5000} />
      </label>
      <label className="ct-trap" aria-hidden="true">
        Website <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      {state.status === 'error' && (
        <p className="ct-error" role="alert">
          {state.error} You can also write to <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.
        </p>
      )}
      <div className="ct-actions">
        <button type="submit" className="os-cta os-cta-primary" disabled={sending}>
          {sending ? 'Sending…' : 'Send message'}
        </button>
        <span className="ct-fine">We use your details only to answer you (<a href="/privacy">Privacy Policy</a>).</span>
      </div>
    </form>
  );
}
