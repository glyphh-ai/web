import { NextResponse } from 'next/server';

// POST /api/contact: the site's two forms, emailed to support@glyphh.ai through Resend
// (https://resend.com/docs/api-reference/emails/send-email), the visitor's address as the reply-to so answering is
// one click. `kind` says which form: `inquiry` (/work-with-me, a private consulting inquiry) or `problem`
// (/submit-a-problem, a problem for a possible project or episode, with the sender's choice about public use).
// Needs the RESEND_API_KEY secret and a glyphh.ai sending domain verified in Resend; CONTACT_TO and CONTACT_FROM
// override where it goes and who it is from. Without the key it answers 503, and the form points the visitor to the
// address instead. Nothing is stored on the site.

const TO = process.env.CONTACT_TO || 'support@glyphh.ai';
const FROM = process.env.CONTACT_FROM || 'Glyphh <contact@glyphh.ai>';
const EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;
const CONSENT = {
  public: 'May be explored in public',
  'public-anonymous': 'May be explored in public, without the sender’s name or identifying details',
  private: 'PRIVATE: not to be explored or published',
};

// At most 5 messages a client address per 10 minutes, per instance.
const WINDOW_MS = 10 * 60 * 1000;
const PER_WINDOW = 5;
const seen = new Map();

function limited(ip) {
  const now = Date.now();
  const recent = (seen.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  seen.set(ip, recent);
  if (seen.size > 5000) for (const [k, v] of seen) if (now - v[v.length - 1] > WINDOW_MS) seen.delete(k);
  return recent.length > PER_WINDOW;
}

const clean = (v, max) => (typeof v === 'string' ? v.replace(/\r/g, '').trim().slice(0, max) : '');
const oneLine = (s) => s.replace(/\s+/g, ' ');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Send the form as JSON.' }, { status: 400 });
  if (clean(body.website, 200)) return NextResponse.json({ ok: true }); // the honeypot: a bot, dropped quietly

  const kind = body.kind === 'problem' ? 'problem' : 'inquiry';
  const name = oneLine(clean(body.name, 120));
  const email = oneLine(clean(body.email, 200));
  const message = clean(body.message, 5000);
  if (!name || !EMAIL.test(email) || message.length < 10) {
    return NextResponse.json({ error: 'Please give your name, a valid email and a description of at least 10 characters.' }, { status: 422 });
  }
  const consent = CONSENT[body.consent];
  if (kind === 'problem' && !consent) {
    return NextResponse.json({ error: 'Please say whether the problem may be explored in public.' }, { status: 422 });
  }
  const fields =
    kind === 'problem'
      ? [['Public use', consent]]
      : [
          ['Company', oneLine(clean(body.company, 160))],
          ['Desired outcome', clean(body.outcome, 2000)],
          ['Budget', oneLine(clean(body.budget, 80))],
          ['Timeline', oneLine(clean(body.timeline, 160))],
        ].filter(([, v]) => v);

  const ip = (request.headers.get('fly-client-ip') || request.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  if (limited(ip || 'unknown')) {
    return NextResponse.json({ error: 'Too many messages from here. Please try again in a few minutes.' }, { status: 429 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: 'The form is not taking messages right now.' }, { status: 503 });

  const label = kind === 'problem' ? 'Problem submitted' : 'Consulting inquiry';
  const page = kind === 'problem' ? 'glyphh.ai/submit-a-problem' : 'glyphh.ai/work-with-me';
  const meta = fields.map(([k, v]) => `${k}: ${v}`).join('\n');
  const text = `${message}\n\n${meta ? `${meta}\n\n` : ''}—\n${name} <${email}>\n${label}, sent from ${page}`;
  const html =
    `<p style="white-space:pre-wrap">${esc(message)}</p>` +
    (fields.length ? `<p>${fields.map(([k, v]) => `<strong>${esc(k)}:</strong> <span style="white-space:pre-wrap">${esc(v)}</span>`).join('<br>')}</p>` : '') +
    `<hr><p>${esc(name)} &lt;${esc(email)}&gt;<br>${esc(label)}, sent from ${esc(page)}</p>`;
  const subject = kind === 'problem' ? `[Problem${body.consent === 'private' ? ' · private' : ''}] ${name}` : `[Inquiry] ${name}`;

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject, text, html }),
  }).catch(() => null);
  if (!sent || !sent.ok) {
    console.error('contact: Resend refused the message', sent && sent.status, sent && (await sent.text().catch(() => '')));
    return NextResponse.json({ error: 'The message could not be sent.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
