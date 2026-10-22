import { Code, Row, Table } from './ui';
import { DOCS } from './base';

// The plugin and the SDKs, from glyphh-ai/glyphh origin/main (plugins/glyphh/README.md, skills/ada/SKILL.md,
// sdk/*/README.md, contract/contract.json).

export const PLUGIN_PAGES = [
  {
    slug: 'plugin',
    title: 'The plugin',
    lede: 'The glyphh plugin for Claude Code: sign in, and the Ada skill, which builds, loads, tunes and asks your models with you.',
    body: (
      <>
        <h2>Install</h2>
        <Code>{`/plugin marketplace add glyphh-ai/glyphh
/plugin install glyphh@glyphh`}</Code>
        <p>After the plugin adds a command, the desktop app may need <strong>View › Reload</strong>.</p>
        <h2>Sign in</h2>
        <Row k="“sign in to Glyphh”">Ask Claude: a sign-in card in the chat with a code; approve it on the platform with Google or GitHub</Row>
        <Row k="/glyphh signin">The same from the command line; /glyphh signout signs this machine out</Row>
        <p>The install’s token is kept in <code>~/.glyphh/install.json</code> (mode 0600).</p>
        <h2>Add the connector</h2>
        <p>
          The Ada skill works through the Glyphh connector. Add it once in Claude, <strong>Settings → Connectors</strong>:{' '}
          <code>https://api.glyphh.ai/mcp</code>, then sign in and click Allow. No key is typed or pasted. Without the
          connector the skill has no <code>ada_*</code> tools and will ask you to add it.
        </p>
        <h2>The Ada skill</h2>
        <p>Ask in plain words:</p>
        <Code>{`Build me an Ada model of our support tickets from history.csv: the outcome
is refund or keep. Then tell me what it decides for this new ticket, and why.`}</Code>
        <p>Claude then:</p>
        <ol>
          <li><strong>Agrees the case with you:</strong> the fields (exact values, free text, numbers on a scale, ids, what only some callers may see), the outcome, what each mistake costs, and when a person should decide.</li>
          <li><strong>Writes the spec</strong>, shows it to you in plain words, and makes the model (<code>ada_model_create</code>).</li>
          <li><strong>Loads your history:</strong> maps your file’s columns to the spec with you, leaving out anything only known after the outcome, then <code>ada_record_many</code> in chunks or <code>ada_import</code> for a file.</li>
          <li><strong>Learns</strong> (<code>ada_learn</code>) and tells you what the cases turn on: each role’s weight, the telling pairs and words.</li>
          <li><strong>Backtests</strong> on held-out cases before you trust it (<code>ada_backtest</code>).</li>
          <li><strong>Asks it</strong> (<code>ada_decide</code>) and cites the precedents.</li>
          <li><strong>Tunes</strong> one change at a time, each backtested, applied only when you agree, with the reason as the version’s note.</li>
          <li><strong>Makes an API key</strong> for your code (<code>create_api_key</code>), shown once, for you to keep as a secret.</li>
        </ol>
        <h2>The connector’s Ada tools</h2>
        <Table
          head={['Tool', 'Does']}
          rows={[
            ['ada_models, ada_model', 'The organisation’s models; one with its spec, version, size and settings'],
            ['ada_model_create, ada_spec_update, ada_model_delete', 'Make a model; a new spec version; delete (confirm repeats the name)'],
            ['ada_record, ada_record_many, ada_grade, ada_forget', 'One case; up to 1,000; an outcome on a case; forget one'],
            ['ada_import, ada_job', 'An import (an upload link, or the file’s text or rows inline up to 5 MB); a job’s progress, waiting up to 50 s'],
            ['ada_learn, ada_calibrate', 'Learn and calibrate; calibrate alone. Jobs'],
            ['ada_decide, ada_query, ada_probabilities, ada_facts', 'Ask'],
            ['ada_backtest, ada_settings, ada_versions, ada_activate', 'Tune; roll back'],
            ['ada_export', 'Everything out, with a one-hour download link'],
            ['create_api_key, api_keys, revoke_api_key', 'Keys for your code'],
          ]}
        />
        <p>The tools act as the person signed in, with full clearance; a tool may ask for less. Refusals carry the API’s codes (<a href={`${DOCS}/api#errors`}>Errors</a>).</p>
      </>
    ),
  },
];

export const SDK_PAGES = [
  {
    slug: 'sdks',
    title: 'The SDKs',
    lede: 'Python and TypeScript clients for Ada Cloud, called with an API key.',
    body: (
      <>
        <Row k="Python 3.9+">pip install glyphh. Pin glyphh&gt;=3: versions up to 2.6.7 are a different library</Row>
        <Row k="Node 18+">npm install @glyphh-ai/glyphh (or any runtime with fetch)</Row>
        <p>Both are 3.2, MIT, with no dependencies. They read the key from <code>GLYPHH_API_KEY</code> and call <code>https://ada.glyphh.ai</code>.</p>
        <h2>Decide</h2>
        <Code lang="python">{`from glyphh import Ada

ada = Ada()                     # or Ada(key="glyphh_ak_...")

d = ada.decide("tickets", {"ticket": {"what": {"plan": "pro", "text": "charged twice"}}})
if d.ask:                       # a person should decide: d.outcome is only the best guess
    send_to_a_person(d)
else:
    act(d.outcome)              # d.probabilities, d.expected_cost, d.receipts

ada.model("tickets").record({"ticket": {...}}, "refund")      # a confirmed outcome`}</Code>
        <Code lang="javascript">{`import { Ada } from "@glyphh-ai/glyphh";

const ada = new Ada();          // or new Ada({ key: "glyphh_ak_..." })

const d = await ada.decide("tickets", { ticket: { what: { plan: "pro", text: "charged twice" } } });
if (d.ask) await sendToAPerson(d);
else act(d.outcome);`}</Code>
        <h2>From nothing to a decision</h2>
        <Code lang="python">{`tickets = ada.create_model("tickets", spec)
job = tickets.import_file("history.csv", mapping={"Plan": "ticket.what.plan", "Result": "outcome"},
                          on_progress=lambda j: print(j.state, j.percent))
print(job.result["added"], job.result["refused"])

bt = tickets.backtest([{"settings": {"word_evidence": 0}, "name": "no word evidence"}], holdout={"newest": 200})
tickets.settings({"word_evidence": 0}, note="cost 8% less on the last 200", backtest=bt.id)
tickets.activate(1)                                  # and back
tickets.export(to="tickets.zip")                     # everything, as a zip`}</Code>
        <p>TypeScript has the same calls in camelCase with options objects: <code>createModel</code>, <code>importFile(path, {'{ mapping, onProgress }'})</code>, <code>backtest(candidates, {'{ holdout }'})</code>, <code>export({'{ to }'})</code>.</p>
        <h2>The classes</h2>
        <Row k="Ada">decide(model, data, output, outputs, include, clearance); models(), model(name), create_model(name, spec), delete_model(name); job(id), wait(job), download(job); usage()</Row>
        <Row k="Model">info(), spec(), set_spec(spec, note, backtest), settings() and settings(changes, note, backtest), versions(), activate(version), delete(); record(data, outcome), record_many(cases), grade(id, value, output), forget(id); decide(data); learn(), calibrate(), backtest(candidates, holdout, output); import_file(path or bytes, format, mapping, partial, learn), export(format, to)</Row>
        <Row k="Decision">outcome, probabilities, expected_cost, ask, receipts, facts, outputs, model, version</Row>
        <Row k="Job">id, model, kind, state (awaiting, queued, running, done, failed), percent, result, error, download, upload</Row>
        <Row k="Usage">plan, month, resets_at, models, precedents (used, max), requests (used, max, over, overage), requests_per_second</Row>
        <p><code>record_many</code> sends a thousand a request, in chunks. Every call that runs long is a job, waited for with its progress unless <code>wait=False</code> (<code>{'{ wait: false }'}</code>).</p>
        <h2>Errors and retries</h2>
        <p>
          A refusal raises (Python) or throws (TypeScript) an <code>AdaError</code> with <code>code</code>,{' '}
          <code>message</code>, <code>status</code>, <code>detail</code>, <code>retry_after</code> and{' '}
          <code>trace_id</code>, typed by code: <code>AuthError</code>, <code>LimitError</code> (<code>reason</code>,{' '}
          <code>used</code>, <code>max</code>, <code>plan</code>, <code>upgrade</code>, <code>resets_at</code>),{' '}
          <code>RateError</code>, <code>SpecError</code>, <code>SpecReadingError</code>, <code>FewRolesError</code>,{' '}
          <code>MappingError</code>, <code>BusyError</code>, <code>ModelMissingError</code>, <code>JobFailedError</code>{' '}
          and the rest of the <a href={`${DOCS}/api#errors`}>API’s codes</a>.
        </p>
        <p>
          Every write carries an <code>Idempotency-Key</code>, so the client safely sends again a read, or a write, while
          Ada is unreachable for a moment (<code>E_UNAVAILABLE</code>, <code>E_TIMEOUT</code>, 502 to 504), and anything
          refused with 429, with backoff and <code>Retry-After</code>, for up to <code>retry_deadline</code>{' '}
          (<code>retryDeadline</code>) seconds: default 30, 0 never.
        </p>
        <h2>Upgrading from 3.0</h2>
        <p>3.0’s calls still work: <code>record</code>, <code>query</code>, <code>facts</code>, <code>probabilities</code>, <code>learn</code> and <code>call(function, inputs)</code> go through <code>POST /v1/runs</code>. <code>GLYPHH_RUNTIME_URL</code> and <code>GLYPHH_RUNTIME_KEY</code> are still read. A decision never waits for input: it says <code>ask</code>.</p>
      </>
    ),
  },
];
