/**
 * Control plane — preview of the dot-prefixed CLI that replaces the
 * old .yo / .sup / .dip command language. Five verbs, each a tool
 * family. No videos here (those get re-shot); just a clean reference
 * card so the dot's role is grounded in dev/automation language.
 */

import { styledText } from './cmd-style';

const verbs = [
  {
    cmd: '.agent',
    arg: '<name> <task>',
    desc: 'Drive a saved agent. Each agent has its own role, model, permissions, and toolset — call any of them from anywhere.',
  },
  {
    cmd: '.flow',
    arg: '<name>',
    desc: 'Run a stored flow — your durable automation, cron-able and resumable. Steps chain skills, MCP tools, and agent turns.',
  },
  {
    cmd: '.run',
    arg: '<skill>',
    desc: 'One-shot a skill. Prompt-based or JavaScript runner; pass args, get output, optionally schedule it.',
  },
  {
    cmd: '.deploy',
    arg: '<target>',
    desc: 'Ship something. Push an app, publish an agent, distribute a skill bundle. Same verb, every artifact type.',
  },
  {
    cmd: '.do',
    arg: '<freeform>',
    desc: 'When you don\'t want to pick a verb. The default agent inspects the prompt, picks the path, and reports back inline.',
  },
];

export default function ControlPlane() {
  return (
    <section className="control-plane" id="control-plane">
      <div className="container">
        <div className="section-label reveal">{'{'}
          <span className="accent">ONE CONTROL PLANE</span>
          {'}'}</div>
        <h2 className="section-title reveal">Five verbs. Every workflow.</h2>
        <p className="control-plane-lede reveal">
          The dot is your CLI. Five top-level verbs cover everything Glyphh
          does — and each one is a real tool family you can extend with your
          own agents, flows, and skills.
        </p>
        <div className="control-plane-list">
          {verbs.map((v, i) => (
            <div key={i} className="control-plane-row reveal">
              <code className="control-plane-cmd">
                <span className="dot">.</span>{v.cmd.slice(1)}
                <span className="control-plane-arg"> {v.arg}</span>
              </code>
              <p className="control-plane-desc">{styledText(v.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
