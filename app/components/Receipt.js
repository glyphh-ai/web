/**
 * Receipt — the example answer as a card, in place of two JSON blocks (his
 * order, 2026-10-25: no code on the home). The same incidents example as
 * before, labelled as an example: the case on the left, Ada's answer on the
 * right with its confidence drawn as a bar of the field's letters, the
 * precedents it stands on, and what the nearest precedent carried. The strip
 * along the base is the ask.
 */

const BAR = 25, LIT = Math.round(BAR * 0.82);

export default function Receipt() {
  return (
    <div className="rc hv-panel">
      <div className="rc-grid">
        <div className="rc-case">
          <div className="rc-head">
            <span className="rc-k">The case</span>
            <span className="rc-tag">example</span>
          </div>
          <dl className="rc-rows">
            <div><dt>Class</dt><dd>TimeoutError</dd></div>
            <div><dt>Message</dt><dd>payment gateway timed out</dd></div>
            <div><dt>Status</dt><dd>504</dd></div>
            <div><dt>Service</dt><dd>checkout</dd></div>
          </dl>
          <p className="rc-note">Asked by your software, from the incidents model.</p>
        </div>
        <div className="rc-ans">
          <div className="rc-head"><span className="rc-k">The answer</span></div>
          <p className="rc-out">Raise the circuit breaker.</p>
          <div className="rc-conf">
            <span className="rc-bar" aria-hidden="true">
              {Array.from({ length: BAR }, (_, i) => <i key={i} className={i < LIT ? 'on' : undefined} />)}
            </span>
            <span className="rc-conf-n">82% sure</span>
          </div>
          <p className="rc-from">From 6 precedents on record.</p>
          <dl className="rc-rows rc-last">
            <div className="rc-last-k"><dt>Last time</dt><dd /></div>
            <div><dt>Cause</dt><dd>gateway rate limit hit on a retry storm</dd></div>
            <div><dt>Owner</dt><dd>payments</dd></div>
            <div><dt>Runbook</dt><dd>RB-12, back off retries and raise the circuit breaker</dd></div>
          </dl>
          <p className="rc-note">A spec can put layers behind a clearance: a status bot gets the fix, an engineer also gets the cause, the owner and the runbook.</p>
        </div>
      </div>
      <div className="rc-foot">
        When Ada is unsure the answer is ask. Your software hands the case to a model or a person, records the result,
        and Ada has one more precedent.
      </div>
    </div>
  );
}
