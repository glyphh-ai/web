import { HOSTED_PLANS, fetchRates } from '../lib/rates';

// The hosted machine rates per plan (the pricing contract, 2026-10-18): each
// size by the month and by the second, and the disk by the GB-month. Free has
// no hosted machines and Enterprise's rates are set in its contract, so
// neither has a column. The figures come from
// app/lib/rates.js (the server's, else the fallback).
const usd = (n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const perSecond = (n) => `$${n.toPrecision(2)}`;
const spec = (s) => `${s.cpus} ${s.cpu_kind} CPU${s.cpus === 1 ? '' : 's'}, ${s.memory_mb / 1024} GB memory, ${s.volume_gb} GB disk`;
const title = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default async function HostingRates() {
  const rates = await fetchRates();
  return (
    <>
      <div className="mc-table-wrap">
        <table className="mc-table pp-rates">
          <thead>
            <tr>
              <th>Machine</th>
              {HOSTED_PLANS.map((p) => <th key={p}>{p}</th>)}
            </tr>
          </thead>
          <tbody>
            {rates.sizes.map((s) => (
              <tr key={s.size}>
                <td>
                  <b>{title(s.size)}</b>
                  <span className="pp-rates-spec">{spec(s)}</span>
                </td>
                {HOSTED_PLANS.map((p) => {
                  const r = rates.plans[p].sizes.find((x) => x.size === s.size);
                  return (
                    <td key={p}>
                      <b>{usd(r.usd_per_month)}</b> a month
                      <span className="pp-rates-spec">{perSecond(r.usd_per_second)} a second</span>
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td>
                <b>Disk</b>
                <span className="pp-rates-spec">Each machine&rsquo;s volume, started or stopped</span>
              </td>
              {HOSTED_PLANS.map((p) => (
                <td key={p}><b>{usd(rates.plans[p].volume_usd_per_gb_month)}</b> a GB a month</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mc-foot">
        A machine is billed by the second while it is started, and stops when idle. A month is 30 days. Free has no
        hosted machines: run Ada on your own for nothing. Enterprise rates are set in your contract.
      </p>
    </>
  );
}
