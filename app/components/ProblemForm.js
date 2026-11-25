'use client';

import { useState } from 'react';
import { EMAIL } from '../lib/site';

/**
 * The two forms, one component: `inquiry` (/work-with-us), a private consulting inquiry, and `problem`
 * (/submit-a-problem), a problem for a possible project or episode, with an explicit choice about whether it may be
 * explored in public. Both post to /api/contact, which emails them. No account, nothing stored on the site.
 */
export default function ProblemForm({ kind }) {
  const [state, setState] = useState({ status: 'idle', message: '' });
  const problem = kind === 'problem';

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState({ status: 'sending', message: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, kind }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Email ${EMAIL} instead.`);
      e.target.reset();
      setState({ status: 'sent', message: problem ? 'Thank you. We read every problem that comes in.' : 'Thank you. We’ll reply by email.' });
    } catch (err) {
      setState({ status: 'error', message: `${err.message} You can always email ${EMAIL}.` });
    }
  }

  return (
    <form className="st-form" onSubmit={onSubmit}>
      <div className="st-two">
        <label>Name<input name="name" required maxLength={120} autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
      </div>
      {!problem ? <label><span>Company <span className="opt">(optional)</span></span><input name="company" maxLength={160} autoComplete="organization" /></label> : null}
      <label>
        {problem ? 'The problem' : 'Describe your problem'}
        <textarea name="message" required minLength={10} maxLength={5000} placeholder={problem ? 'What is the problem, and why is it interesting?' : 'What is in the way? What have you tried?'} />
      </label>
      {!problem ? (
        <>
          <label><span>Desired outcome <span className="opt">(optional)</span></span><textarea name="outcome" maxLength={2000} style={{ minHeight: 90 }} /></label>
          <div className="st-two">
            <label>
              <span>Approximate budget <span className="opt">(optional)</span></span>
              <select name="budget" defaultValue="">
                <option value="">Prefer not to say</option>
                <option>Under $5,000</option>
                <option>$5,000 to $25,000</option>
                <option>$25,000 to $100,000</option>
                <option>Over $100,000</option>
                <option>Not sure yet</option>
              </select>
            </label>
            <label><span>Timeline <span className="opt">(optional)</span></span><input name="timeline" maxLength={160} placeholder="e.g. this quarter" /></label>
          </div>
        </>
      ) : (
        <fieldset>
          <legend>May we explore this in public?</legend>
          <label className="st-radio"><input type="radio" name="consent" value="public" required /> Yes: you may explore it in a video, project or journal entry.</label>
          <label className="st-radio"><input type="radio" name="consent" value="public-anonymous" /> Yes, but never use my name or identifying details.</label>
          <label className="st-radio"><input type="radio" name="consent" value="private" /> No: this is just for you to read.</label>
          <span className="opt" style={{ fontSize: 13 }}>Nothing you send is ever published without this permission. For paid help, use <a className="st-link" href="/work-with-us">Work With Us</a> instead.</span>
        </fieldset>
      )}
      {/* The honeypot: hidden from people, filled in by bots. */}
      <label className="st-hp" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div>
        <button className="st-btn primary" type="submit" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? 'Sending…' : problem ? 'Submit the problem' : 'Send'}
        </button>
      </div>
      {state.message ? <p className={`st-form-status${state.status === 'error' ? ' error' : ''}`} role="status">{state.message}</p> : null}
    </form>
  );
}
