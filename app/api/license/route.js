// A mod's licence, for the install that bought it. The mod opens the mod's
// Stripe Payment Link with ?client_reference_id=<its install id>, then asks
// here until the purchase shows up. Stripe is the record: the link's
// completed checkouts are read back and the one carrying this install id,
// paid, earns a licence signed with Ed25519. The mod checks that signature
// with the public key built into it and never asks again.
//
// LICENCE_PAYMENT_LINKS maps each mod to its link: "workspaces:plink_…,…".
import { createPrivateKey, sign } from 'node:crypto';

export const dynamic = 'force-dynamic';

const INSTALL = /^[A-Za-z0-9_-]{16,64}$/;
const MOD = /^[a-z0-9-]{1,40}$/;

function links() {
  return Object.fromEntries(
    (process.env.LICENCE_PAYMENT_LINKS || '')
      .split(',')
      .map((pair) => pair.trim().split(':'))
      .filter((pair) => pair.length === 2 && pair[0] && pair[1]),
  );
}

const b64url = (buf) => Buffer.from(buf).toString('base64url');

// The paid checkout of this link that carries this install id, if any.
// Newest first; a hundred covers the minutes a mod waits after Buy.
async function paidCheckout(link, install) {
  const url = new URL('https://api.stripe.com/v1/checkout/sessions');
  url.searchParams.set('payment_link', link);
  url.searchParams.set('status', 'complete');
  url.searchParams.set('limit', '100');
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`stripe ${res.status}`);
  const { data } = await res.json();
  return data.find((s) => s.client_reference_id === install && s.payment_status === 'paid') ?? null;
}

function licence(mod, install, session) {
  const payload = { v: 1, mod, install, session, issued: new Date().toISOString() };
  const body = b64url(JSON.stringify(payload));
  const key = createPrivateKey({ key: Buffer.from(process.env.LICENCE_PRIVATE_KEY, 'base64'), format: 'der', type: 'pkcs8' });
  return `${body}.${b64url(sign(null, Buffer.from(body), key))}`;
}

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const mod = params.get('mod') || '';
  const install = params.get('install') || '';
  const link = MOD.test(mod) ? links()[mod] : undefined;
  if (!link || !INSTALL.test(install)) return Response.json({ error: 'bad_request' }, { status: 400 });
  try {
    const checkout = await paidCheckout(link, install);
    if (!checkout) return Response.json({ paid: false });
    return Response.json({ paid: true, licence: licence(mod, install, checkout.id) });
  } catch {
    return Response.json({ error: 'unavailable' }, { status: 503 });
  }
}
