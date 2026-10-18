// The hosted machine rates per plan, read from the server's public GET /v1/rates
// (the pricing contract, 2026-10-18). Hosted machines are billed per second at
// Fly's rates; each plan's figure is what the person pays, and the page shows
// only that figure. Revalidated hourly. If the server cannot be reached, the
// fallback below is computed from the same Fly rates the server is seeded with,
// so the page never shows a blank table.

export const RATES_URL = 'https://api.glyphh.ai/v1/rates';

// The plans that carry hosted machines, in the order the table shows them.
// Enterprise's rates are set in each contract, so it has no published column.
export const HOSTED_PLANS = ['Pro', 'Team'];

const SECONDS_PER_30_DAYS = 2592000;

// Fly, iad, read 2026-10-18 from https://docs.fly.io/about/pricing (30-day month).
const FLY = {
  effective_from: '2026-10-18',
  sizes: [
    { size: 'small', cpu_kind: 'shared', cpus: 1, memory_mb: 1024, volume_gb: 3, usd_per_month: 6.7 },
    { size: 'medium', cpu_kind: 'shared', cpus: 2, memory_mb: 4096, volume_gb: 10, usd_per_month: 25.39 },
    { size: 'large', cpu_kind: 'performance', cpus: 2, memory_mb: 8192, volume_gb: 20, usd_per_month: 90.0 },
  ],
  volume_usd_per_gb_month: 0.15,
};

// TBD: placeholders, as on the server (the plans table in the contract).
const FACTOR = { Pro: 1.3, Team: 1.3 };

// Whole cents, from integer arithmetic so 0.15 × 1.3 is 0.20, not 0.19.
const cents = (usd, factor) => Math.round(Math.round(usd * 100) * Math.round(factor * 100) / 100) / 100;

function fallbackPlan(name) {
  const f = FACTOR[name];
  return {
    sizes: FLY.sizes.map((s) => {
      const month = cents(s.usd_per_month, f);
      return { size: s.size, usd_per_month: month, usd_per_second: month / SECONDS_PER_30_DAYS };
    }),
    volume_usd_per_gb_month: cents(FLY.volume_usd_per_gb_month, f),
  };
}

export function fallbackRates() {
  const plans = {};
  for (const name of HOSTED_PLANS) plans[name] = fallbackPlan(name);
  return { effective_from: FLY.effective_from, sizes: FLY.sizes, plans, live: false };
}

// One plan's rates from the server, or the fallback where a field is missing.
function planFrom(body, name) {
  const p = body?.plans?.[name];
  const fb = fallbackPlan(name);
  if (!p || !Array.isArray(p.sizes)) return fb;
  return {
    sizes: fb.sizes.map((s) => {
      const live = p.sizes.find((x) => x.size === s.size);
      if (!live || typeof live.usd_per_month !== 'number') return s;
      return {
        size: s.size,
        usd_per_month: live.usd_per_month,
        usd_per_second: typeof live.usd_per_second === 'number' ? live.usd_per_second : live.usd_per_month / SECONDS_PER_30_DAYS,
      };
    }),
    volume_usd_per_gb_month: typeof p.volume_usd_per_gb_month === 'number' ? p.volume_usd_per_gb_month : fb.volume_usd_per_gb_month,
  };
}

/** The rates per plan: the server's, revalidated hourly, else the fallback. */
export async function fetchRates() {
  try {
    // A marketing page must never hang on the API: 1.5 seconds, then the fallback.
    const res = await fetch(RATES_URL, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(1500) });
    if (!res.ok) return fallbackRates();
    const body = await res.json();
    if (!body?.plans) return fallbackRates();
    const sizes = FLY.sizes.map((s) => ({ ...s, ...(body.sizes?.find((x) => x.size === s.size) || {}) }));
    const plans = {};
    for (const name of HOSTED_PLANS) plans[name] = planFrom(body, name);
    return { effective_from: body.effective_from || FLY.effective_from, sizes, plans, live: true };
  } catch {
    return fallbackRates();
  }
}
