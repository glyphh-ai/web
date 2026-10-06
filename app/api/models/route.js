import { adaLive } from '../../lib/ada-live';

// THE MODELS WE RUN, AT OUR RATES (his order, 2026-09-29: "the web only pulls
// the models we have enabled… each model shows the rates by each plan"). The
// server's anonymous list, proxied same-origin so the catalog, the ticker and
// the pricing page all read one answer. Five minutes fresh, like the server's
// own Cache-Control; an unreachable server answers an empty list, never a hang.
// With Ada off (one switch: app/lib/ada-live.js) a glyphh-ada row the server
// still lists is dropped here, so the catalog, the ticker and the pricing page
// never show it; with Ada on the rows pass through.
export const revalidate = 300;

const isAda = (m) => /^glyphh-ada/i.test(String(m?.name ?? m?.id ?? ''));

const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.glyphh.ai';

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/api/public/models`, { next: { revalidate }, signal: AbortSignal.timeout(2500) });
    if (!res.ok) return Response.json({ plans: [], models: [], ok: false });
    const body = await res.json();
    return Response.json({ plans: body.plans ?? [], models: (body.models ?? []).filter((m) => adaLive() || !isAda(m)), ok: true });
  } catch {
    return Response.json({ plans: [], models: [], ok: false });
  }
}
