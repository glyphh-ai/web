import { NextResponse } from 'next/server';

// POST /api/contact: the /contact form, emailed to support@glyphh.ai through
// Resend (https://resend.com/docs/api-reference/emails/send-email), the
// visitor's address as the reply-to so answering is one click. Needs the
// RESEND_API_KEY secret and a glyphh.ai sending domain verified in Resend;
// CONTACT_TO and CONTACT_FROM override where it goes and who it is from.
// Without the key it answers 503, and the form points the visitor to the
// address instead.

const TO = process.env.CONTACT_TO || 'support@glyphh.ai';
const FROM = process.env.CONTACT_FROM || 'Glyphh contact form <contact@glyphh.ai>';
const TOPICS = new Set(['Sales', 'Support', 'Partnership', 'Press', 'Other']);
const EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

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

  const name = oneLine(clean(body.name, 120));
  const email = oneLine(clean(body.email, 200));
  const company = oneLine(clean(body.company, 160));
  const topic = TOPICS.has(body.topic) ? body.topic : 'Other';
  const message = clean(body.message, 5000);
  if (!name || !EMAIL.test(email) || message.length < 10) {
    return NextResponse.json({ error: 'Please give your name, a valid email and a message of at least 10 characters.' }, { status: 422 });
  }

  const ip = (request.headers.get('fly-client-ip') || request.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  if (limited(ip || 'unknown')) {
    return NextResponse.json({ error: 'Too many messages from here. Please try again in a few minutes.' }, { status: 429 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: 'The form is not taking messages right now.' }, { status: 503 });

  const who = company ? `${name} (${company})` : name;
  const text = `${message}\n\n—\n${who} <${email}>\nTopic: ${topic}\nSent from glyphh.ai/contact`;
  const html =
    `<p style="white-space:pre-wrap">${esc(message)}</p><hr>` +
    `<p>${esc(who)} &lt;${esc(email)}&gt;<br>Topic: ${esc(topic)}<br>Sent from glyphh.ai/contact</p>`;

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject: `[Contact · ${topic}] ${who}`, text, html }),
  }).catch(() => null);
  if (!sent || !sent.ok) {
    console.error('contact: Resend refused the message', sent && sent.status, sent && (await sent.text().catch(() => '')));
    return NextResponse.json({ error: 'The message could not be sent.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
