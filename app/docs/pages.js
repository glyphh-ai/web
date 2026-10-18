import { Note, Row, Code, Shot } from './ui';
import { DOCS } from './base';

// The docs, kept short. Each page is written from the source; when the product
// changes, the page changes in the same push. The desktop is where you build
// and install; app.glyphh.ai is how you reach it (his direction, 2026-10-05).

export const ada = [
  {
    slug: 'ada',
    title: 'Ada models',
    lede: 'Typed models your agents build, feed and query, with every answer a fact tree.',
    body: (
      <>
        <p>
          An Ada model holds records: a situation, the outcome that was tried, and whether it worked. Ask it about a
          new situation and it answers with the outcome that worked in situations like it, how confident it is, and
          the records it stands on. Ada runs on Glyphh&rsquo;s servers and is reached over MCP, at{' '}
          <code>POST /ada</code>, or as a chat model.
        </p>
        <h2>Current model</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Model</th><th>Pricing</th><th>Situation size</th><th>Outcome label</th><th>Input</th></tr></thead>
            <tbody>
              <tr><td><code>glyphh-ada-1.0</code></td><td>In every plan</td><td>Up to 16 KB of JSON</td><td>Up to 200 characters</td><td>Typed JSON</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li><strong>Pricing.</strong> Ada is in every plan, Free included, with no add-on and no charge per call, per model or per seat. See the <a href="https://glyphh.ai/pricing">pricing page</a>.</li>
          <li><strong>Precedents.</strong> On a local or self-hosted runtime there is no limit. On a hosted runtime the plan&rsquo;s managed precedents are the limit: 100,000 on Pro, 1,000,000 on Team, none on Enterprise.</li>
          <li><strong>Situations.</strong> A model has a spec that gives every field a type, and a situation is data in that shape: anything else is refused. See <a href={`${DOCS}/ada-typed`}>Typed models</a>. A model created without a spec is flat: it takes JSON of any shape, with arrays treated as sets, and checks nothing.</li>
          <li><strong>One id per call.</strong> Every call names a <code>model_id</code> (<code>am_</code> and 12 hex digits). An organization can have many models.</li>
        </ul>
        <h2>Where records live</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Storage</th><th>Records are kept</th><th>Needs</th></tr></thead>
            <tbody>
              <tr><td><code>cloud</code></td><td>With Glyphh, in your organization&rsquo;s own schema</td><td>Nothing</td></tr>
              <tr><td><code>local</code></td><td>On a device your organization registered</td><td>That device online when the model is used</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          A model&rsquo;s configuration always lives on the server: its name, where its records live, its weights
          and its calibration. Only the records themselves can live on a device. Register one with{' '}
          <code>glyphh ada register</code>, then create the model with <code>storage: &quot;local&quot;</code> and
          that device&rsquo;s id.
        </p>
        <h2>How large</h2>
        <p>
          A model&rsquo;s records are held in memory as columns and scored together, a field at a time. A
          record&rsquo;s data as you wrote it stays in the database and is read when an answer shows it. Measured
          on a typed model with six fields: a query takes about 33 ms at 100,000 records and 200 ms at
          1,000,000, and a million records take about 0.7 GB. The columns are also kept in the database, so a
          server that restarts reads them (3 seconds for a million records) and not every record again (53
          seconds).
        </p>
        <h2>Customizing a model</h2>
        <ul>
          <li><strong>Weights.</strong> Say how much each key decides: <code>{'{"risk": 1, "team": 0.1}'}</code>. A number weighs a key; an object weighs inside it. Unlisted keys weigh 1, and a key that weighs 0 is never looked at. Set defaults on the model, or pass weights on one call. A typed model&rsquo;s weights live in its spec.</li>
          <li><strong>Scale.</strong> What <code>act</code> takes, set per model with <code>ada_update_model</code>: <code>{'{"similarity": 0.4, "confidence": 0.7, "records": 3, "exact": true, "must_match": [], "unseen": false}'}</code>. See <a href={`${DOCS}/ada-act`}>When Ada acts</a>.</li>
          <li><strong>Calibration.</strong> Once a model has 10 or more wins, <code>ada_calibrate</code> fits its probabilities to its own records. A record is held out together with every copy of itself, so repeats teach it nothing. The result is saved with the model.</li>
          <li><strong>Learned weights.</strong> Once a model has 10 or more wins, an org admin can run <code>ada_learn</code>. It works out what decides by holding records out and predicting them from the rest, saves the weights, calibrates the model, and reports how often it predicts its own held-out records before and after. A flat model learns the weight of each top-level key. A <a href={`${DOCS}/ada-typed`}>typed model</a> learns each role&rsquo;s weight, saved in its spec.</li>
          <li><strong>Clearance.</strong> An org admin sets each team&rsquo;s clearance on a model from 0 to 1. A team with no setting has full clearance. A typed model&rsquo;s spec says which parts need one.</li>
        </ul>
        <h2>Values said another way</h2>
        <p>
          A query does not have to use the same word a record used. When a cloud model records a value it has not
          seen, Ada works out once how else that value is said and keeps it with the model, so a query for{' '}
          <code>production</code> reaches records that say <code>prod</code>. Nothing changes in the calls you make.
        </p>
        <ul>
          <li><strong>No model runs when you query.</strong> The lexicon is built when a record is written, and a query only reads it.</li>
          <li><strong>A match by lexicon is never exact.</strong> It scores at most 0.95, so it needs three records and 0.7 confidence to act, like any other near match.</li>
          <li><strong>Only a close word counts as the recorded one.</strong> A word held at 0.8 or closer is another way to say a recorded value. A word that is only related leans the answer and is still new.</li>
          <li><strong>Recorded values stay distinct.</strong> Two values your records use are never treated as the same.</li>
          <li><strong>Fact trees show it.</strong> The key&rsquo;s leaf shows your word, the record&rsquo;s word and the score.</li>
          <li><strong>What is sent.</strong> To build the lexicon, a cloud model&rsquo;s short text values are sent to the language model that fronts Ada. In a flat model those are the values of its top-level keys. In a typed model they are the values of its open categories only: see <a href={`${DOCS}/ada-typed`}>Typed models</a>. A local model&rsquo;s values are never sent, so a local model matches exact values only. Keys with more than 200 distinct values, such as ids, are left out.</li>
        </ul>
        <h2>When Ada says to act</h2>
        <p>
          A query returns <code>act</code> and a <code>reason</code>. By default <code>act</code> is true only when
          nothing in the situation is new to the model, its confidence is at least 0.7, three or more records stand
          behind it, and the outcome is not vetoed by a newer recorded failure. A record of the same situation is
          the answer and acts alone. Every record at least 0.40 similar to the situation votes; the rest are not
          counted.
        </p>
        <div className="dx-table">
          <table>
            <thead><tr><th><code>reason</code></th><th>Means</th></tr></thead>
            <tbody>
              <tr><td><code>reflex</code></td><td>Act: the records back the top outcome and nothing stands against it</td></tr>
              <tr><td><code>insufficient</code></td><td>No record is close enough, or too few of the top outcome are</td></tr>
              <tr><td><code>unseen</code></td><td>The situation carries a key or a value no win has recorded. <code>unseen</code> lists them.</td></tr>
              <tr><td><code>vetoed</code></td><td>A recorded failure of the top outcome is as close as its wins, and newer</td></tr>
              <tr><td><code>uncalibrated</code></td><td>Fewer records than the scale takes, and none is the same situation</td></tr>
              <tr><td><code>mismatch</code></td><td>The records differ under a key the scale says must match</td></tr>
              <tr><td><code>low_confidence</code></td><td>The records disagree on the outcome</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <code>act: false</code> never means no answer: the nearest outcome and the records behind it come back
          either way. <a href={`${DOCS}/ada-act`}>When Ada acts</a> covers each check, each reason with an example, why
          a question that carries something never recorded is not acted on, and how to set that per model.
        </p>
        <Note kind="warn" title="A single record is not consensus">
          Ada cites what it stands on. Read <code>count</code> and <code>receipts</code> before acting on a thin
          answer.
        </Note>
        <h2>Listing models</h2>
        <p>Over MCP, call <code>ada_models</code>. Over HTTP, the same call is an <code>op</code>:</p>
        <Code lang="bash">{`curl https://api.glyphh.ai/ada \\
  -H "x-glyphh-api-key: Bearer $GLYPHH_API_KEY" \\
  -H "content-type: application/json" \\
  -d '{"op": "models"}'`}</Code>
        <Code lang="python">{`import os, requests

r = requests.post(
    "https://api.glyphh.ai/ada",
    headers={"x-glyphh-api-key": f"Bearer {os.environ['GLYPHH_API_KEY']}"},
    json={"op": "models"},
)
models = r.json()["data"]`}</Code>
        <Code lang="javascript">{`const r = await fetch("https://api.glyphh.ai/ada", {
  method: "POST",
  headers: {
    "x-glyphh-api-key": \`Bearer \${process.env.GLYPHH_API_KEY}\`,
    "content-type": "application/json",
  },
  body: JSON.stringify({ op: "models" }),
});
const { data: models } = await r.json();`}</Code>
        <p>
          Each model comes back with its <code>id</code>, <code>name</code>, <code>storage</code>, default{' '}
          <code>weights</code>, its <code>scale</code>, its <code>spec</code> when it is typed, and whether it is{' '}
          <code>calibrated</code>. Pass a <code>model_id</code> to get one model with its record counts.
        </p>
      </>
    ),
  },
  {
    slug: 'ada-act',
    title: 'When Ada acts',
    lede: 'Every query returns the nearest match and why. act is a separate yes or no on top of it, for code that branches without reading the answer.',
    body: (
      <>
        <h2>Two things come back</h2>
        <p>A query always measures, and it always tells you what it found:</p>
        <ul>
          <li><strong>The measurement.</strong> <code>top</code> (the nearest outcome), <code>receipts</code> (the situations on record behind it, each with its score), <code>outcomes</code> and <code>confidence</code>. <code>ada_facts</code> gives the same records as fact trees. You get these whether or not Ada would act.</li>
          <li><strong>The verdict.</strong> <code>act</code>, true or false, and <code>reason</code>. It answers one question: are the records behind <code>top</code> strong enough for a program to branch on it with nobody reading the answer?</li>
        </ul>
        <p>
          So <code>act: false</code> never means &ldquo;no answer&rdquo;. It means &ldquo;here is the closest
          thing I have, and here is why I would not act on it alone&rdquo;. An agent or a person can read the
          answer and decide. A program should branch on <code>act</code>.
        </p>
        <p>The examples below use the model from the <a href={`${DOCS}/quickstart`}>Quickstart</a>, holding three kubelet tickets at severity 6, 7 and 8, all routed to platform.</p>
        <h2>The checks, in order</h2>
        <p>Ada runs these in order and stops at the first that fails. <code>reason</code> names it.</p>
        <div className="dx-table">
          <table>
            <thead><tr><th></th><th>Check</th><th>Fails as</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Is any record at least 0.40 similar to the question?</td><td><code>insufficient</code></td></tr>
              <tr><td>2</td><td>Is everything the question carries something the model&rsquo;s wins have recorded?</td><td><code>unseen</code></td></tr>
              <tr><td>3</td><td>Is the top outcome free of a newer recorded failure that is as close as its wins?</td><td><code>vetoed</code></td></tr>
              <tr><td>4</td><td>Do enough records stand behind it (three, or one that is the same situation)?</td><td><code>uncalibrated</code></td></tr>
              <tr><td>5</td><td>Do those records meet the model&rsquo;s scale: close enough, and agreeing on its must-match keys?</td><td><code>insufficient</code> or <code>mismatch</code></td></tr>
              <tr><td>6</td><td>Do the records agree on the outcome (confidence at least 0.7)?</td><td><code>low_confidence</code></td></tr>
            </tbody>
          </table>
        </div>
        <p>Pass all six and the answer is <code>act: true</code> with <code>reason: &quot;reflex&quot;</code>.</p>
        <h2>It acts</h2>
        <p>A question the records cover. Here it names the same situation one record holds, so that record answers alone:</p>
        <Code lang="json">{`// component kubelet, symptom crash_on_boot, severity 7
{ "act": true, "reason": "reflex", "top": "route_to_platform",
  "exact": true, "confidence": 1.0, "count": 1, "unseen": [],
  "receipts": [ { "outcome": "route_to_platform", "score": 1.0 },
                { "outcome": "route_to_platform", "score": 0.9667 },
                { "outcome": "route_to_platform", "score": 0.9667 } ] }`}</Code>
        <ul>
          <li><strong><code>exact</code></strong> is true when the same situation is on record. One such record is enough; without it, three records have to stand behind the outcome.</li>
          <li><strong>A query scores only the roles it gives.</strong> Ask with just the component and the symptom and all three tickets match exactly, whatever their severity.</li>
        </ul>
        <h2>It was never shown this: unseen</h2>
        <p>Ask about a component no record has:</p>
        <Code lang="json">{`// component etcd, symptom crash_on_boot
{ "act": false, "reason": "unseen", "top": "route_to_platform",
  "unseen": ["ticket.issue.component=etcd"],
  "exact": false, "confidence": 1.0, "support": 0.5, "count": 3,
  "receipts": [ { "outcome": "route_to_platform", "score": 0.5 }, … ] }`}</Code>
        <p>
          Ada still reached for the closest records and still tells you what they say: three tickets, half alike,
          all routed to platform. What it will not do is tell a program to act on that.
        </p>
        <p>
          <strong>Why.</strong> A score is the share of the question that agrees with a record. Here the symptom
          agrees and the component does not, so the score is 0.5, which clears the 0.40 floor. All three records
          agree with each other, so confidence is 1.0. Every number looks healthy, and the one thing that differs
          is the thing the model has no evidence about. The same arithmetic makes a force push to{' '}
          <code>main</code> look half like a push to a feature branch. Similarity cannot tell &ldquo;close
          enough&rdquo; from &ldquo;differs in the one way that matters&rdquo;, so a value the model was never
          shown stops the verdict, and <code>unseen</code> names it.
        </p>
        <h3>What counts as new</h3>
        <div className="dx-table">
          <table>
            <thead><tr><th>In the question</th><th>New when</th></tr></thead>
            <tbody>
              <tr><td>A key or a role</td><td>No win carries it at all. Reported as its path: <code>force</code></td></tr>
              <tr><td>A category, or an item of a set</td><td>No win recorded that value there: <code>target=main</code></td></tr>
              <tr><td>A number on a scale</td><td>It lies outside every number recorded there. Between two recorded numbers is covered.</td></tr>
              <tr><td>Text</td><td>Never. New words are normal.</td></tr>
              <tr><td>A key part</td><td>Never. It says which thing, not what it is like.</td></tr>
              <tr><td>Anything with weight 0</td><td>Never. It is not looked at.</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The model above holds severities 6 to 8. Ask at severity 7 and nothing is new. Ask at severity 2 and{' '}
          <code>unseen</code> is <code>[&quot;ticket.issue.severity=2&quot;]</code>, even though the nearest ticket scores
          0.87. In a flat cloud model, a word the model holds as another way to say a recorded value (0.8 or closer,
          such as <code>production</code> for <code>prod</code>) is not new.
        </p>
        <h3>Three ways to let it act</h3>
        <div className="dx-table">
          <table>
            <thead><tr><th>You want</th><th>Do</th><th>Then</th></tr></thead>
            <tbody>
              <tr><td>The model to know this case</td><td>Record it, with the outcome the world confirmed</td><td>It is no longer new. This is the normal path: a refusal is a request for a record.</td></tr>
              <tr><td>A field to vary freely</td><td>Give it weight 0 (<code>similarity_weight</code> in a spec, <code>weights</code> on a flat model)</td><td>It has no voice in the score and is never new</td></tr>
              <tr><td>The model to act on likeness alone</td><td>Set <code>unseen: true</code> in its scale</td><td><code>act</code> follows the other five checks. <code>unseen</code> is still listed.</td></tr>
            </tbody>
          </table>
        </div>
        <Code lang="json">{`{ "op": "update_model", "model_id": "am_0123456789ab", "scale": { "unseen": true } }`}</Code>
        <p>With that set, the same etcd question acts on half a match:</p>
        <Code lang="json">{`{ "act": true, "reason": "reflex", "top": "route_to_platform",
  "unseen": ["ticket.issue.component=etcd"], "support": 0.5, "count": 3 }`}</Code>
        <Note kind="warn" title="Choose this per model">
          Acting on the closest match is right for a router or a classifier, where a best guess is the point and
          a wrong one is cheap. It is wrong for a gate or a switch that software obeys, where a wrong one is the
          failure. The default is the safe one; a model that wants the other says so.
        </Note>
        <h3>What unseen does not catch</h3>
        <p>
          Values that were each recorded, but never together. If the records hold <code>a=0, b=1</code>,{' '}
          <code>a=1, b=0</code> and <code>a=0, b=0</code>, then <code>a=1, b=1</code> carries nothing new, and the
          neighbours answer for it. When a combination decides, record every combination, or raise the
          model&rsquo;s <code>similarity</code> so only close matches count.
        </p>
        <h2>The other reasons</h2>
        <h3>insufficient</h3>
        <p>Nothing on record is at least 0.40 similar. <code>top</code> is null, and <code>receipts</code> still lists the nearest records with their scores.</p>
        <Code lang="json">{`// component etcd, symptom disk_full
{ "act": false, "reason": "insufficient", "top": null, "sufficient": false, "count": 0,
  "unseen": ["ticket.issue.component=etcd", "ticket.issue.symptom=disk_full"] }`}</Code>
        <p>
          The same reason with a <code>top</code> means records were found, but too few of them meet the
          model&rsquo;s own <code>similarity</code>.
        </p>
        <h3>uncalibrated</h3>
        <p>Records are close and agree, but there are fewer than the scale takes and none is the same situation. Two tickets at severity 4 and 6, asked at severity 5:</p>
        <Code lang="json">{`{ "act": false, "reason": "uncalibrated", "top": "route_to_storage",
  "exact": false, "confidence": 1.0, "support": 0.9667, "count": 2 }`}</Code>
        <h3>low_confidence</h3>
        <p>The records disagree. The same situation recorded once with each of two outcomes:</p>
        <Code lang="json">{`{ "act": false, "reason": "low_confidence", "top": "route_to_platform", "confidence": 0.5,
  "outcomes": { "route_to_platform": 0.5, "route_to_network": 0.5 } }`}</Code>
        <p>Every record that clears the floor votes, weighted by how close it is. A situation recorded many times counts each time.</p>
        <h3>vetoed</h3>
        <p>
          A failure was recorded for the top outcome (<code>ada_veto</code>), as close as the wins behind it and
          newer than them. One is enough.
        </p>
        <Code lang="json">{`{ "act": false, "reason": "vetoed", "top": "route_to_platform", "veto_match": 1.0, "lifted": false }`}</Code>
        <p>The newest evidence wins. Record a win for the same situation after the failure and the veto lifts:</p>
        <Code lang="json">{`{ "act": true, "reason": "reflex", "top": "route_to_platform", "veto_match": 1.0, "lifted": true }`}</Code>
        <p>
          &ldquo;Newer&rdquo; is by when the outcome happened. When you load past records, pass <code>at</code> so
          load order does not stand in for history.
        </p>
        <h3>mismatch</h3>
        <p>
          The records are close, but differ from the question under a key the model&rsquo;s scale lists in{' '}
          <code>must_match</code>.
        </p>
        <h2>The scale</h2>
        <p>
          What <code>act</code> takes is a setting on the model. An org admin sets it with{' '}
          <code>ada_update_model</code>; a part left out keeps its default. Every answer carries the{' '}
          <code>scale</code> it was measured on.
        </p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Part</th><th>Default</th><th>Means</th></tr></thead>
            <tbody>
              <tr><td><code>similarity</code></td><td>0.4</td><td>A record backs an outcome only at this score or closer. From 0.4 to 1.</td></tr>
              <tr><td><code>confidence</code></td><td>0.7</td><td>The top outcome&rsquo;s share of the vote that it takes.</td></tr>
              <tr><td><code>records</code></td><td>3</td><td>How many records have to back the outcome.</td></tr>
              <tr><td><code>exact</code></td><td>true</td><td>One record of the same situation stands in for <code>records</code> of them.</td></tr>
              <tr><td><code>must_match</code></td><td>[]</td><td>Top-level keys a record has to share with the question to count. In a typed model those are layers; to make one role decide, raise <code>similarity</code> or weigh the role up.</td></tr>
              <tr><td><code>unseen</code></td><td>false</td><td>True lets the model act on a question that carries something never recorded.</td></tr>
            </tbody>
          </table>
        </div>
        <h2>Which settings for which model</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>The model is a</th><th>A wrong answer</th><th>Set</th></tr></thead>
            <tbody>
              <tr><td>Gate or permission check</td><td>Does damage</td><td>Keep the defaults. Record every case it must allow. Consider <code>similarity: 0.9</code>.</td></tr>
              <tr><td>Switch</td><td>Takes the wrong branch</td><td>Keep the defaults, and treat <code>act: false</code> as the default branch.</td></tr>
              <tr><td>Router or classifier</td><td>Is cheap to correct</td><td><code>unseen: true</code>, so the nearest destination is taken.</td></tr>
              <tr><td>Memory or lookup</td><td>Is a miss</td><td>Read <code>receipts</code> and <code>ada_facts</code>; <code>act</code> matters less.</td></tr>
            </tbody>
          </table>
        </div>
        <h2>In your code</h2>
        <Code lang="javascript">{`const a = await ada({ op: "query", model_id, situation });

if (a.act) return take(a.top);            // the records back it

switch (a.reason) {
  case "unseen":                          // a.unseen says what was new
  case "insufficient":
  case "uncalibrated":
    return askSomeone(a);                 // then record what they decide
  case "vetoed":
    return avoid(a.top);                  // this outcome failed here before
  default:
    return askSomeone(a);                 // low_confidence, mismatch
}`}</Code>
        <p>
          Whatever the person or the model decides, record it once the world has graded it. The next question
          like it is then one the model was shown.
        </p>
      </>
    ),
  },
  {
    slug: 'ada-typed',
    title: 'Typed models',
    lede: 'Give every field a type. Ada checks every record and every question against it.',
    body: (
      <>
        <p>
          A model is flat or typed. A flat model takes any JSON and weighs its keys. A typed model carries a{' '}
          <strong>spec</strong>: layers, segments and roles, each role with a type. Anything that does not fit is
          refused before it is stored or scored, with the path of the role that was wrong. Use a typed model when
          software will call it without an agent in the path.
        </p>
        <h2>Types</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Type</th><th>Takes</th><th>How two values score</th></tr></thead>
            <tbody>
              <tr><td><code>category</code></td><td>One value. <code>values</code> lists what it may hold.</td><td>The same is 1, different is 0</td></tr>
              <tr><td><code>set</code></td><td>A list of values</td><td>The share of items they have in common</td></tr>
              <tr><td><code>number</code></td><td>A number on a scale you give (<code>numeric_config</code>)</td><td>1 minus the bins apart over the bins on the scale, so 7 is nearer 8 than 2</td></tr>
              <tr><td><code>text</code></td><td>A string, by <code>bag_of_words</code> or <code>ngrams</code></td><td>The share of words in common, or of character n-grams, so another spelling of a word is near</td></tr>
              <tr><td><code>boolean</code></td><td>True or false</td><td>The same or not</td></tr>
              <tr><td><code>time</code></td><td>Epoch seconds or ISO 8601</td><td>Never scored. It stamps the record.</td></tr>
              <tr><td><code>ref</code></td><td>The key of another thing, or a list of them with <code>many</code></td><td>Like a category or a set. It is also a relation: see <a href={`${DOCS}/ada-graph`}>Relations and the graph</a>.</td></tr>
            </tbody>
          </table>
        </div>
        <p>Every score is exact arithmetic on the values. The same two values always give the same number.</p>
        <h2>A spec</h2>
        <Code lang="json">{`{
  "name": "deals",
  "temporal_source": "meta.time.seen",
  "layers": [
    { "name": "deal", "segments": [
      { "name": "identity", "roles": [
        { "name": "deal_id", "type": "category", "key_part": true, "similarity_weight": 0 } ] },
      { "name": "profile", "roles": [
        { "name": "stage", "type": "category",
          "values": ["discovery", "proposal", "negotiation", "closed"] },
        { "name": "tags", "type": "set" } ] },
      { "name": "metrics", "roles": [
        { "name": "meetings", "type": "number",
          "numeric_config": { "min_value": 0, "max_value": 20, "bin_width": 1 } },
        { "name": "notes", "type": "text", "text_encoding": "ngrams" } ] } ] },
    { "name": "meta", "segments": [
      { "name": "time", "roles": [ { "name": "seen", "type": "time" } ] },
      { "name": "owner", "security_weight": 0.8, "roles": [ { "name": "rep" } ] } ] }
  ]
}`}</Code>
        <Row k="similarity_weight">How much a layer, segment or role counts, 0 to 1. A typed model&rsquo;s weights live in its spec.</Row>
        <Row k="security_weight">The clearance a reader&rsquo;s team needs to see that part. Below it, the part has no voice in the score and does not appear in any answer.</Row>
        <Row k="key_part">The roles that say which thing a record describes. See <a href={`${DOCS}/ada-time`}>Versions and time</a>.</Row>
        <Row k="temporal_source">The role that carries when a record happened.</Row>
        <Row k="together">On a segment: its roles decide only in combination. See below.</Row>
        <p>
          Create the model with <code>spec</code>, or set it with <code>ada_update_model</code> while the model
          has no records. Once a model has a record its shape is fixed: after that only similarity weights may
          change, by <code>ada_learn</code> or by hand. Create a new model for a new shape.
        </p>
        <h2>Roles that decide together</h2>
        <p>
          A segment&rsquo;s score is the weighted mean of its roles, so a record that matches one role of two is
          half alike. That is wrong when only the combination means something: with a door <code>open</code> and
          the alarm <code>armed</code>, a record that shares just one of the two says nothing about this case. Mark
          the segment <code>{'"together": true'}</code> and its score is the product of its roles&rsquo; scores: a
          record that differs in any of them scores 0 there. In a flat model, put <code>{'"~all": true'}</code>{' '}
          beside the keys of an object in the weights.
        </p>
        <h2>Data in that shape</h2>
        <p>A record or a question is the same shape, by name. A question gives only the roles it asks about, and only those are scored.</p>
        <Code lang="json">{`{
  "op": "query",
  "model_id": "am_0123456789ab",
  "situation": { "deal": { "profile": { "stage": "negotiation" }, "metrics": { "meetings": 6 } } }
}`}</Code>
        <p>
          <code>{'{"op": "contract", "model_id": "am_…"}'}</code> returns the shape of the model&rsquo;s data as
          JSON Schema, next to the schema of every answer. Generate your types from it.
        </p>
        <h2>What counts as new</h2>
        <p>
          By default Ada does not tell a program to act on a question that carries something its wins were never
          shown (<a href={`${DOCS}/ada-act`}>When Ada acts</a>). In a typed model that follows the type:
        </p>
        <ul>
          <li><strong>A category or a set:</strong> a value no win recorded.</li>
          <li><strong>A number:</strong> one outside every number recorded on its scale. Between two recorded numbers is covered.</li>
          <li><strong>Text and key parts:</strong> never new.</li>
        </ul>
        <h2>Open and closed categories</h2>
        <p>
          A category that lists its <code>values</code> is closed: a record or a question with anything else is
          refused. A category that lists none is open, and Ada learns other ways its values are said
          (<a href={`${DOCS}/ada`}>Values said another way</a>): a question for <code>software as a service</code>{' '}
          reaches records that say <code>saas</code>, scores below 1, and is never exact.
        </p>
        <ul>
          <li><strong>Only open categories are sent</strong> to the language model that builds the lexicon, once per value. Never a key part, a set, a text, a number, a closed category, or any role under a <code>security_weight</code>.</li>
          <li><strong>A local model sends nothing.</strong></li>
        </ul>
        <h2>Learned weights</h2>
        <p>
          Once a typed model has 10 or more wins, <code>ada_learn</code> works out which roles decide. It holds
          out each of the newest 100 wins, scores it against the rest the way a question is scored, and moves one
          role&rsquo;s <code>similarity_weight</code> at a time while the held-out outcomes get more likely. A role
          that is different on every record ends at 0. The weights are saved in the spec, and the answer says how
          often the model predicted its held-out records before and after.
        </p>
        <Code lang="json">{`{ "weights": { "ticket.issue.component": 1, "ticket.issue.reporter": 0, "ticket.issue.severity": 0,
               "ticket.where.region": 0, "ticket.where.plan": 0, "meta.source.channel": 1 },
  "held_out_accuracy": { "before": 0.875, "after": 1 }, "held": 80, "scored": 80, "tau": 0.12, "size": 80 }`}</Code>
        <p>
          That is a model of 80 tickets where the component alone decides the team. A weight of 0 also means a
          new value under that role no longer stops the model from acting, so read what was learned before you
          rely on it. An admin can set any role&rsquo;s weight by hand with <code>ada_update_model</code>.
        </p>
      </>
    ),
  },
  {
    slug: 'ada-time',
    title: 'Versions and time',
    lede: 'Records that share their key parts are versions of one thing. Read its history, its trend and its next version.',
    body: (
      <>
        <p>
          In a <a href={`${DOCS}/ada-typed`}>typed model</a>, the roles marked <code>key_part</code> say which thing a
          record describes: a deal, a ticket, a device. Record the same thing again and it is a new version, placed
          by when it happened, not by when it arrived.
        </p>
        <ul>
          <li><strong>A query answers from what things are now.</strong> Each thing takes part as its newest version. Older versions are its history.</li>
          <li><strong>Leave the key parts out of a query</strong> to ask what a thing is like. Give them to follow one thing.</li>
          <li><strong>When it happened.</strong> A record takes its time from <code>at</code>, else from the spec&rsquo;s <code>temporal_source</code> role, else now.</li>
        </ul>
        <h2>History</h2>
        <p><code>ada_history</code> returns every version, oldest first, each with what changed since the one before.</p>
        <Code lang="json">{`{
  "version": 3, "ts": 1767312000, "outcome": "open",
  "data": { "deal": { "profile": { "stage": "proposal" }, "metrics": { "meetings": 4 } } },
  "changes": [
    { "path": "deal.metrics.meetings", "from": 3, "to": 4, "score": 0.95 },
    { "path": "deal.profile.stage", "from": "discovery", "to": "proposal", "score": 0 }
  ],
  "change": 0.525
}`}</Code>
        <Row k="changes">Each role that differs: its path, both values, and how close they are by the role&rsquo;s type.</Row>
        <Row k="change">How far the whole version moved from the one before, 0 to 1.</Row>
        <p>In a flat model, <code>ada_history</code> returns every record of exactly that situation, wins and failures together.</p>
        <h2>Trend</h2>
        <p><code>ada_trend</code> says where one thing has been going.</p>
        <Row k="drift">How far the latest version is from the first.</Row>
        <Row k="pace">How far one version is from the one before, on average.</Row>
        <Row k="period">After how many steps the thing is back where it was, every time. Null when it does not repeat.</Row>
        <Row k="roles">Per role: a number&rsquo;s <code>slope_per_day</code>, how well a line fits it (<code>fit</code>) and its <code>direction</code>; for anything else, how many times it changed and since when it has held its latest value.</Row>
        <h2>Predict</h2>
        <p>
          <code>ada_predict</code> returns the thing&rsquo;s next version as data in the model&rsquo;s shape. It needs
          two versions. Pass <code>at</code> for a time; left out, it is one usual step after the latest version.
        </p>
        <div className="dx-table">
          <table>
            <thead><tr><th><code>basis</code></th><th>The role goes</th><th><code>confidence</code></th></tr></thead>
            <tbody>
              <tr><td><code>trend</code></td><td>Where the line through its numbers goes, kept on its scale</td><td>How well the line fits</td></tr>
              <tr><td><code>own_history</code></td><td>Where it went from this value before, in this thing</td><td>The share of times that value followed</td></tr>
              <tr><td><code>model</code></td><td>Where it went from this value in the model&rsquo;s other things</td><td>The share of times that value followed</td></tr>
              <tr><td><code>unchanged</code></td><td>Nowhere: nothing says it moves</td><td>Null</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <code>answer</code> is what a query returns for the predicted version, with the thing itself left out:
          what the model&rsquo;s other things say about where this one is heading.
        </p>
        <Note kind="warn" title="A prediction is arithmetic on the past">
          A number follows its own straight line and a category follows what came after it before. Read{' '}
          <code>basis</code> and <code>confidence</code> on each role before acting on one.
        </Note>
      </>
    ),
  },
  {
    slug: 'ada-gql',
    title: 'Query language',
    lede: 'GQL: eleven statements over a model’s records and the relations between them, for what a single question does not cover.',
    body: (
      <>
        <p>
          A query asks one thing: what do situations like this one resolve to. GQL asks the rest: which records
          meet a condition, how alike two things are at one level, how far a thing has moved. Send one statement
          with <code>ada_gql</code>, or <code>{'{"op": "gql", "model_id": "am_…", "query": "…"}'}</code>.
          No model runs it, and the same statement always returns the same answer.
        </p>
        <h2>Statements</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Statement</th><th>Returns</th></tr></thead>
            <tbody>
              <tr><td><code>FIND SIMILAR TO (data | glyph) [AT level] [WHERE condition] [LIMIT n] [THRESHOLD x]</code></td><td>The nearest things, each with its score</td></tr>
              <tr><td><code>LIST ALL [WHERE condition] [LIMIT n]</code></td><td>The records that meet the condition, newest first</td></tr>
              <tr><td><code>COUNT ALL [WHERE condition]</code></td><td>How many there are</td></tr>
              <tr><td><code>AGGREGATE (COUNT | AVG | MIN | MAX | SUM) [path] [WHERE condition] [GROUP BY path, …]</code></td><td>One value per group</td></tr>
              <tr><td><code>COMPARE glyph TO glyph [AT level]</code></td><td>How alike two things are, with the fact tree</td></tr>
              <tr><td><code>DETECT DRIFT FROM glyph TO glyph [AT level] [THRESHOLD x]</code></td><td>How far apart they are, what changed, and whether that is past the threshold</td></tr>
              <tr><td><code>INTROSPECT glyph DECOMPOSE BY (LAYER | SEGMENT | ROLE)</code></td><td>What a thing is made of, part by part, with each part&rsquo;s weight</td></tr>
              <tr><td><code>TREND glyph OVER duration [AT level] [ALERT ON field op number]</code></td><td>Where a thing has been going inside a window</td></tr>
              <tr><td><code>PREDICT glyph [AT ROLE path] [WINDOW duration]</code></td><td>Its next version</td></tr>
              <tr><td><code>FOLLOW glyph [OUT | IN | BOTH] [VIA path, …] [DEPTH n] [WHERE condition] [LIMIT n]</code></td><td>The things reached along relations, and every edge walked</td></tr>
              <tr><td><code>PATH FROM glyph TO glyph [OUT | IN | BOTH] [VIA path, …] [DEPTH n]</code></td><td>The shortest chain of relations between two things</td></tr>
            </tbody>
          </table>
        </div>
        <p>Keywords are in any case, and a statement&rsquo;s optional clauses are in any order.</p>
        <h2>The parts of a statement</h2>
        <Row k="data">A JSON object in the model&rsquo;s shape, as in a query: <code>{'{"deal": {"profile": {"stage": "closed"}}}'}</code>.</Row>
        <Row k="glyph">One thing. <code>glyph(&quot;d1&quot;)</code> names it by its key parts, in the order the spec gives them; <code>glyph(&quot;d1@2&quot;)</code> is its second version. In a model without key parts it is one record, by its id.</Row>
        <Row k="level">Where to measure: <code>CORTEX</code> (the whole, the default), <code>LAYER a</code>, <code>SEGMENT a.b</code> or <code>ROLE a.b.c</code>.</Row>
        <Row k="condition">A path compared with a value by <code>=</code> <code>!=</code> <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code>, joined by <code>AND</code>, <code>OR</code>, <code>NOT</code> and brackets. <code>outcome</code>, <code>store</code> and <code>ts</code> are paths too.</Row>
        <Row k="duration">A whole number and <code>d</code>, <code>h</code>, <code>m</code> or <code>s</code>: <code>30d</code>, <code>12h</code>.</Row>
        <Row k="$name">A parameter, where a value goes. Its value comes from <code>args</code>. See below.</Row>
        <h2>Conditions</h2>
        <ul>
          <li><strong>A role a record does not carry satisfies nothing,</strong> <code>!=</code> included. Use <code>NOT</code> to ask for the records without it.</li>
          <li><strong>A set equals a value it holds:</strong> <code>deal.profile.tags = eu</code> is true for a record tagged <code>eu</code>.</li>
          <li><strong><code>&lt;</code> and <code>&gt;</code> compare numbers only.</strong></li>
          <li><strong>A reader sees what their team may.</strong> A role above their clearance is not there to compare.</li>
        </ul>
        <h2>Find</h2>
        <Code>{`FIND SIMILAR TO {"deal": {"profile": {"stage": "closed"}, "metrics": {"meetings": 8}}}
  WHERE outcome = "won" LIMIT 3`}</Code>
        <Code lang="json">{`{ "statement": "find", "level": "cortex", "threshold": 0.4, "count": 1,
  "matches": [ { "key": "34412f715fb0", "id": "e865d7e67d6c", "store": "wins", "outcome": "won",
                 "score": 0.975, "count": 3, "first": 1767225600, "latest": 1767398400 } ] }`}</Code>
        <p>
          <code>THRESHOLD</code> is the lowest score to return; left out, it is the model&rsquo;s floor of 0.4.{' '}
          <code>AT ROLE deal.metrics.meetings</code> ranks by that one role. <code>FIND SIMILAR TO glyph(&quot;d1&quot;)</code>{' '}
          finds the things like a thing, never itself. FIND measures; it does not decide. For a verdict, use a query.
        </p>
        <h2>Compare and drift</h2>
        <Code>{`COMPARE glyph("d1") TO glyph("d2") AT SEGMENT deal.metrics`}</Code>
        <Code lang="json">{`{ "statement": "compare", "level": "deal.metrics", "score": 0.85,
  "tree": { "key": "metrics", "score": 0.85, "children": [
    { "key": "meetings", "score": 0.85, "match": "near", "query": 6, "record": 9 } ] } }`}</Code>
        <Code>{`DETECT DRIFT FROM glyph("d1@1") TO glyph("d1") AT LAYER deal THRESHOLD 0.2`}</Code>
        <Code lang="json">{`{ "statement": "drift", "level": "deal", "drift": 0.35, "threshold": 0.2, "drifted": true,
  "changes": [ { "path": "deal.metrics.meetings", "from": 2, "to": 6, "score": 0.8 },
               { "path": "deal.profile.stage", "from": "discovery", "to": "negotiation", "score": 0 } ] }`}</Code>
        <p>
          Drift is 1 minus the score at the level. Without <code>THRESHOLD</code>, <code>drifted</code> is null: the
          statement measured, and gave no verdict.
        </p>
        <h2>Count and aggregate</h2>
        <Code>{`COUNT ALL WHERE deal.metrics.meetings > 6
AGGREGATE AVG deal.metrics.meetings GROUP BY outcome`}</Code>
        <Code lang="json">{`{ "statement": "aggregate", "function": "avg", "path": "deal.metrics.meetings",
  "groups": [ { "by": { "outcome": "open" }, "value": 6, "count": 1 },
              { "by": { "outcome": "won" }, "value": 9, "count": 1 } ] }`}</Code>
        <p>
          These read what things are now: in a model with key parts, each thing as its newest version. Only
          numbers are averaged or summed.
        </p>
        <h2>Trend and predict</h2>
        <Code>{`TREND glyph("d1") OVER 30d ALERT ON drift > 0.1
PREDICT glyph("d1") WINDOW 7d`}</Code>
        <p>
          These are <a href={`${DOCS}/ada-time`}>Versions and time</a> as statements. <code>TREND</code> reads the
          versions inside the window and adds <code>alert</code>, which compares <code>drift</code>,{' '}
          <code>pace</code> or <code>versions</code> with a number and says whether it <code>fired</code>.{' '}
          <code>PREDICT</code> is for the latest version plus the window. Both need a typed model with key parts.
        </p>
        <h2>Follow and path</h2>
        <Code>{`FOLLOW glyph("db") IN DEPTH 3
PATH FROM glyph("web") TO glyph("db")`}</Code>
        <p>
          These walk the relations a model&rsquo;s <code>ref</code> roles make, across models.{' '}
          <a href={`${DOCS}/ada-graph`}>Relations and the graph</a> covers them.
        </p>
        <h2>Parameters</h2>
        <p>
          Software should never build a statement out of strings. Write <code>$name</code> where a value goes and
          send the values in <code>args</code>:
        </p>
        <Code lang="json">{`{ "op": "gql", "model_id": "am_0123456789ab",
  "query": "FIND SIMILAR TO $like WHERE outcome = $outcome LIMIT $n",
  "args": { "like": { "deal": { "profile": { "stage": "closed" } } }, "outcome": "won", "n": 3 } }`}</Code>
        <p>
          A parameter can stand for a value in a comparison, a glyph&rsquo;s key part, FIND&rsquo;s target, and the
          number after <code>LIMIT</code>, <code>THRESHOLD</code> and <code>DEPTH</code>. It is placed in the parsed
          statement, never in its text, and checked for the place it takes, so a value cannot become part of a
          statement. A statement you run often can be saved under a name: see{' '}
          <a href={`${DOCS}/ada-procedures`}>Stored procedures</a>.
        </p>
        <h2>Cached</h2>
        <p>
          Every answer says <code>cached</code>. An answer is given again only for the same statement, by meaning,
          and only while nothing it read has changed. <a href={`${DOCS}/ada-procedures`}>Stored procedures</a> has the
          rules.
        </p>
        <h2>Errors</h2>
        <p>A statement that is not GQL is refused, saying what was expected and where:</p>
        <Code lang="json">{`{ "error": { "code": "E_VALIDATION",
  "message": "query: expected TO (at character 20)" } }`}</Code>
        <Note title="What GQL does not do">
          It reads. Nothing in it writes a record.
        </Note>
      </>
    ),
  },
  {
    slug: 'ada-edges',
    title: 'Edges and levels',
    lede: 'Two things can be alike as a whole and different in one part. An edge is the measurement at one level.',
    body: (
      <>
        <p>
          A glyph is hierarchical, so likeness is too. The same two deals can match on their profile and differ
          on their metrics. Ada measures at any of four levels, and the answer at each is exact.
        </p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Level</th><th>Measures</th><th>Written as</th></tr></thead>
            <tbody>
              <tr><td>Cortex</td><td>The whole thing</td><td><code>cortex</code></td></tr>
              <tr><td>Layer</td><td>One layer</td><td><code>deal</code></td></tr>
              <tr><td>Segment</td><td>One segment of a layer</td><td><code>deal.metrics</code></td></tr>
              <tr><td>Role</td><td>One value</td><td><code>deal.metrics.meetings</code></td></tr>
            </tbody>
          </table>
        </div>
        <p>In a flat model the levels are the keys of its JSON, by path.</p>
        <h2>Two kinds of edge</h2>
        <Row k="Neural">Between two things: how alike they are at the level.</Row>
        <Row k="Temporal">Between two versions of one thing: how much it changed at the level, which is 1 minus how alike they are.</Row>
        <p>
          Both are measured. A relation one thing names, such as the service it depends on, is stated, and
          is a third thing: <a href={`${DOCS}/ada-graph`}>Relations and the graph</a>. <code>ada_edges</code> returns
          a thing&rsquo;s <code>relations</code> too, out and in.
        </p>
        <h2>A thing&rsquo;s edges</h2>
        <p>
          <code>ada_edges</code> takes a thing, by its key parts, and a level. It returns the things nearest it
          there, and the change between each of its versions and the next.
        </p>
        <Code lang="json">{`{ "op": "edges", "model_id": "am_0123456789ab",
  "situation": { "deal": { "identity": { "deal_id": "d1" } } },
  "level": "deal.metrics" }`}</Code>
        <Code lang="json">{`{ "key": "e9268d61334f", "level": "deal.metrics",
  "neural": [ { "target": "34412f715fb0", "outcome": "won", "score": 0.85 } ],
  "temporal": [
    { "from": 1, "to": 2, "change": 0.1,
      "changes": [ { "path": "deal.metrics.meetings", "from": 2, "to": 4, "score": 0.9 } ] },
    { "from": 2, "to": 3, "change": 0.1,
      "changes": [ { "path": "deal.metrics.meetings", "from": 4, "to": 6, "score": 0.9 } ] } ],
  "relations": { "out": [], "in": [] } }`}</Code>
        <p>
          At the cortex the same two deals score 0.34: they have different owners and are at different stages.
          On their metrics alone they score 0.85. Which level you ask at is part of the question.
        </p>
        <ul>
          <li><strong>A thing is never its own neighbour.</strong></li>
          <li><strong>A neighbour that shares nothing at the level is left out.</strong></li>
          <li><strong>In a model without key parts</strong> the situation you send is the thing, and it has no versions.</li>
          <li><strong>Clearance applies.</strong> A level above the reader&rsquo;s clearance is refused.</li>
        </ul>
        <h2>The same edges, in GQL</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>You want</th><th>Statement</th></tr></thead>
            <tbody>
              <tr><td>The edge between two things</td><td><code>COMPARE glyph(&quot;d1&quot;) TO glyph(&quot;d2&quot;) AT SEGMENT deal.metrics</code></td></tr>
              <tr><td>The edge between two versions</td><td><code>DETECT DRIFT FROM glyph(&quot;d1@1&quot;) TO glyph(&quot;d1&quot;) AT LAYER deal</code></td></tr>
              <tr><td>The nearest things at a level</td><td><code>FIND SIMILAR TO glyph(&quot;d1&quot;) AT ROLE deal.metrics.meetings</code></td></tr>
            </tbody>
          </table>
        </div>
        <p>See the <a href={`${DOCS}/ada-gql`}>Query language</a>.</p>
      </>
    ),
  },
  {
    slug: 'ada-graph',
    title: 'Relations and the graph',
    lede: 'A ref role names another thing. Things are the nodes, ref roles are the edges, and your typed models are one graph.',
    body: (
      <>
        <p>
          Likeness is measured. A relation is stated: this service depends on that one, this ticket belongs to that
          account. In a <a href={`${DOCS}/ada-typed`}>typed model</a>, a role of type <code>ref</code> holds the key of
          another thing. Ada keeps those as a graph you can walk, in the same model or across models.
        </p>
        <h2>A ref role</h2>
        <Code lang="json">{`{ "name": "services", "layers": [ { "name": "svc", "segments": [
  { "name": "id", "roles": [
    { "name": "name", "type": "category", "key_part": true, "similarity_weight": 0 } ] },
  { "name": "shape", "roles": [ { "name": "kind", "type": "category" } ] },
  { "name": "links", "roles": [
    { "name": "depends_on", "type": "ref", "many": true },
    { "name": "account", "type": "ref", "to": "am_a6de04b63e8b", "strict": true } ] } ] } ] }`}</Code>
        <Row k="to">The model the role points into. Left out, it points into its own model.</Row>
        <Row k="many">The role takes a list of things.</Row>
        <Row k="strict">A record that names a thing not on record is refused.</Row>
        <p>
          A ref&rsquo;s value is the other thing&rsquo;s key part: <code>&quot;acme&quot;</code>, or a list of its
          parts when it has several. A model with a ref role must have key parts itself, since a thing has to be
          a node to be the end of an edge.
        </p>
        <Code lang="json">{`{ "op": "record", "model_id": "am_b644160cbd8b", "outcome": "ok",
  "situation": { "svc": { "id": { "name": "web" }, "shape": { "kind": "http" },
                          "links": { "depends_on": ["api"], "account": "acme" } } } }`}</Code>
        <h2>Follow</h2>
        <p>Everything <code>web</code> reaches within two relations:</p>
        <Code>{`FOLLOW glyph("web") DEPTH 2`}</Code>
        <Code lang="json">{`{ "statement": "follow", "direction": "out", "depth": 2, "count": 3, "truncated": false,
  "from": { "model_id": "am_b644160cbd8b", "key": "bde1489624c3", "data": { "svc": { "id": { "name": "web" }, … } } },
  "nodes": [
    { "model_id": "am_a6de04b63e8b", "key": "eb737e40d6ac", "hops": 1, "outcome": "active",
      "data": { "account": { "id": { "account_id": "acme" }, "plan": { "tier": "pro" } } } },
    { "model_id": "am_b644160cbd8b", "key": "63e3a42fcd0c", "hops": 1, "outcome": "ok",
      "data": { "svc": { "id": { "name": "api" }, … } } },
    { "model_id": "am_b644160cbd8b", "key": "41a21b0d157a", "hops": 2, "outcome": "ok",
      "data": { "svc": { "id": { "name": "db" }, … } } } ],
  "edges": [
    { "from": { "model_id": "am_b644160cbd8b", "key": "bde1489624c3" }, "relation": "svc.links.depends_on",
      "to": { "model_id": "am_b644160cbd8b", "key": "63e3a42fcd0c", "parts": ["api"] }, "missing": false },
    … ] }`}</Code>
        <Row k="OUT, IN, BOTH">Along the relations a thing has (the default), against them, or both. <code>{'FOLLOW glyph("db") IN DEPTH 3'}</code> is everything that depends on <code>db</code>.</Row>
        <Row k="VIA">Only these relations, by path: <code>VIA svc.links.depends_on</code>.</Row>
        <Row k="DEPTH">How many relations away to go. 1 when left out, 8 at most.</Row>
        <Row k="WHERE">Which of the things reached to return. The walk still goes through the rest.</Row>
        <Row k="OF">A thing of another model: <code>{'glyph("acme") OF am_a6de04b63e8b'}</code>.</Row>
        <h2>Path</h2>
        <Code>{`PATH FROM glyph("web") TO glyph("db")`}</Code>
        <Code lang="json">{`{ "statement": "path", "found": true, "hops": 2, "direction": "both", "depth": 6,
  "nodes": [ { "key": "bde1489624c3", … }, { "key": "63e3a42fcd0c", … }, { "key": "41a21b0d157a", … } ],
  "edges": [ { "relation": "svc.links.depends_on", "to": { "parts": ["api"], … } },
             { "relation": "svc.links.depends_on", "to": { "parts": ["db"], … } } ] }`}</Code>
        <p>
          The shortest chain, as its things and its edges in order. When there is none within the depth,{' '}
          <code>found</code> is false. A path goes both ways along relations unless you say <code>OUT</code> or{' '}
          <code>IN</code>.
        </p>
        <h2>What you can rely on</h2>
        <ul>
          <li><strong>The same walk returns the same answer.</strong> It is breadth first in one fixed order, cycles included: a thing is visited once.</li>
          <li><strong>A walk is bounded.</strong> At most 8 relations deep and 5,000 things. Past that, <code>truncated</code> is true.</li>
          <li><strong>A relation to nothing is kept and marked.</strong> Without <code>strict</code>, an edge to a thing not on record comes back with <code>missing: true</code>. So does an edge to a thing deleted later.</li>
          <li><strong>The graph is of things as they are now.</strong> A thing&rsquo;s relations are those of its newest version. <a href={`${DOCS}/ada-time`}>Its history</a> shows a relation changing like any role.</li>
          <li><strong>Clearance applies per model.</strong> A ref role above the reader&rsquo;s clearance is not followed, and a model above it is not walked into: its things read as missing.</li>
        </ul>
        <h2>Relations also score</h2>
        <p>
          A ref is part of the glyph like any role. Two things that point at the same things are alike: one target
          is the same or it is not, and a list of targets scores by the share they have in common. A target no
          thing ever named is new, so a query that carries it does not act
          (<a href={`${DOCS}/ada-act`}>When Ada acts</a>).
        </p>
        <Code>{`FIND SIMILAR TO {"svc": {"links": {"depends_on": ["db", "queue"], "account": "acme"}}}`}</Code>
        <h2>One thing&rsquo;s relations</h2>
        <p>
          <code>ada_edges</code> returns <code>relations</code> beside a thing&rsquo;s measured edges:{' '}
          <code>out</code>, what it names, and <code>in</code>, what names it, each in the edge shape above.
        </p>
      </>
    ),
  },
  {
    slug: 'ada-procedures',
    title: 'Stored procedures',
    lede: 'A GQL statement saved with a model under a name, with parameters. And when an answer is served from the cache.',
    body: (
      <>
        <p>
          An agent works out the statement once. Software then calls it by name, with values. The statement lives
          with the model, so changing it does not mean shipping your application again.
        </p>
        <h2>Save one</h2>
        <Code lang="json">{`{ "op": "save_procedure", "model_id": "am_3e6ce47eb910", "name": "by_outcome",
  "query": "LIST ALL WHERE outcome = $outcome LIMIT $n",
  "description": "Deals with an outcome." }`}</Code>
        <Code lang="json">{`{ "name": "by_outcome", "query": "LIST ALL WHERE outcome = $outcome LIMIT $n",
  "description": "Deals with an outcome.", "params": ["outcome", "n"] }`}</Code>
        <p>
          The statement is parsed when it is saved, so a procedure on record is one that runs. Saving under a name
          that exists replaces it. Saving and deleting are for org admins; any member may call one.
        </p>
        <h2>Call it</h2>
        <Code lang="json">{`{ "op": "call", "model_id": "am_3e6ce47eb910", "name": "by_outcome",
  "args": { "outcome": "won", "n": 5 } }`}</Code>
        <Code lang="json">{`{ "statement": "list", "procedure": "by_outcome", "cached": false, "count": 1,
  "records": [ { "key": "34412f715fb0", "outcome": "won", "data": { "deal": { … } } } ] }`}</Code>
        <p>
          The answer is the statement&rsquo;s own, as in the <a href={`${DOCS}/ada-gql`}>Query language</a>, with the
          procedure&rsquo;s name. A parameter that is missing, or a value that does not fit the place it takes, is
          refused with <code>E_VALIDATION</code>. A value is placed in the parsed statement, never in its text.
        </p>
        <h2>The cache</h2>
        <p>
          The answer to a GQL statement, called by name or sent whole, is kept. Every answer says{' '}
          <code>cached</code>.
        </p>
        <ul>
          <li><strong>It matches by meaning, exactly.</strong> Spelling of keywords, spacing, the order of optional clauses and of a JSON object&rsquo;s keys do not matter. Nothing else matches: two different questions never share an answer.</li>
          <li><strong>It is never stale.</strong> An answer is given again only while every model it read is where it was. A record written, edited or deleted, a spec set, or a clearance changed makes the next ask a miss. For a statement that walked the graph, so does a model created or deleted.</li>
          <li><strong>It is per reader.</strong> An answer read at one clearance is not given to another.</li>
        </ul>
        <p>
          <code>ada_models</code> with a model&rsquo;s id returns its <code>cache</code> counts: <code>hits</code>,{' '}
          <code>misses</code>, <code>invalidations</code>, <code>evictions</code>, <code>hit_rate</code> and{' '}
          <code>entries</code>.
        </p>
      </>
    ),
  },
  {
    slug: 'ada-sdk',
    title: 'SDKs',
    lede: 'Call a model from your software: @glyphh-ai/glyphh for TypeScript, glyphh for Python.',
    body: (
      <>
        <p>
          An agent builds a model. Your software calls it, with no agent in the path. The SDKs wrap{' '}
          <a href={`${DOCS}/ada-tools`}>POST /ada</a>: every answer is typed, and every refusal is one error type with
          a code. Neither has dependencies.
        </p>
        <Code lang="bash">{`npm install @glyphh-ai/glyphh
pip install glyphh`}</Code>
        <p>
          Create a key on the console&rsquo;s Virtual Keys page and set <code>GLYPHH_API_KEY</code>, or pass it in.
        </p>
        <h2>Ask and branch</h2>
        <Code lang="ts">{`import { Ada } from "@glyphh-ai/glyphh";

const ada = new Ada();
const tickets = ada.model("am_0123456789ab");

const answer = await tickets.query({ ticket: { issue: { component: "kubelet", symptom: "crash_on_boot" } } });

if (answer.act) route(answer.top);
else if (answer.reason === "unseen") askSomeone(answer.unseen);`}</Code>
        <Code lang="python">{`from glyphh import Ada

ada = Ada()
tickets = ada.model("am_0123456789ab")

answer = tickets.query({"ticket": {"issue": {"component": "kubelet", "symptom": "crash_on_boot"}}})

if answer["act"]:
    route(answer["top"])
elif answer["reason"] == "unseen":
    ask_someone(answer["unseen"])`}</Code>
        <p>
          <code>act</code> is the one thing to branch on. <a href={`${DOCS}/ada-act`}>When Ada acts</a> covers each{' '}
          <code>reason</code>.
        </p>
        <h2>Record</h2>
        <Code lang="ts">{`await tickets.record(situation, "route_to_platform");
await tickets.veto(situation, "route_to_network");
await tickets.record(situation, "route_to_platform", { at: "2026-01-03T10:00:00Z" });`}</Code>
        <Code lang="python">{`tickets.record(situation, "route_to_platform")
tickets.veto(situation, "route_to_network")
tickets.record(situation, "route_to_platform", at="2026-01-03T10:00:00Z")`}</Code>
        <h2>What a model does</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>TypeScript</th><th>Python</th><th>Is</th></tr></thead>
            <tbody>
              <tr><td><code>query</code>, <code>facts</code>, <code>check</code></td><td>the same</td><td>Ask, explain, and test one outcome</td></tr>
              <tr><td><code>record</code>, <code>veto</code></td><td>the same</td><td>A graded win or failure</td></tr>
              <tr><td><code>history</code>, <code>trend</code>, <code>predict</code></td><td>the same</td><td><a href={`${DOCS}/ada-time`}>Versions and time</a></td></tr>
              <tr><td><code>edges</code></td><td>the same</td><td><a href={`${DOCS}/ada-edges`}>Edges and levels</a>, with a thing&rsquo;s relations</td></tr>
              <tr><td><code>gql(query, args)</code></td><td>the same</td><td>One <a href={`${DOCS}/ada-gql`}>GQL</a> statement, with its parameters</td></tr>
              <tr><td><code>call</code>, <code>procedures</code>, <code>saveProcedure</code>, <code>deleteProcedure</code></td><td><code>call</code>, <code>procedures</code>, <code>save_procedure</code>, <code>delete_procedure</code></td><td><a href={`${DOCS}/ada-procedures`}>Stored procedures</a></td></tr>
              <tr><td><code>info</code>, <code>update</code>, <code>delete</code>, <code>records</code>, <code>editRecord</code>, <code>deleteRecord</code></td><td><code>info</code>, <code>update</code>, <code>delete</code>, <code>records</code>, <code>edit_record</code>, <code>delete_record</code></td><td>The model and its records</td></tr>
              <tr><td><code>calibrate</code>, <code>learn</code>, <code>contract</code></td><td>the same</td><td>Fit it, and read the schema of its data and answers</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          On the client: <code>models</code>, <code>createModel</code> (<code>create_model</code>),{' '}
          <code>devices</code>, <code>contract</code>, and <code>op(name, args)</code> for any operation by name.
        </p>
        <h2>GQL, typed</h2>
        <Code lang="ts">{`const near = await tickets.gql("FIND SIMILAR TO $like WHERE outcome = $outcome LIMIT 5",
  { like: situation, outcome: "won" });

if (near.statement === "find") for (const m of near.matches) console.log(m.key, m.score);`}</Code>
        <p>
          In TypeScript a GQL answer is a union: narrow it on <code>statement</code> and its fields are typed. In
          Python an answer is the dictionary the server sent, and the package&rsquo;s <code>TypedDict</code>s tell a
          type checker what is in it.
        </p>
        <h2>Errors</h2>
        <Code lang="ts">{`import { AdaError } from "@glyphh-ai/glyphh";

try {
  await tickets.query({ ticket: { issue: { severity: "high" } } });
} catch (e) {
  if (e instanceof AdaError && e.code === "E_VALIDATION") console.error(e.message);
  // situation: ticket.issue.severity: a numeric role takes a finite number
}`}</Code>
        <Code lang="python">{`from glyphh import AdaError

try:
    tickets.query({"ticket": {"issue": {"severity": "high"}}})
except AdaError as e:
    print(e.code, e.status, e.message)`}</Code>
        <p>
          The codes are those of <a href={`${DOCS}/ada-tools`}>POST /ada</a>, plus <code>E_UNREACHABLE</code> when a
          request never got an answer. On a rate limit the error carries how long to wait: <code>retryAfter</code>{' '}
          in TypeScript, <code>retry_after</code> in Python. A model that does not act is not an error.
        </p>
        <h2>Worked examples</h2>
        <ul>
          <li><a href="/docs/ada-guide-tickets">Route support tickets</a>, in Python: records, failures, learned weights, a stored procedure.</li>
          <li><a href="/docs/ada-guide-churn">Customer churn</a>, in TypeScript: accounts over time, trend and drift, typed GQL.</li>
        </ul>
        <Note title="The contract">
          Both SDKs are tested against the same recorded requests and answers, and against the JSON Schema that{' '}
          <code>{'{"op": "contract"}'}</code> returns. The source is in{' '}
          <a href="https://github.com/glyphh-ai/glyphh">glyphh-ai/glyphh</a>, under <code>sdk/</code>.
        </Note>
      </>
    ),
  },
  {
    slug: 'ada-guide-tickets',
    title: 'Guide: route support tickets',
    lede: 'Python, start to finish: a typed model from your ticket history, and one function your helpdesk calls.',
    body: (
      <>
        <p>
          You have a helpdesk and a history of tickets, each resolved by some team. This guide builds an Ada model from that history and ends with one function, <code>route(ticket)</code>, that your helpdesk calls for every new ticket. It routes the ones it has ground for, and hands the rest to a person with a reason. No language model runs when a ticket is routed, and the same ticket always gets the same answer.
        </p>
        <p>
          Everything below was run as written.
        </p>
        <h2>Before you start</h2>
        <Code lang="bash">{`pip install glyphh
export GLYPHH_API_KEY=sk-...`}</Code>
        <p>
          Create the key on the console&rsquo;s Virtual Keys page. Creating a model, and <code>learn</code> later on, need an org admin&rsquo;s key. Everything else works with any member&rsquo;s key. Every call is metered on your plan: this guide makes about 115.
        </p>
        <h2>1. Say what a ticket is</h2>
        <p>
          A typed model starts from a spec: every field of a ticket gets a type, and Ada compares each by its type. Two products are the same or they are not. Two severities are close when they are one step apart. Two summaries are close when they share words, even spelled a little differently.
        </p>
        <Code lang="python">{`from glyphh import Ada, AdaError

ada = Ada()

SPEC = {
    "name": "support-tickets",
    "layers": [{"name": "ticket", "segments": [
        {"name": "issue", "roles": [
            {"name": "product", "type": "category", "values": ["api", "billing", "dashboard", "mobile"]},
            {"name": "component", "type": "category"},
            {"name": "severity", "type": "number", "numeric_config": {"min_value": 1, "max_value": 5, "bin_width": 1}},
            {"name": "plan", "type": "category", "values": ["free", "pro", "enterprise"]},
        ]},
        {"name": "text", "similarity_weight": 0.5, "roles": [
            {"name": "summary", "type": "text", "text_encoding": "ngrams"},
        ]},
    ]}],
}

model = ada.create_model("support-tickets", spec=SPEC)`}</Code>
        <ul>
          <li><strong><code>product</code> and <code>plan</code> list their values.</strong> Anything else is refused with the path of the field that was wrong, before it is stored or scored.</li>
          <li><strong><code>component</code> lists none.</strong> New components will appear, and the model should notice when one does.</li>
          <li><strong>The summary counts half as much</strong> as the structured fields (<code>similarity_weight</code>).</li>
        </ul>
        <p>
          See <a href="/docs/ada-typed">Typed models</a> for every type.
        </p>
        <h2>2. Load what already happened</h2>
        <p>
          A record is a ticket and the team that resolved it. Pass <code>at</code>, when it happened, so history is in the right order. In your code the loop reads from your helpdesk; the example generates 96 tickets across eight components.
        </p>
        <Code lang="python">{`def ticket(product, component, severity, plan, summary=None):
    issue = {"product": product, "component": component, "severity": severity, "plan": plan}
    return {"ticket": {"issue": issue, **({"text": {"summary": summary}} if summary else {})}}

for situation, team, when in history():          # your helpdesk's resolved tickets
    model.record(situation, team, at=when)`}</Code>
        <h2>3. Ask about a new ticket</h2>
        <Code lang="python">{`new = ticket("api", "webhooks", 4, "pro", "webhook delivery fails with a 500")
answer = model.query(new)`}</Code>
        <Code lang="json">{`{ "act": true, "reason": "reflex", "top": "platform", "confidence": 1.0, "count": 16, "unseen": [] }`}</Code>
        <p>
          <code>act</code> is the one thing to branch on. It is true here because tickets like this one are on record, they agree, and nothing in the ticket is new. <code>count</code> is how many past tickets had a vote.
        </p>
        <h2>4. A ticket the model has no ground for</h2>
        <Code lang="python">{`odd = ticket("api", "sso", 3, "enterprise", "saml login fails for one tenant")
model.query(odd)`}</Code>
        <Code lang="json">{`{ "act": false, "reason": "unseen", "top": "platform", "unseen": ["ticket.issue.component=sso"] }`}</Code>
        <p>
          No ticket about <code>sso</code> was ever recorded. Ada still says which team is nearest, and says it has no ground to act: <code>unseen</code> names exactly what was new. This is the case to send to a person. <a href="/docs/ada-act">When Ada acts</a> covers every reason.
        </p>
        <h2>5. Record what the person decided</h2>
        <p>
          The model learns by being told what happened. Three tickets later it routes this kind on its own. There is no training run: a record counts from the next question.
        </p>
        <Code lang="python">{`for severity in (3, 4, 2):
    model.record(ticket("api", "sso", severity, "enterprise", "saml login fails for one tenant"), "identity")
model.query(odd)`}</Code>
        <Code lang="json">{`{ "act": true, "reason": "reflex", "top": "identity", "confidence": 1.0 }`}</Code>
        <h2>6. Record a route that was wrong</h2>
        <p>
          When a team bounces a ticket, record the failure with <code>veto</code>. A recorded failure as close as the wins, and newer than them, stops the model from making that call again for that situation. A later win for the same situation lifts it.
        </p>
        <Code lang="python">{`bounced = ticket("billing", "refunds", 5, "enterprise", "double charge needs refund")
before = model.query(bounced)          # act: true, top: "billing"
model.veto(bounced, before["top"])
model.query(bounced)`}</Code>
        <Code lang="json">{`{ "act": false, "reason": "vetoed", "top": "billing", "veto_match": 1.0 }`}</Code>
        <h2>7. Show why</h2>
        <p>
          Every answer can be explained. <code>facts</code> returns the nearest tickets as fact trees: field by field, what you asked, what was on record, and how close the two are.
        </p>
        <Code lang="python">{`why = model.facts(new, top=1)["wins"][0]`}</Code>
        <div className="dx-table">
          <table>
            <thead><tr><th>Field</th><th>This ticket</th><th>On record</th><th>Match</th><th>Score</th></tr></thead>
            <tbody>
              <tr><td>component</td><td>webhooks</td><td>webhooks</td><td>same</td><td>1.0</td></tr>
              <tr><td>plan</td><td>pro</td><td>pro</td><td>same</td><td>1.0</td></tr>
              <tr><td>product</td><td>api</td><td>api</td><td>same</td><td>1.0</td></tr>
              <tr><td>severity</td><td>4</td><td>3</td><td>near</td><td>0.75</td></tr>
              <tr><td>summary</td><td>webhook delivery fails with a 500</td><td>webhook deliveries failing</td><td>partial</td><td>0.4486</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The whole ticket scored 0.7745 against that one. Nothing here is a model&rsquo;s opinion: each number is arithmetic on the two values, by the field&rsquo;s type.
        </p>
        <h2>8. Learn which fields decide</h2>
        <p>
          Once the model has ten or more records, an org admin can ask it which fields decide. It holds out its newest tickets, predicts each from the rest, and moves one field&rsquo;s weight at a time while the predictions get better. The weights are saved in the spec.
        </p>
        <Code lang="python">{`fit = model.learn()`}</Code>
        <Code lang="json">{`{ "weights": { "ticket.issue.product": 1.0, "ticket.issue.component": 1.0, "ticket.issue.severity": 0.0,
               "ticket.issue.plan": 0.0, "ticket.text.summary": 1.0 },
  "held_out_accuracy": { "before": 1.0, "after": 1.0 } }`}</Code>
        <p>
          In this history, severity and plan say nothing about who resolves a ticket, so they end at 0. A field at 0 is no longer looked at, which also means a new value there no longer stops the model from acting. Read what was learned before you rely on it; an admin can set any weight by hand with <code>model.update(spec=...)</code>.
        </p>
        <h2>9. Save a question you ask every day</h2>
        <p>
          A <a href="/docs/ada-procedures">stored procedure</a> is a <a href="/docs/ada-gql">GQL</a> statement saved with the model under a name. Your code calls it by name with values, and you can change the statement without shipping your application again.
        </p>
        <Code lang="python">{`model.save_procedure(
    "load_by_team",
    "AGGREGATE COUNT WHERE store = wins AND ticket.issue.severity >= $severity GROUP BY outcome",
    "How many tickets at or above a severity each team resolved.")
load = model.call("load_by_team", {"severity": 4})
{g["by"]["outcome"]: g["value"] for g in load["groups"]}`}</Code>
        <Code lang="json">{`{ "billing": 9, "frontend": 10, "identity": 6, "mobile": 7, "platform": 9 }`}</Code>
        <h2>10. The function your helpdesk calls</h2>
        <Code lang="python">{`def route(new_ticket):
    try:
        answer = model.query(new_ticket)
    except AdaError as e:
        if e.code == "E_RATE_LIMITED":
            return {"queue": "triage", "because": f"retry in {e.retry_after}s"}
        raise
    if answer["act"]:
        return {"queue": answer["top"], "because": f"{answer['count']} tickets like it, confidence {answer['confidence']}"}
    return {"queue": "triage", "because": answer["reason"], "suggest": answer["top"], "new": answer["unseen"]}`}</Code>
        <Code lang="python">{`route(ticket("api", "webhooks", 4, "pro", "webhook delivery fails with a 500"))
# {"queue": "platform", "because": "12 tickets like it, confidence 1.0"}

route(ticket("dashboard", "charts", 2, "free"))
# {"queue": "frontend", "because": "12 tickets like it, confidence 1.0"}

route(ticket("mobile", "widgets", 1, "free"))
# {"queue": "triage", "because": "unseen", "suggest": "identity", "new": ["ticket.issue.component=widgets"]}`}</Code>
        <p>
          That is the whole integration: route when <code>act</code> is true, send the rest to a person with the reason and the suggestion, and record what the person decides.
        </p>
        <Note title="Where to go next">
          <a href="/docs/ada-act">When Ada acts</a> for every reason and how to tune the bar,{' '}
          <a href="/docs/ada-gql">the query language</a> for reporting on the model, and the{' '}
          <a href="/docs/ada-guide-churn">customer churn guide</a> for records that change over time.
        </Note>
      </>
    ),
  },
  {
    slug: 'ada-guide-churn',
    title: 'Guide: customer churn',
    lede: 'TypeScript, start to finish: accounts that change over time, and one function your success tooling calls.',
    body: (
      <>
        <p>
          You have accounts, a few usage numbers for each, month by month, and you know how past terms ended. This guide builds an Ada model from the accounts that already renewed or churned, and ends with one function, <code>risk(account)</code>, that your success tooling calls for a live account. It also shows what Ada does with records that change over time: versions, trend and drift.
        </p>
        <p>
          Everything below was run as written.
        </p>
        <h2>Before you start</h2>
        <Code lang="bash">{`npm install @glyphh-ai/glyphh
export GLYPHH_API_KEY=sk-...`}</Code>
        <p>
          Create the key on the console&rsquo;s Virtual Keys page. Creating a model needs an org admin&rsquo;s key. Every call is metered on your plan: this guide makes about 200.
        </p>
        <h2>1. Say what an account is</h2>
        <Code lang="ts">{`import { Ada, AdaError, type Answer, type Spec } from "@glyphh-ai/glyphh";

const ada = new Ada();

const SPEC: Spec = {
  name: "renewals",
  layers: [{ name: "account", segments: [
    { name: "identity", roles: [{ name: "account_id", type: "category", key_part: true, similarity_weight: 0 }] },
    { name: "profile", similarity_weight: 0.5, roles: [
      { name: "plan", type: "category", values: ["starter", "growth", "scale"] },
      { name: "industry", type: "category" },
    ] },
    { name: "usage", roles: [
      { name: "seats", type: "number", numeric_config: { min_value: 0, max_value: 200, bin_width: 10 } },
      { name: "logins_per_seat", type: "number", numeric_config: { min_value: 0, max_value: 10, bin_width: 1 } },
      { name: "open_tickets", type: "number", numeric_config: { min_value: 0, max_value: 10, bin_width: 1 } },
      { name: "features_used", type: "number", numeric_config: { min_value: 0, max_value: 12, bin_width: 1 } },
    ] },
  ] }],
};

const model = await ada.createModel({ name: "renewals", storage: "cloud", spec: SPEC });`}</Code>
        <ul>
          <li><strong><code>account_id</code> is a key part.</strong> Records that share it are versions of one account. It weighs 0: which account it is should not decide how alike two accounts are.</li>
          <li><strong>Each number has a scale.</strong> Two accounts with 6 and 7 logins per seat are close; 6 and 1 are far. The bin width says how fine the difference is.</li>
          <li><strong>The profile counts half as much as the usage.</strong></li>
        </ul>
        <h2>2. Load the accounts whose terms have ended</h2>
        <p>
          Record each monthly snapshot with how the term ended and when the snapshot was taken. The example loads 60 accounts with three snapshots each; in your code the loop reads from your warehouse.
        </p>
        <Code lang="ts">{`const snapshot = (a: Account) => ({
  account: {
    ...(a.id ? { identity: { account_id: a.id } } : {}),
    profile: { plan: a.plan, industry: a.industry },
    usage: a.usage,
  },
});

for (const { account, month, outcome } of past())            // your warehouse
  await model.record(snapshot(account), outcome, { at: T0 + month * MONTH });

await model.calibrate();`}</Code>
        <p>
          The model now holds 60 accounts, each as its newest snapshot, with every earlier version kept behind it. <code>calibrate</code> fits the model&rsquo;s probabilities to its own records; run it once you have ten or more, and again as the model grows.
        </p>
        <h2>3. Ask about a live account</h2>
        <p>
          Leave the id out. The question is not about one account on record; it is what happened to accounts like this one.
        </p>
        <Code lang="ts">{`const sliding = { plan: "growth", industry: "saas", usage: { seats: 40, logins_per_seat: 2, open_tickets: 6, features_used: 3 } };
const healthy = { plan: "growth", industry: "saas", usage: { seats: 60, logins_per_seat: 7, open_tickets: 0, features_used: 9 } };

await model.query(snapshot(sliding));
await model.query(snapshot(healthy));`}</Code>
        <Code lang="json">{`{ "act": true, "reason": "reflex", "top": "churned", "confidence": 0.9443, "count": 47,
  "outcomes": { "churned": 0.9443, "renewed": 0.0557 }, "unseen": [] }

{ "act": true, "reason": "reflex", "top": "renewed", "confidence": 0.9998, "count": 53,
  "outcomes": { "renewed": 0.9998, "churned": 0.0002 }, "unseen": [] }`}</Code>
        <p>
          <code>outcomes</code> is the vote of the past accounts close enough to count, the nearest weighing most. <code>act</code> is true because the vote is clear and nothing about the account is new.
        </p>
        <h2>4. Show why</h2>
        <Code lang="ts">{`const why = (await model.facts(snapshot(sliding), { top: 1 })).wins[0];`}</Code>
        <div className="dx-table">
          <table>
            <thead><tr><th>Field</th><th>This account</th><th>Nearest past account</th><th>Match</th><th>Score</th></tr></thead>
            <tbody>
              <tr><td>logins_per_seat</td><td>2</td><td>2</td><td>same</td><td>1</td></tr>
              <tr><td>open_tickets</td><td>6</td><td>7</td><td>near</td><td>0.9</td></tr>
              <tr><td>features_used</td><td>3</td><td>5</td><td>near</td><td>0.8333</td></tr>
              <tr><td>seats</td><td>40</td><td>120</td><td>near</td><td>0.6</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          That account churned, and scored 0.8889 against this one. A success manager can read this table; so can a program.
        </p>
        <h2>5. Which churned accounts does it look like?</h2>
        <p>
          One <a href="/docs/ada-gql">GQL</a> statement, with its values passed as parameters. Each match names its account by its key parts.
        </p>
        <Code lang="ts">{`const alike = await model.gql(
  "FIND SIMILAR TO $account WHERE outcome = $outcome LIMIT 3",
  { account: snapshot(sliding), outcome: "churned" });

if (alike.statement === "find")
  alike.matches.map((m) => ({ account: m.parts?.[0], score: m.score, versions: m.count }));`}</Code>
        <Code lang="json">{`[ { "account": "acct-03", "score": 0.8889, "versions": 3 },
  { "account": "acct-06", "score": 0.7861, "versions": 3 },
  { "account": "acct-12", "score": 0.7694, "versions": 3 } ]`}</Code>
        <p>
          In TypeScript a GQL answer is a union: narrow it on <code>statement</code> and its fields are typed.
        </p>
        <h2>6. How one of them slid</h2>
        <p>
          Because the model kept every version, you can read an account through time: what changed between months, the slope of each number, and how far it drifted from where it started. See <a href="/docs/ada-time">Versions and time</a>.
        </p>
        <Code lang="ts">{`const lost = { account: { identity: { account_id: "acct-03" } } };

const trend = await model.trend(lost);
const drift = await model.gql(
  "DETECT DRIFT FROM glyph($first) TO glyph($latest) THRESHOLD 0.2",
  { first: "acct-03@1", latest: "acct-03" });`}</Code>
        <Code lang="json">{`{ "drift": 0.2056,
  "logins":  { "first": 6, "latest": 2, "slope_per_day": -0.066667, "fit": 1, "direction": "down" },
  "tickets": { "first": 3, "latest": 7, "slope_per_day": 0.066667, "fit": 1, "direction": "up" } }

{ "drift": 0.2056, "drifted": true,
  "changed": ["features_used: 9 to 5", "logins_per_seat: 6 to 2", "open_tickets: 3 to 7", "seats: 140 to 120"] }`}</Code>
        <p>
          <code>glyph(&quot;acct-03@1&quot;)</code> is the account&rsquo;s first version; without the <code>@</code> it is the newest.
        </p>
        <h2>7. The whole book, in one statement</h2>
        <Code lang="ts">{`await model.gql("AGGREGATE AVG account.usage.logins_per_seat GROUP BY outcome");`}</Code>
        <Code lang="json">{`{ "churned": 2.25, "renewed": 6.225 }`}</Code>
        <p>
          Save a statement you run often as a <a href="/docs/ada-procedures">stored procedure</a> and call it by name:
        </p>
        <Code lang="ts">{`await model.saveProcedure(
  "usage_by_plan",
  "AGGREGATE AVG account.usage.logins_per_seat WHERE account.profile.plan = $plan GROUP BY outcome",
  "Average logins per seat at the end of a term, for one plan, by how the term ended.");

await model.call("usage_by_plan", { plan: "growth" });   // { churned: 2.166667, renewed: 5.916667 }`}</Code>
        <h2>8. The function your success tooling calls</h2>
        <Code lang="ts">{`async function risk(account: Account) {
  try {
    const a = await model.query(snapshot(account));
    if (!a.act) return { risk: "unknown", because: a.reason, new: a.unseen };
    return {
      risk: a.top === "churned" ? "high" : "low",
      because: \`\${Math.round(a.confidence * 100)}% of the vote of \${a.count} past accounts says \${a.top}\`,
    };
  } catch (e) {
    if (e instanceof AdaError && e.code === "E_RATE_LIMITED") return { risk: "unknown", because: \`retry in \${e.retryAfter}s\` };
    throw e;
  }
}`}</Code>
        <Code lang="ts">{`await risk(sliding);                             // { risk: "high", because: "94% of the vote of 47 past accounts says churned" }
await risk(healthy);                             // { risk: "low", because: "100% of the vote of 53 past accounts says renewed" }
await risk({ ...healthy, industry: "gaming" });  // { risk: "unknown", because: "unseen", new: ["account.profile.industry=gaming"] }`}</Code>
        <p>
          The third account is in an industry no past account was in. Ada does not guess: it says what was new, and your tooling shows the account to a person. <a href="/docs/ada-act">When Ada acts</a> covers how to change that bar.
        </p>
        <h2>9. Close the loop</h2>
        <p>
          When a live account&rsquo;s term ends, record how it ended. The model has one more account to stand on, from the next question.
        </p>
        <Code lang="ts">{`await model.record(snapshot({ ...sliding, id: "acct-live-1" }), "churned");`}</Code>
        <Note title="Where to go next">
          <a href="/docs/ada-time">Versions and time</a> for history, trend and predict,{' '}
          <a href="/docs/ada-graph">relations</a> when accounts point at other things, and the{' '}
          <a href="/docs/ada-guide-tickets">support tickets guide</a> for records, failures and learned weights.
        </Note>
      </>
    ),
  },
  {
    slug: 'ada-install',
    title: 'Install',
    lede: 'Connect an agent to Ada: the Claude Code plugin, any MCP client, or an API key.',
    body: (
      <>
        <h2>Claude Code</h2>
        <p>The <code>glyphh</code> plugin brings your Glyphh account and the <code>ada</code> skill, which tells Claude when to reach for Ada.</p>
        <Code lang="bash">{`claude plugin marketplace add glyphh-ai/glyphh
claude plugin install glyphh@glyphh`}</Code>
        <p>
          Then ask Claude to <strong>sign in to Glyphh</strong>: it gives you the sign-in card, and you sign in with
          your Glyphh account. There is no key to create.
        </p>
        <h2>Claude and other clients that sign in</h2>
        <p>Add a custom connector or remote MCP server with this URL, and sign in with your Glyphh account when asked:</p>
        <Code>{`https://api.glyphh.ai/mcp`}</Code>
        <p>
          Ada sends its own usage guidance when a client connects, so these clients use it well without the skill.
        </p>
        <h2>Other agents</h2>
        <p>Install the skill with skills.sh, then add the URL above as an MCP server in that agent.</p>
        <Code lang="bash">{`npx skills add glyphh-ai/glyphh --skill ada`}</Code>
        <h2>API key</h2>
        <p>
          For CI, a headless agent, or a client that cannot open a browser, create a key on the console&rsquo;s
          Virtual Keys page and send it as a header.
        </p>
        <Code lang="bash">{`claude mcp add --transport http ada https://api.glyphh.ai/mcp \\
  --header "x-glyphh-api-key: Bearer $GLYPHH_API_KEY"`}</Code>
        <Code lang="json">{`{
  "mcpServers": {
    "ada": {
      "type": "http",
      "url": "https://api.glyphh.ai/mcp",
      "headers": { "x-glyphh-api-key": "Bearer sk-…" }
    }
  }
}`}</Code>
        <h2>What the agent sees</h2>
        <p>
          The <code>ada_*</code> tools, plus <code>mcp_tool_search</code> and <code>mcp_tool_call</code> for your
          organization&rsquo;s other connected tools. Connected tools are found by search and are not listed one by
          one.
        </p>
        <Note title="Use it">
          Ask in plain words: &ldquo;Use Ada to remember how we fixed this deploy failure, and check it before the
          next deploy.&rdquo; In Claude Code, <code>/ada:ada</code> invokes the skill directly.
        </Note>
      </>
    ),
  },
  {
    slug: 'ada-tools',
    title: 'Ada tools and API',
    lede: 'Every Ada call, over MCP or POST /ada, and what comes back.',
    body: (
      <>
        <p>
          The same calls answer in three places: as <code>ada_*</code> tools on your organization&rsquo;s MCP
          endpoint, as <code>op</code> values at <code>POST /ada</code>, and behind the{' '}
          <code>glyphh-ada-1.0</code> chat model, which turns plain language into these calls.
        </p>
        <h2>Ask and explain</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Tool</th><th>Takes</th><th>Returns</th></tr></thead>
            <tbody>
              <tr><td><code>ada_query</code></td><td><code>model_id</code>, <code>situation</code>, optional <code>weights</code></td><td>The top outcome, its confidence, the situations on record behind it, what was new, and <code>act</code> with its <code>reason</code></td></tr>
              <tr><td><code>ada_facts</code></td><td><code>model_id</code>, <code>situation</code>, optional <code>weights</code>, <code>top</code> (1 to 50, default 3)</td><td>The nearest situations among the wins and failures, each as a fact tree</td></tr>
              <tr><td><code>ada_check</code></td><td><code>model_id</code>, <code>situation</code>, <code>outcome</code></td><td>How close the nearest win and failure of that outcome are</td></tr>
            </tbody>
          </table>
        </div>
        <h2>Time</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Tool</th><th>Takes</th><th>Returns</th></tr></thead>
            <tbody>
              <tr><td><code>ada_history</code></td><td><code>model_id</code>, <code>situation</code></td><td>Every record of that situation, oldest first. In a model with key parts: every version of the thing, each with what changed.</td></tr>
              <tr><td><code>ada_trend</code></td><td><code>model_id</code>, <code>situation</code> with its key parts</td><td>How far one thing has moved, how fast, whether it repeats, and each role&rsquo;s slope or changes</td></tr>
              <tr><td><code>ada_predict</code></td><td><code>model_id</code>, <code>situation</code> with its key parts, optional <code>at</code></td><td>The thing&rsquo;s next version, what each role stands on, and what the model answers for it</td></tr>
            </tbody>
          </table>
        </div>
        <p><code>ada_trend</code> and <code>ada_predict</code> need a <a href={`${DOCS}/ada-typed`}>typed model</a> with key parts. See <a href={`${DOCS}/ada-time`}>Versions and time</a>.</p>
        <h2>Query and edges</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Tool</th><th>Takes</th><th>Returns</th></tr></thead>
            <tbody>
              <tr><td><code>ada_gql</code></td><td><code>model_id</code>, <code>query</code>: one GQL statement, optional <code>args</code> for its <code>$parameters</code></td><td>What the statement asks for. See the <a href={`${DOCS}/ada-gql`}>Query language</a>.</td></tr>
              <tr><td><code>ada_edges</code></td><td><code>model_id</code>, <code>situation</code>, optional <code>level</code> and <code>top</code> (1 to 50, default 5)</td><td>The things nearest one thing at a level, the change between each of its versions, and its relations. See <a href={`${DOCS}/ada-edges`}>Edges and levels</a>.</td></tr>
              <tr><td><code>ada_call</code></td><td><code>model_id</code>, <code>name</code>, optional <code>args</code></td><td>Runs a <a href={`${DOCS}/ada-procedures`}>stored procedure</a></td></tr>
              <tr><td><code>ada_procedures</code></td><td><code>model_id</code></td><td>The model&rsquo;s stored procedures, each with its statement and parameters</td></tr>
              <tr><td><code>ada_save_procedure</code></td><td><code>model_id</code>, <code>name</code>, <code>query</code>, optional <code>description</code></td><td>Saves a GQL statement under a name, new or replaced (org admins)</td></tr>
              <tr><td><code>ada_delete_procedure</code></td><td><code>model_id</code>, <code>name</code></td><td>Deletes one (org admins)</td></tr>
            </tbody>
          </table>
        </div>
        <h2>Record</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Tool</th><th>Takes</th><th>Does</th></tr></thead>
            <tbody>
              <tr><td><code>ada_record</code></td><td><code>model_id</code>, <code>situation</code>, <code>outcome</code>, optional <code>at</code></td><td>Records a win: this outcome worked here</td></tr>
              <tr><td><code>ada_veto</code></td><td><code>model_id</code>, <code>situation</code>, <code>outcome</code>, optional <code>at</code></td><td>Records a failure: this outcome failed or was rejected here</td></tr>
              <tr><td><code>ada_load</code></td><td><code>model_id</code>, <code>records</code>: up to 500 of <code>{'{situation, outcome, store?, at?}'}</code></td><td>Loads many records in one call, the seed: every one is checked first, and one that does not fit refuses the whole call by its index with nothing written. Answers <code>{'{loaded, wins, vetoes}'}</code></td></tr>
              <tr><td><code>ada_calibrate</code></td><td><code>model_id</code></td><td>Fits the model&rsquo;s probabilities to its records (10 or more wins)</td></tr>
              <tr><td><code>ada_learn</code></td><td><code>model_id</code></td><td>Learns what decides from a model&rsquo;s wins (10 or more) and calibrates it (org admins): a flat model&rsquo;s key weights, saved as its defaults, or a typed model&rsquo;s role weights, saved in its spec</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <code>at</code> is when the outcome happened, as epoch seconds or ISO 8601. Left out, it is now. Set it
          when you load records of things that happened earlier: a newer failure blocks an older win, so load order
          must not stand in for history.
        </p>
        <Note kind="warn" title="Record what the world graded">
          Record an outcome only once it is known, and only when the user or the world confirmed it. An agent should
          never grade its own work as a win.
        </Note>
        <h2>Models, records and devices</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Tool</th><th>Who</th><th>Does</th></tr></thead>
            <tbody>
              <tr><td><code>ada_models</code></td><td>Any member</td><td>Lists the organization&rsquo;s models, or one with its record counts</td></tr>
              <tr><td><code>ada_records</code></td><td>Any member</td><td>Browses a model&rsquo;s records, newest first, by store (<code>wins</code> or <code>vetoes</code>), each with its situation&rsquo;s <code>key</code></td></tr>
              <tr><td><code>ada_devices</code></td><td>Any member</td><td>Lists registered devices and whether each is online</td></tr>
              <tr><td><code>ada_contract</code></td><td>Any member</td><td>The shape of every answer as JSON Schema, and with a typed model&rsquo;s <code>model_id</code> the shape of its data</td></tr>
              <tr><td><code>ada_create_model</code></td><td>Org admins</td><td>Creates a model with <code>name</code> and <code>storage</code> (<code>cloud</code> or <code>local</code>), flat with optional <code>weights</code> or typed with a <code>spec</code></td></tr>
              <tr><td><code>ada_update_model</code></td><td>Org admins</td><td>Renames a model, sets its default weights or its scale, or sets its spec: any spec while it has no records, and after that one that differs only in similarity weights</td></tr>
              <tr><td><code>ada_delete_model</code></td><td>Org admins</td><td>Deletes a model and its records, wherever they live</td></tr>
              <tr><td><code>ada_edit_record</code></td><td>Org admins</td><td>Corrects a record&rsquo;s situation or outcome</td></tr>
              <tr><td><code>ada_delete_record</code></td><td>Org admins</td><td>Deletes one record</td></tr>
            </tbody>
          </table>
        </div>
        <h2>Describing a situation</h2>
        <p>
          Give only the attributes that should decide, as short canonical values, and use the same keys every time
          for the same kind of situation. Leave out ids, paths, names and timestamps: they make unrelated situations
          look alike.
        </p>
        <Code lang="json">{`{ "task": "deploy_service", "constraint": "canary_required" }`}</Code>
        <p>
          In a <a href={`${DOCS}/ada-typed`}>typed model</a> the spec does this for you: every role has a type, an
          identity role is a key part, and a time is never scored.
        </p>
        <h2>POST /ada</h2>
        <p>
          One endpoint, on a gateway key. The <code>op</code> is the tool name without <code>ada_</code>; the rest
          of the body is that tool&rsquo;s arguments.
        </p>
        <Code lang="bash">{`curl https://api.glyphh.ai/ada \\
  -H "x-glyphh-api-key: Bearer $GLYPHH_API_KEY" \\
  -H "content-type: application/json" \\
  -d '{
    "op": "query",
    "model_id": "am_0123456789ab",
    "situation": { "task": "deploy_service", "constraint": "canary_required" }
  }'`}</Code>
        <p>A query answers with:</p>
        <Row k="act">Branch on this. True only when <code>reason</code> is <code>reflex</code>. See <a href={`${DOCS}/ada-act`}>When Ada acts</a>.</Row>
        <Row k="reason">Why <code>act</code> is what it is: <code>reflex</code>, <code>insufficient</code>, <code>unseen</code>, <code>vetoed</code>, <code>uncalibrated</code>, <code>mismatch</code> or <code>low_confidence</code>.</Row>
        <Row k="top">The outcome that worked most in situations like this one. Null when nothing is close enough.</Row>
        <Row k="unseen">What the situation carries that no win has recorded: a key (<code>force</code>) or a value (<code>target=main</code>).</Row>
        <Row k="exact">True when the same situation is on record.</Row>
        <Row k="confidence">The top outcome&rsquo;s share of the vote, 0 to 1.</Row>
        <Row k="count">How many records voted: every one that cleared the model&rsquo;s similarity floor.</Row>
        <Row k="outcomes">Every outcome found, with its share.</Row>
        <Row k="receipts">The nearest situations on record, one entry per situation and outcome: <code>score</code>, how many times it was recorded (<code>count</code>), <code>first</code> and <code>latest</code>, and the newest record&rsquo;s <code>id</code> and <code>author</code>. In a model with key parts, each also carries <code>parts</code>: the thing&rsquo;s key parts as written, which is what <code>glyph(...)</code> and a question take to name it.</Row>
        <Row k="veto_match">How close the nearest recorded failure of the top outcome is.</Row>
        <Row k="lifted">True when a close failure exists and a newer win outranks it.</Row>
        <Row k="calibrated">True once the model has been calibrated.</Row>
        <Row k="scale">The scale the answer was measured on.</Row>
        <Row k="key">The situation&rsquo;s identity: the same for the same data in any key order.</Row>
        <Row k="contract">The version of this shape. It goes up when a field is removed or changes meaning, never when one is added.</Row>
        <h2>POST /ada/load</h2>
        <p>
          The same door for a file. The body is NDJSON: the first line names the model, every other line is one
          record, <code>{'{"situation", "outcome", "store"?, "at"?}'}</code>. It is read as it arrives and written in
          batches of 500, each batch counted like a call to <code>ada_load</code>, so a hosted runtime that reaches its
          plan&rsquo;s managed precedents stops the load at a line it names.
        </p>
        <Code lang="bash">{`curl https://api.glyphh.ai/ada/load \\
  -H "x-glyphh-api-key: Bearer $GLYPHH_API_KEY" \\
  -H "content-type: application/x-ndjson" \\
  --data-binary @- <<'NDJSON'
{"model_id": "am_0123456789ab"}
{"situation": {"task": "deploy_service", "constraint": "canary_required"}, "outcome": "canary", "at": "2026-01-03T10:00:00Z"}
{"situation": {"task": "deploy_service", "constraint": "none"}, "outcome": "rolling", "store": "vetoes", "at": "2026-01-04T09:00:00Z"}
NDJSON`}</Code>
        <p>
          It answers <code>{'{"data": {"model_id", "loaded", "wins", "vetoes", "lines"}}'}</code>. A refusal part way is{' '}
          <code>{'{"error": {"code", "message": "line N: …", "loaded"}}'}</code>: the batches before that line stay, the one
          it was in does not. The SDKs call this <code>stream(records)</code>, and <code>load(records)</code> for a list.
        </p>
        <h2>The contract</h2>
        <p>
          For software that calls a model with no agent in the path, <code>{'{"op": "contract"}'}</code> returns
          the JSON Schema of what <code>query</code>, <code>facts</code>, <code>history</code>, <code>trend</code>,{' '}
          <code>predict</code>, <code>gql</code>, <code>edges</code> and <code>load</code> return, and what each <code>reason</code> means. With a typed model&rsquo;s{' '}
          <code>model_id</code> it also returns the shape of that model&rsquo;s data.
        </p>
        <h2>Errors</h2>
        <p>
          A success is <code>{'{"data": …}'}</code>. A refusal is <code>{'{"error": {"code", "message"}}'}</code>,
          and the code decides the status:
        </p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Code</th><th>Status</th><th>Means</th></tr></thead>
            <tbody>
              <tr><td><code>E_VALIDATION</code></td><td>400</td><td>An argument, a statement, or data that does not fit the model&rsquo;s types. The message names the path.</td></tr>
              <tr><td><code>E_UNAUTHENTICATED</code></td><td>401</td><td>No key, or one that is not valid</td></tr>
              <tr><td><code>E_PAYMENT</code></td><td>402</td><td>The organization has no plan for this, or has used its budget</td></tr>
              <tr><td><code>E_FORBIDDEN</code></td><td>403</td><td>For org admins, or above the reader&rsquo;s clearance</td></tr>
              <tr><td><code>E_NOT_FOUND</code></td><td>404</td><td>No such model, record, thing or procedure</td></tr>
              <tr><td><code>E_FAILED_PRECONDITION</code></td><td>409</td><td>The model cannot do that as it is: a new shape of spec on a model with records, a trend on a model without key parts</td></tr>
              <tr><td><code>E_RATE_LIMITED</code></td><td>429</td><td>Too many calls for the plan. <code>Retry-After</code> says how many seconds to wait.</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          A model that does not act is not an error. It is a 200 with <code>act: false</code> and a{' '}
          <code>reason</code>. The <a href={`${DOCS}/ada-sdk`}>SDKs</a> raise an <code>AdaError</code> with the code for
          each refusal.
        </p>
        <h2>As a chat model</h2>
        <p>
          Pick <code>glyphh-ada-1.0</code> like any other model and talk to it in plain language or JSON. It answers
          only by calling the tools above, and replies with the answer, whether it is safe to act, and the records
          it cites.
        </p>
      </>
    ),
  },
];

const desktop = [
  {
    slug: 'install',
    title: 'Sign in and install',
    lede: 'One account. The desktop is where you build; app.glyphh.ai drives it.',
    body: (
      <>
        <h2>Install the desktop</h2>
        <p>
          The desktop is where you build: your folders, your installed apps and skills, your CLIs. Get it from
          the <a href="https://glyphh.ai/#download">Download section</a> of glyphh.ai, or from the card on the
          sign-in page. macOS 12 and up on Apple Silicon and Intel, Windows 10 and up, and Linux x64 as an
          AppImage.
        </p>
        <p>
          The desktop signs in with a device flow. It opens your browser on the sign-in page, you approve the
          device, and the app picks up the session. Sign in once and stay signed in. Log out from the account
          menu and this device is signed out, no other.
        </p>
        <h2>Sign in on the web</h2>
        <p>
          Open <a href="https://app.glyphh.ai">app.glyphh.ai</a>. Sign in with your email and the magic link it
          sends, or with Google. It is the same account as the desktop, made to drive it: your sessions, files
          and apps when the desktop is on and remote control is switched on, and a chat when it is not. See{' '}
          <a href={`${DOCS}/web-app`}>app.glyphh.ai</a>.
        </p>
        <Shot file="sign-in.png" alt="The sign-in page at app.glyphh.ai: Continue with Google, or an email address for a magic link." width={760} caption="app.glyphh.ai. A magic link to your email, or Google." />
        <p>
          The first person from a new email domain gets a new organization. Everyone invited after that joins
          it. An organization that requires SSO refuses magic links for its domain.
        </p>
        <h2>The console</h2>
        <p>
          Your organization is run from the console at{' '}
          <a href="https://platform.glyphh.ai">platform.glyphh.ai</a>: members, teams, models, budgets and
          billing. Open it from <strong>Settings &rarr; Platform</strong> in the app.
        </p>
        <h2>Updates</h2>
        <p>
          When a new desktop version is ready, a dot appears next to <strong>About</strong> in the account menu.
          Open About to install it. It never installs while you are working. The web app is always current.
        </p>
        <p>Next: <a href={`${DOCS}/web-app`}>app.glyphh.ai</a>.</p>
      </>
    ),
  },
  {
    slug: 'web-app',
    title: 'app.glyphh.ai',
    lede: 'The same account in a browser, built to reach your desktop. Without one, a chat.',
    body: (
      <>
        <p>
          app.glyphh.ai is the Glyphh agent beside the rail: your sessions, a search, a filter, the composer.
          Nothing for building is there. You build and install on the desktop; the web is how you reach it.
        </p>
        <Shot file="web-agent.png" alt="app.glyphh.ai: the left rail with the Work and Code switch, New, Artifacts and Recents grouped by folder, and the Glyphh agent filling the page with its composer at the bottom." width={1000} caption="app.glyphh.ai. The rail, the agent, the composer." />
        <h2>With your desktop online</h2>
        <p>
          Turn remote control on in the desktop under <strong>Settings &rarr; Remote control</strong> and grant
          folders. Then, on the web, a new Code session starts in one of those folders. The Files, Editor and
          Diff panels and the Agents panel read that desktop over remote control, fenced to the granted folders.
          Its installed apps open on the desktop. See{' '}
          <a href={`${DOCS}/devices`}>Devices and remote control</a>.
        </p>
        <h2>The &#8942; menu</h2>
        <p>
          The agent has one menu, top right. A section is there only when it has something to show, so the menu
          is never empty.
        </p>
        <Row k="Apps">The apps installed on your attached desktop. A click opens the app on the desktop, and the web says <em>Opened on &lt;machine&gt;</em>. With no desktop the section is disabled: <em>Connect your desktop to open apps</em>, with a link to Settings &rarr; Devices</Row>
        <Row k="Agents / CLIs">Claude Code, Codex, Gemini, Copilot, Cursor and the Glyphh CLI, each in a terminal. With a desktop attached, its live sessions in each CLI are listed underneath; a click resumes that session on the desktop</Row>
        <Row k="Panels">The panels for this session&rsquo;s kind. Code: Files, Terminal, Editor, Diff, Plan, Agents. Work: Agents</Row>
        <Row k="Session">Rename, Pin, New agent panel, Delete. Only for an open session</Row>
        <Shot file="agent-menu.png" alt="The agent's menu open on the web: Apps with No apps installed on this desktop, Agents / CLIs listing Claude, Codex, Gemini, Copilot, Cursor and Glyphh CLI, and Panels listing Files, Terminal, Editor, Diff, Plan and Agents." width={281} caption="The one menu. Apps, Agents / CLIs, Panels." />
        <h2>With no desktop online</h2>
        <p>
          A chat still runs. A shared worker in Glyphh&rsquo;s cloud runs the model turn with your connections
          and memory. It holds no files and installs nothing. The transcript lands under your account, and the
          moment your desktop is back the same chat is there. See{' '}
          <a href={`${DOCS}/where-a-session-works`}>Where a session works</a>.
        </p>
        <h2>Settings on the web</h2>
        <p>
          General, Appearance, Memory, Privacy, Devices, Artifacts, Usage, MCP Server, Connections, Billing and
          Support. The Build and Customize pages are the desktop&rsquo;s: skills, agents, apps, tasks, tabs,
          workspaces and schedules are made there.
        </p>
        <Shot file="settings-general.png" alt="Settings on the web, General: the Default model row, Default workspace and Interface sounds. The rail lists General, Appearance, Memory, Privacy, Devices, Artifacts, Usage, MCP Server, Connections, Billing and Support." width={900} caption="Settings → General on the web. No Build, no Customize." />
        <Note kind="note" title="The desktop is the only door">
          An app or a skill loads only through the desktop. The web runs a chat with your connections and
          memory, and reaches your desktop&rsquo;s apps; it installs nothing.
        </Note>
      </>
    ),
  },
  {
    slug: 'where-a-session-works',
    title: 'Where a session works',
    lede: 'A session works in a folder on your desktop. app.glyphh.ai reaches it over remote control.',
    body: (
      <>
        <p>
          A session works in one folder. The folder chip on the composer names it. Click the chip and the
          menu <strong>Where this session works</strong> opens.
        </p>
        <Shot file="session-place.png" alt="The folder chip's menu on the web, titled Where this session works: a search box, then a section for the attached desktop, Christopher's Mac Studio, with the folders web and sdk and a Browse row under /Users/you/projects." width={340} caption="The folder chip on the web. The attached desktop and the folders it granted." />
        <h2>The places</h2>
        <Row k="On this desktop">A folder on the machine you are sitting at. The desktop app</Row>
        <Row k="On <your machine>">The same folders from app.glyphh.ai, over remote control. The desktop lists the folders it granted, and <strong>Browse</strong> goes under one of them</Row>
        <p>
          Only folders inside a grant are offered. The desktop grants them under{' '}
          <strong>Settings &rarr; Remote control</strong>. See{' '}
          <a href={`${DOCS}/devices`}>Devices and remote control</a>.
        </p>
        <h2>The lock and the grant card</h2>
        <p>
          A desktop session whose folder is not granted shows a lock in the rail. Opening it shows a grant
          card instead of running: add the folder on the desktop and open the session again.
        </p>
        <Shot file="grant-card.png" alt="The grant card: Grant this folder in Remote control on your desktop. This session works in /Users/you/other/notes, which the desktop has not granted for remote control. Open Settings → Remote control on your desktop and add the folder, then open the session again." width={420} caption="The grant card. Nothing runs until the folder is granted." />
        <h2>The default</h2>
        <p>
          With a desktop attached, a new session on the web starts in a folder on it: your last pick when it is
          still granted, else your most recent folder, else the first granted one. With nothing granted there
          is no folder a Code turn could use: grant one first.
        </p>
        <h2>No desktop online</h2>
        <p>
          A chat still runs. A Work session needs no folder: a shared worker runs the turn with your
          connections and memory and touches no files. Its transcript is kept under your account, so the
          desktop shows it later. A Code session works on a desktop; start one when yours is back.
        </p>
        <h2>A place is fixed at birth</h2>
        <p>
          A session&rsquo;s place is set by its first turn and never changes. A desktop session stays on that
          desktop. A chat started with no desktop stays a chat; open it on the desktop and it is the same
          transcript, still without a folder.
        </p>
        <h2>In the rail</h2>
        <p>
          Recents groups desktop sessions by folder. Chats that ran with no desktop sit under one{' '}
          <strong>Cloud</strong> heading. The glyph at the start of a row says where it ran: a monitor for a
          desktop, a cloud for the worker. A lock marks a folder the desktop has not granted.
        </p>
        <Shot file="rail-recents.png" alt="The Recents list on the web: folder headings web, sdk and notes, each with a desktop session; the notes session is dimmed with a lock." width={279} caption="Recents on the web: one group per desktop folder. A lock on a folder that is not granted." />
        <p>
          The funnel beside the search box filters by loop and by place: <strong>All places</strong>,{' '}
          <strong>This desktop</strong>, or <strong>Cloud</strong>. The same filter runs in the agent
          panel&rsquo;s recents menu.
        </p>
        <Shot file="recents-filter.png" alt="The recents filter menu: All loops with Glyphh, Glyphh CLI, Claude, Codex, Gemini, Copilot and Cursor beneath it, then All places, This desktop and Cloud." width={465} caption="The recents filter: a loop, and a place." />
      </>
    ),
  },
  {
    slug: 'pick-a-model',
    title: 'Pick a model',
    lede: 'The model chip on the composer, and the effort dial beside it.',
    body: (
      <>
        <p>
          The chip reads <strong>Model: Default &middot; &lt;name&gt;</strong>. Click it and the models your
          team allows are listed. Pick one and every turn of the session runs on it.
        </p>
        <Shot file="model-picker.png" alt="The model menu over the composer: a search box, Default with a check, then claude-sonnet-4-5, gemini-2.5-pro and gpt-5 with their providers." width={410} caption="The model chip. Default is your team's model." />
        <h2>What Default means</h2>
        <p>
          Default is the model your team is flagged to. Without a team flag it is the organization&rsquo;s
          default. Your admin sets both on the console&rsquo;s Models page. Pick a model yourself under{' '}
          <strong>Settings &rarr; General &rarr; Default model</strong> and a new session opens on that instead.
        </p>
        <h2>Who sees what</h2>
        <p>
          The list is what your team allows. A team with no list of its own sees every model the organization
          approved. On the Free plan the list is the models Glyphh flags for Free.
        </p>
        <h2>Effort</h2>
        <p>
          The chip beside the model is the effort dial, from <strong>Low</strong> to <strong>Ultra</strong>.
          Higher effort means more thorough answers, but takes longer and uses your budget faster. It is one
          preference for every turn, sent to the model as its reasoning effort. The chip dims when the model on
          the chip takes one effort only.
        </p>
        <Shot file="effort.png" alt="The effort dial open over the composer: Effort Medium, a slider from Faster to Smarter." width={315} caption="The effort dial. Medium is the default." />
        <h2>What it costs</h2>
        <p>
          Glyphh never charges per model or per seat. See the <a href="https://glyphh.ai/pricing">pricing page</a>.
        </p>
      </>
    ),
  },
  {
    slug: 'work-and-code',
    title: 'Work and Code',
    lede: 'Two kinds of session. One agent loop.',
    body: (
      <>
        <p>
          Glyphh runs one agent loop: the same engine in the desktop, on the web and in the{' '}
          <a href={`${DOCS}/cli`}>glyphh CLI</a>. It speaks the Messages API and MCP, calls every model through
          your organization&rsquo;s <a href={`${DOCS}/gateway`}>Router</a>, and runs any model your team allows.
          The switch at the top of the rail picks the kind of session.
        </p>
        <Row k="Work">The model, your connections, your memory and Glyphh&rsquo;s own tools. No files, no shell. Runs anywhere, in the browser too</Row>
        <Row k="Code">Everything in Work, plus a folder on your desktop: files, terminals and the CLIs, confined to the folder the session works in</Row>
        <p>A session is born one kind and stays it: its transcript was written with that toolbelt.</p>
        <Shot file="composer.png" alt="The composer: the folder chip reading web, No git, the prompt field Describe what to build or fix, Ask mode, the model chip and the effort chip." width={890} caption="The Code composer. The folder, the prompt, the model, the effort." />
        <h2>The folder is the sandbox</h2>
        <p>
          A Code session works in one folder and nowhere else. File tools refuse any path outside it, reads
          included. On macOS the shell runs under the system sandbox with writes allowed only inside that folder,
          temp space and package caches. From app.glyphh.ai the folder is on your desktop, reached over remote
          control, and only a granted folder can be picked.
        </p>
        <h2>Sub-agents</h2>
        <p>
          The agent can hand work to sub-agents you define on the desktop under{' '}
          <strong>Settings &rarr; Build &rarr; Agents</strong>: a name, a brief and a model of their own. They
          run the same loop in parallel and report back. The Agents panel shows each one working, on the
          desktop and on the web.
        </p>
        <h2>What it costs</h2>
        <p>
          Glyphh never charges per model or per seat. See the <a href="https://glyphh.ai/pricing">pricing page</a>.
        </p>
      </>
    ),
  },
  {
    slug: 'terminals',
    title: 'Terminals and the CLIs',
    lede: 'A shell on your desktop, in the session’s folder. The CLIs beside the agent.',
    body: (
      <>
        <h2>The terminal</h2>
        <p>
          The Terminal panel of a Code session is a shell on the desktop the session works on, in its folder.
          On the desktop that is the machine you are sitting at. From app.glyphh.ai it is your desktop&rsquo;s
          shell, reached over remote control. Tabs, resize and close work the same in both. A Work session has
          no terminal.
        </p>
        <h2>The CLIs</h2>
        <Row k="Claude Code">claude</Row>
        <Row k="Codex">codex</Row>
        <Row k="Gemini">gemini</Row>
        <Row k="Copilot">copilot</Row>
        <Row k="Cursor">cursor-agent</Row>
        <Row k="Glyphh CLI">glyphh</Row>
        <p>
          On the desktop they are the CLIs installed on your machine, each in its own agent window beside the
          Glyphh agent. On the web they are the <strong>Agents / CLIs</strong> section of the agent&rsquo;s
          &#8942; menu: with your desktop attached, its live sessions list under each CLI and a click resumes
          that session on the desktop. In a chat with no desktop they run on the worker.
        </p>
        <p>
          Claude Code, Codex, Gemini and the Glyphh CLI can be pointed at your organization&rsquo;s Router with
          a key from the console, so their turns show in the same logs. Copilot and Cursor always use their own login. See{' '}
          <a href={`${DOCS}/own-cli`}>Use your own CLI</a>.
        </p>
        <Note kind="note" title="The honest card">
          When there is nothing to run on, signed out, no desktop, the tile says so in one line and offers a
          retry. It never pretends.
        </Note>
      </>
    ),
  },
  {
    slug: 'devices',
    title: 'Devices and remote control',
    lede: 'Your desktops, attached to Glyphh. Turn it on there; manage it here.',
    body: (
      <>
        <h2>On the desktop</h2>
        <p>
          <strong>Settings &rarr; Remote control</strong> on the desktop app. Turn on{' '}
          <strong>Allow remote control on this computer</strong> and grant folders. A remote session can only
          work inside those folders and the folders under them. Your approvals still apply. Nothing attaches
          until you turn it on, it is off by default, and an org admin can turn it off for everyone.
        </p>
        <p>The CLI does the same: <code>glyphh remote-control</code>.</p>
        <h2>On the web</h2>
        <p>
          <strong>Settings &rarr; Devices</strong> lists the computers attached to your account: the app and
          version, when it attached, and the folders it granted.
        </p>
        <Shot file="settings-devices.png" alt="Settings, Devices: one computer, Christopher's Mac Studio, Glyphh Desktop 1.4.17, attached 2h ago, granting /Users/you/projects, with a Disconnect button." width={900} caption="Settings → Devices. One attached desktop and its granted folder." />
        <Row k="Disconnect">Closes the connection now. The desktop stops reconnecting</Row>
        <Row k="Allow">Lets a disconnected desktop attach again, once remote control is turned on there</Row>
        <p>
          With a desktop attached, the folder chip offers its folders, a new session starts in one of them, and
          its installed apps open from the agent&rsquo;s &#8942; menu. See{' '}
          <a href={`${DOCS}/where-a-session-works`}>Where a session works</a> and{' '}
          <a href={`${DOCS}/web-app`}>app.glyphh.ai</a>.
        </p>
      </>
    ),
  },
  {
    slug: 'library-sync',
    title: 'Your library syncs',
    lede: 'Schedules, skills, tasks, agents, workspaces and tabs are one library, on every surface.',
    body: (
      <>
        <p>
          These are records in your member library. The server holds them. The desktop keeps a copy and syncs
          it. The web reads them through the server. Make one on the desktop and the web lists it within a sync
          interval.
        </p>
        <Row k="Schedules">Anything on a clock: a task or a skill, written in words or five-field cron</Row>
        <Row k="Skills">A folder with a SKILL.md. See <a href={`${DOCS}/skills`}>Skills</a></Row>
        <Row k="Tasks">A program with a task.json and a run.js. See <a href={`${DOCS}/tasks`}>Tasks</a></Row>
        <Row k="Agents">Sub-agents: a name, a brief, a model</Row>
        <Row k="Workspaces">A named arrangement of panels, with the loop and the model for each slot</Row>
        <Row k="Tabs">The apps you keep as tabs on the rail. Their local settings stay on the machine</Row>
        <h2>Where a schedule fires</h2>
        <p>
          A <strong>task</strong> that touches only its own data and your connections fires on the cloud clock,
          in UTC, and runs with your laptop closed. A task that syncs into an app&rsquo;s data runs on your
          desktop, because the app and its data live there: while the desktop is off its runs wait, and it
          catches up when the desktop is back. A <strong>skill</strong> schedule fires on your desktop, where
          its agent lives. Write the time the way you mean it: a skill at <em>9am</em> is 9am on the desktop; a
          cloud task at <em>9am</em> is 09:00 UTC.
        </p>
        <p>
          <strong>Run now</strong> and the run history come from the desktop. On the web the Schedules page is
          not shown; schedules are made and watched on the desktop.
        </p>
      </>
    ),
  },
  {
    slug: 'apps',
    title: 'Apps',
    lede: 'Build and install on your desktop. Publish to your organization. Open from the web.',
    body: (
      <>
        <p>
          An app is a skill bundle with an <code>app.json</code>: a page the agent can open as a work panel
          and call as a tool. The app reads the type from the bundle, never from its name. See{' '}
          <a href={`${DOCS}/skills`}>Skills</a> for what a bundle is.
        </p>
        <h2>Build it</h2>
        <p>
          <strong>New</strong> on <strong>Settings &rarr; Build &rarr; Apps</strong> opens a session rooted at
          your apps folder with a starter prompt already typed and not yet sent. Edit it, send it, and the
          agent scaffolds the bundle.
        </p>
        <h2>Install it</h2>
        <p>Three doors, one result, all on the desktop:</p>
        <Row k="Settings → Build → Apps">Import a bundle</Row>
        <Row k="Drop a .glyphh file">Onto the app</Row>
        <Row k="Ask the agent">It calls <code>app_install</code></Row>
        <p>
          The app installs on your desktop, and that is where it runs, with its data on your machine.
        </p>
        <h2>Your organization&rsquo;s library</h2>
        <p>
          An organization can publish an app to its library with access by team, and members install it on
          their own desktops in one click. Each install is that member&rsquo;s own copy, on their machine.
        </p>
        <h2>Open it</h2>
        <p>
          On the desktop an app opens as a work panel, and the agent&rsquo;s app tools,{' '}
          <code>app_list_tools</code> and <code>app_call_tool</code>, reach it. On{' '}
          <a href="https://app.glyphh.ai">app.glyphh.ai</a> the agent&rsquo;s &#8942; menu lists the apps
          installed on your attached desktop; a click opens the app on the desktop, and the web says{' '}
          <em>Opened on &lt;machine&gt;</em>. The web does not run apps itself. With no desktop the section is
          disabled: <em>Connect your desktop to open apps</em>.
        </p>
        <Note kind="note" title="The desktop is the only door">
          An app loads only through the desktop. The web reaches your desktop&rsquo;s apps; it installs nothing.
        </Note>
      </>
    ),
  },
  {
    slug: 'cli',
    title: 'The Glyphh CLI',
    lede: 'Install the glyphh command, sign in to your org, and run the loop in any terminal.',
    body: (
      <>
        <p>
          The <code>glyphh</code> command is the Glyphh loop in your terminal: the same engine the desktop&rsquo;s
          agent panel runs, through your organization&rsquo;s Router, on any model your team allows. It signs in to
          your org on its first screen and keeps one conversation history with the desktop.
        </p>
        <h2>Install</h2>
        <p>It is an npm package. You need Node.js 18 or newer.</p>
        <Code lang="bash">{`npm i -g @glyphh-ai/cli
glyphh`}</Code>
        <h2>Sign in</h2>
        <p>
          The first screen is a device login. Open the link it prints, sign in with your Glyphh account, and the
          terminal picks up the session. It lives in <code>~/.glyphh/session.json</code>, separate from the
          desktop&rsquo;s own login, so signing out of one does not sign out the other.
        </p>
        <Note kind="wire" title="On every plan">
          The CLI signs in and works on every plan, Free included. Glyphh never charges per install.
        </Note>
        <h2>The first run in a folder</h2>
        <p>
          Like the other agent CLIs, <code>glyphh</code> asks once whether it may work in the folder you started it
          in. Answer yes and it remembers; <code>--trust</code> skips the question for scripts and launchers.
        </p>
        <h2>Day to day</h2>
        <Row k="/model">Pick a model from the org&rsquo;s roster with the arrow keys or a number</Row>
        <Row k="/permissions">Default, accept edits, plan, or bypass. Shift+Tab cycles the first three</Row>
        <Row k="/resume">Reopen an earlier conversation, yours from the desktop included</Row>
        <Row k="/remote-control">Turn remote control on for this machine, the same switch as the desktop&rsquo;s</Row>
        <Row k="--continue">Start on your most recent conversation</Row>
        <Row k="--resume <id>">Start on one conversation by id</Row>
        <Row k="--model <name>">Start on a model</Row>
        <Row k="--permission <mode>">Start in a permission mode: default, acceptEdits, plan, bypass</Row>
        <p>
          Type <code>/</code> for the command menu; <code>?</code> on an empty line is help. Ctrl+C clears the
          line, and a second press within two seconds quits.
        </p>
        <h2>One history with the desktop</h2>
        <p>
          Conversations are stored per user under <code>~/.glyphh/users/</code>, the same file the desktop reads.
          A chat you start in the terminal shows in the desktop&rsquo;s left rail and at app.glyphh.ai; switch to
          the Glyphh view on the desktop and the conversation is there, and the desktop can hand the same chat
          back to a terminal.
        </p>
        <h2>Your own server</h2>
        <p>
          The CLI talks to <code>https://api.glyphh.ai</code>. To point it elsewhere set{' '}
          <code>GLYPHH_SERVER_URL</code>, or write a <code>server</code> field in{' '}
          <code>~/.glyphh/config.json</code>. <code>/config</code> shows which one is in effect.
        </p>
        <h2>Update and remove</h2>
        <Code lang="bash">{`npm i -g @glyphh-ai/cli@latest   # update
npm rm -g @glyphh-ai/cli          # remove`}</Code>
        <p>
          To keep Claude Code or Codex and point it at the gateway instead, see{' '}
          <a href={`${DOCS}/own-cli`}>Use your own CLI</a>.
        </p>
      </>
    ),
  },
  {
    slug: 'skills',
    title: 'Skills',
    lede: 'A folder with a SKILL.md at its root. Read by every loop.',
    body: (
      <>
        <p>
          A skill is a directory with a <code>SKILL.md</code> at its root, plus whatever scripts and references it
          needs. That is the Agent Skills standard, the one Claude Code, Codex, and Gemini already read. Nothing to
          convert when you change loops.
        </p>
        <h2>Where they live</h2>
        <p>
          Your skills live under your Glyphh home on the desktop and are linked into each CLI&rsquo;s own skills
          directory:
        </p>
        <Code>{`~/.glyphh/<user>/skills/<name>/     the skill
~/.claude/skills/<name>            linked for Claude Code
~/.codex/skills/<name>             linked for Codex
~/.gemini/skills/<name>            linked for Gemini`}</Code>
        <p>
          Disabling a skill moves the folder out of the CLI directories. There is no flag for a CLI to ignore, so
          off means off.
        </p>
        <h2>What a bundle is</h2>
        <p>The app reads the type from the bundle, never from its name:</p>
        <Row k="SKILL.md only">A skill</Row>
        <Row k="+ app.json">An app</Row>
        <Row k="+ task.json">A task</Row>
        <Row k="+ plugin marker">A plugin</Row>
        <h2>Making one</h2>
        <p>
          <strong>New</strong> on the Skills page opens a session rooted at your skills folder with a starter prompt
          already typed and not yet sent. Edit it, send it, and the agent scaffolds the folder. The same door exists
          on Apps, Tasks, Plugins, and Artifacts.
        </p>
        <h2>Using one</h2>
        <p>
          Type <code>/</code> in the composer and pick from your enabled skills. Or just ask: the loop reads the
          skill&rsquo;s description and reaches for it when it fits.
        </p>
        <Note kind="note" title="Skills load through the desktop">
          A skill is made, installed and enabled on the desktop. A chat on app.glyphh.ai with no desktop runs with
          your connections and memory; it loads no skills.
        </Note>
        <Note kind="tip" title="Share it with the org">
          Publish a skill from its page and it goes to the org hub. An admin&rsquo;s publish goes live at once. A
          member&rsquo;s lands in review. See the org hub.
        </Note>
      </>
    ),
  },
  {
    slug: 'tasks',
    title: 'Tasks and schedules',
    lede: 'A program on a clock, with a checkpoint journal.',
    body: (
      <>
        <p>
          A task is a skill folder with a <code>task.json</code> and a <code>run.js</code>. It runs in a
          separate process, on a schedule or on demand, and journals every step so a run can pick up where it
          stopped.
        </p>
        <h2>The manifest</h2>
        <Code lang="task.json">{`{
  "name": "inbox-to-store",
  "program": "run.js",
  "slots": { "reader": { "model": "claude-haiku-4-5" } },
  "schedule": "*/15 * * * *",
  "dependencies": { "connections": ["gmail"] },
  "timeoutMs": 1800000
}`}</Code>
        <h2>The program</h2>
        <p>The program exports one function. It gets a context and the input, and returns the result.</p>
        <Code lang="run.js">{`export async function run(ctx, input) {
  const threads = await ctx.checkpoint("threads", () =>
    ctx.connections.gmail.call("list_threads", { newerThan: "15m" }));
  const facts = await ctx.agents.reader.run(
    "Extract people, orgs, and dates from these threads as JSON.",
    { schema: FactsSchema });
  await ctx.data("inbox").exec(
    "insert into facts(json) values (?)", [JSON.stringify(facts)]);
  ctx.log("stored", { count: facts.length });
  return { count: facts.length };
}`}</Code>
        <h2>The context</h2>
        <Row k="ctx.agents.<slot>.run(prompt, opts)">One headless turn on the slot&rsquo;s model. Pass a schema for typed output</Row>
        <Row k="ctx.connections.<app>.call(tool, args)">Call a connected service&rsquo;s tool</Row>
        <Row k="ctx.data(repo).exec(sql, params)">Read or write the task&rsquo;s SQLite store</Row>
        <Row k="ctx.checkpoint(key, fn)">Get-or-compute. Journaled, so a resumed run skips it</Row>
        <Row k="ctx.log(message, detail)">A line in the run feed</Row>
        <Note kind="admin" title="Unattended calls need Always allow">
          A task may only call a connection it declared, and only a tool set to <strong>Always allow</strong> on the
          Connections page. Ask and Never both refuse, because nobody is there to answer.
        </Note>
        <h2>The journal</h2>
        <p>
          Every agent call, connection call, data statement, checkpoint, and log line is written to the run as it
          happens. A run that was still going when the app quit resumes from its last checkpoint at the next
          launch. The default timeout is thirty minutes.
        </p>
        <h2>Schedules</h2>
        <p>
          Settings &rarr; Customize &rarr; Schedules on the desktop is one table for everything on a clock. A row
          is a task or a skill. Write the schedule as five-field cron or in plain words, for example{' '}
          <em>weekdays at 9am</em>. A skill on a schedule needs an agent to run it in. Every row shows when it
          fires next and how the last run went, with the full run history behind it.
        </p>
        <h2>Where it runs</h2>
        <p>
          A task that touches only its own data and your connections fires on the cloud clock, in UTC, and runs
          with your laptop closed. A task that syncs into an app&rsquo;s data runs on your desktop, where the
          app and its data live: while the desktop is off its runs wait, and it catches up when the desktop is
          back. A skill schedule fires on your desktop. Schedules are library records: see{' '}
          <a href={`${DOCS}/library-sync`}>Your library syncs</a>.
        </p>
      </>
    ),
  },
  {
    slug: 'connections',
    title: 'Connections',
    lede: '3,500+ services as tools, with org-shared or personal auth.',
    body: (
      <>
        <p>
          A connection gives the agent, your tasks, and your apps an authenticated tool surface into a service:
          Gmail, Slack, Salesforce, GitHub, Notion, and thousands more. The connect flow runs through Glyphh&rsquo;s
          server so no project keys ever reach your machine. A connection works in every session, on the desktop
          and in a chat on app.glyphh.ai with no desktop.
        </p>
        <h2>Two scopes</h2>
        <Row k="org">An admin connects one shared account. Every member uses it without doing their own auth</Row>
        <Row k="personal">Each member connects their own account. Only they can use it</Row>
        <p>The tool is the same either way. The scope decides whose credentials it carries.</p>
        <h2>Tool modes</h2>
        <p>
          Every tool on every connection has a mode: <strong>Ask</strong>, <strong>Always allow</strong>, or
          <strong> Never</strong>. The agent obeys it in a session and the task runner obeys it unattended. One rule,
          both places.
        </p>
        <Note kind="admin" title="No charge per call">
          Glyphh never charges per seat, per model or per install. See the{' '}
          <a href="https://glyphh.ai/pricing">pricing page</a>.
        </Note>
      </>
    ),
  },
  {
    slug: 'mcp',
    title: 'MCP in both directions',
    lede: 'Add any MCP server as a connection. Expose Glyphh as one.',
    body: (
      <>
        <h2>As a client: custom MCP servers</h2>
        <p>
          Point a connection at any MCP server and its tools join the agent&rsquo;s toolkit. Give it a URL and the
          app tries streamable HTTP, then falls back to SSE. Give it a command with no scheme and it runs the server
          over stdio.
        </p>
        <p>
          Auth is MCP&rsquo;s own OAuth 2.1 flow, with a loopback listener for the callback. Custom headers are
          write-only once saved. Secrets are stored on your machine with owner-only permissions.
        </p>
        <h2>As a server: drive Glyphh from other tools</h2>
        <p>
          Settings &rarr; MCP Server can start a local MCP endpoint on <code>127.0.0.1:7860</code>. It is off by
          default. Turn it on, mint a token, and any MCP-capable client on your machine can open panels, run your
          installed tools, and read your artifacts.
        </p>
        <Code lang="json">{`{
  "mcpServers": {
    "glyphh": {
      "url": "http://127.0.0.1:7860/mcp",
      "headers": { "Authorization": "Bearer <token from Settings → MCP Server>" }
    }
  }
}`}</Code>
        <p>Tokens are hashed at rest and expire after ninety days. Revoke one from the same page.</p>
        <Note kind="wire" title="Same registry as the cloud relay">
          The local server dispatches through the same tool registry the hosted relay uses. Pipedream connectors
          are deliberately not exposed on the local endpoint.
        </Note>
      </>
    ),
  },
];

const router = [
  {
    slug: 'gateway',
    title: 'The Router',
    lede: 'How a turn reaches a model, and what it costs.',
    body: (
      <>
        <p>
          Every model call goes through your organization&rsquo;s Router: the desktop&rsquo;s agent, your own CLI,
          and anything that speaks the OpenAI or Anthropic API. Your org&rsquo;s roles, budgets, and models apply,
          and every token is accounted for in the console.
        </p>
        <h2>What the app does</h2>
        <ol>
          <li>It asks the server for a member key. The key is minted once per user and reused.</li>
          <li>The agent sends each turn to the Router with that key. The key carries your team, its models, and its budget.</li>
          <li>Log out and the key is gone from the machine.</li>
        </ol>
        <h2>What it costs</h2>
        <p>
          Glyphh never charges per model or per seat. See the <a href="https://glyphh.ai/pricing">pricing page</a>.
        </p>
        <h2>Auto-routers</h2>
        <p>
          An auto-router picks the model per request: frontier models for the hard turns, open weights for the
          rest. Your admin builds them on the console&rsquo;s <strong>Models</strong> page, from any model the org
          has access to.
        </p>
        <Note kind="note" title="Cached tokens count">
          Cache reads and writes are priced at their own rates, so a cached turn costs less.
        </Note>
        <p>
          For a CLI outside the desktop, see <a href={`${DOCS}/own-cli`}>Use your own CLI</a>.
        </p>
      </>
    ),
  },
  {
    slug: 'own-cli',
    title: 'Use your own CLI',
    lede: 'Point a plain Claude Code or Codex install at the Router from a terminal.',
    body: (
      <>
        <p>
          You do not need the desktop to use the Router. Mint a virtual key on the console&rsquo;s Virtual Keys
          page, then set two variables in the shell that runs the CLI.
        </p>
        <h2>Claude Code</h2>
        <Code lang="bash">{`export ANTHROPIC_BASE_URL="https://api.glyphh.ai"
export ANTHROPIC_AUTH_TOKEN="sk-…"   # a virtual key from the console
claude`}</Code>
        <h2>Codex</h2>
        <Code lang="bash">{`export OPENAI_BASE_URL="https://api.glyphh.ai"
export OPENAI_API_KEY="sk-…"
codex`}</Code>
        <h2>Anything that speaks OpenAI</h2>
        <Code lang="python">{`client = OpenAI(
    base_url = "https://api.glyphh.ai",
    api_key  = "sk-…",
)`}</Code>
        <p>
          The key carries its governance with it: which models it may call, how fast, and on whose budget. The
          Router enforces that at the edge. Your code just makes requests.
        </p>
        <Note kind="warn" title="Use the org&rsquo;s base URL">
          The base URL is the one shown on your console&rsquo;s Virtual Keys page. It is the same host your
          console runs on.
        </Note>
        <h2>Your org&rsquo;s skills, in Claude Code</h2>
        <p>
          Every skill and plugin approved on the org hub is a Claude Code plugin. Open the AI Hub in the
          console, press <strong>Use in Claude Code</strong>, and paste the two lines it shows:
        </p>
        <Code lang="bash">{`/plugin marketplace add https://api.glyphh.ai/api/hub/<org>/claude-code/<token>.git
/plugin install <name>@glyphh-<org>`}</Code>
        <p>
          The hub is served as a plugin marketplace, so <strong>/plugin marketplace update</strong> picks up
          what admins approve later. The link is private to your organization. Nothing has to live in a git
          repository.
        </p>
        <h2>Your accounts, from any MCP client</h2>
        <p>
          Add the Router&rsquo;s MCP endpoint to Claude Code, Codex, Cursor, or claude.ai with your virtual
          key, and three tools are there beside the search tool:
        </p>
        <Row k="glyphh_connections">Your connected accounts, the apps the org shares, and what is ready</Row>
        <Row k="glyphh_connect">Returns a link. Open it, authorize the app, and its tools are searchable</Row>
        <Row k="glyphh_disconnect">Drop one account, or every one of yours with <strong>all</strong></Row>
        <Code lang="bash">{`claude mcp add --transport http glyphh https://api.glyphh.ai/mcp \
  --header "Authorization: Bearer sk-…"`}</Code>
        <p>
          Ask the agent to connect Gmail. It calls the tool, hands you the link, and once you have signed in
          the Gmail tools answer to <strong>mcp_tool_search</strong>. The same accounts show up on the desktop
          if you install it later.
        </p>
        <h2>Your org&rsquo;s agents</h2>
        <p>
          An agent your admin registered on the console&rsquo;s Agents page is a model on the Router. Send a
          chat request with <strong>model: a2a/&lt;name&gt;</strong> and the Router forwards it over A2A. The
          name is on the agent&rsquo;s hub page.
        </p>
      </>
    ),
  },
  {
    slug: 'budgets',
    title: 'Budgets and limits',
    lede: 'Every org has a ceiling. Roles narrow it from there.',
    body: (
      <>
        <h2>Limits</h2>
        <p>
          An org admin may set budgets per team or key. They are limits you choose; Glyphh never charges per
          seat, per model or per install. What a plan costs is on the{' '}
          <a href="https://glyphh.ai/pricing">pricing page</a>.
        </p>
        <h2>Roles and keys</h2>
        <p>
          Inside the ceiling, a role decides what a key may do: its models, its rate limits, and its own budget.
          Virtual keys are minted against a role. Role-based access control is an Enterprise feature.
        </p>
        <h2>Rate limits at sign-in</h2>
        <p>
          Sign-in starts are throttled per address and per IP. Over the limit, the server answers with a rate-limit
          error for five minutes.
        </p>
        <Note kind="note" title="Where to watch it">
          The console&rsquo;s Dashboard shows MCP and model spend by day, and a click on a day drills into hours.
          Usage and Logs show every request.
        </Note>
      </>
    ),
  },
];

const org = [
  {
    slug: 'plans',
    title: 'Plans and pricing',
    lede: 'What each plan includes. Never per seat, per model or per install.',
    body: (
      <>
        <h2>Plans</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Plan</th><th>Price</th><th>Managed precedents</th><th>Hosted machines</th><th>Sync</th><th>Offline, HA, SSO/SAML, RBAC, audit logs</th></tr></thead>
            <tbody>
              <tr><td>Free</td><td>$0</td><td>none (local and self-hosted are unlimited)</td><td>0</td><td>no</td><td>no</td></tr>
              <tr><td>Pro</td><td>$99 / month, flat</td><td>100,000</td><td>3</td><td>yes</td><td>no</td></tr>
              <tr><td>Team</td><td>$299 / month, flat</td><td>1,000,000</td><td>10</td><td>yes</td><td>no</td></tr>
              <tr><td>Enterprise</td><td>from $10k / year, by contract</td><td>unlimited</td><td>unlimited</td><td>yes</td><td>yes</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Members, installs and self-hosted runtimes are unlimited on every plan, and Ada is in every plan with no
          add-on. Pro and Team are bought from Billing in the platform; for Enterprise, write to{' '}
          <a href="mailto:sales@glyphh.ai">sales@glyphh.ai</a>.
        </p>
        <h2>Precedents</h2>
        <p>
          A plan&rsquo;s managed precedents are the limit on a hosted runtime. On a local or self-hosted runtime
          there is no limit on any plan: a single instance is free, and syncing many is what Pro and Team are for.
        </p>
        <h2>Hosted machines</h2>
        <p>
          Hosted machines are on Pro, Team and Enterprise. Each is billed by the second while it is started, and
          its disk by the GB-month whether it is started or stopped, on top of the plan. The rates for Pro and
          Team are on the <a href="https://glyphh.ai/pricing#rates">pricing page</a>; Enterprise rates are set in
          your contract. To move to Free, delete your
          hosted machines first.
        </p>
        <h2>Offline licences</h2>
        <p>
          Air-gapped runtimes, with an offline licence, are on Enterprise. Linked and heartbeat licences work on
          every plan.
        </p>
      </>
    ),
  },
  {
    slug: 'security',
    title: 'Sign-in and security',
    lede: 'Magic link, Google, SSO, device flow. What the server refuses.',
    body: (
      <>
        <h2>Ways in</h2>
        <Row k="Magic link">An email with a one-time link</Row>
        <Row k="Google">Sign in with a Google account</Row>
        <Row k="SSO">The org&rsquo;s identity provider. An org can make it mandatory</Row>
        <Row k="Device flow">How the desktop signs in: approve the device in the browser</Row>
        <h2>What the server refuses</h2>
        <ul>
          <li>A sign-in redirect to anywhere but the desktop, the console, a Glyphh domain, or the org&rsquo;s own hub domain.</li>
          <li>Repeated sign-in attempts from one address.</li>
          <li>A magic link for an org that requires SSO.</li>
          <li>A Router request for another org.</li>
        </ul>
        <h2>Sessions</h2>
        <p>
          Sessions are short-lived and refreshed under the hood. Logging out signs out this device and no other.
        </p>
        <h2>On your machine</h2>
        <ul>
          <li>Router credentials stay on your machine, readable only by you, and are removed at logout.</li>
          <li>MCP connection secrets are stored owner-only.</li>
          <li>The last identity is mirrored locally so the app can boot offline. It scopes local state only, never authorization.</li>
          <li>The shell&rsquo;s privileged bridge is granted only to the app&rsquo;s own home page, matched exactly.</li>
        </ul>
        <Note kind="warn" title="Report a problem">
          Found something? Write to <a href="mailto:security@glyphh.ai">security@glyphh.ai</a>. We answer.
        </Note>
      </>
    ),
  },
];

export const PRODUCT_GROUPS = [
  { title: 'The app', pages: desktop },
  { title: 'Model Router', pages: router },
  { title: 'Organization', pages: org },
];
