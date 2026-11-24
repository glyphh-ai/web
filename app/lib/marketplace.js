import { cache } from 'react';

// The Marketplace (2026-11-24) only SHOWS what is in github.com/glyphh-ai/plugins, a Claude plugin marketplace.
// Nothing is stored here: one call lists every path in the repo, then the files a page needs are read raw. Every
// read is kept for ten minutes (Next's data cache), sends no token, and can fail without failing the page: a repo
// with nothing in it is `empty`, GitHub out of reach is `error`, and the build never depends on either.

export const REPO = 'glyphh-ai/plugins';
export const REPO_URL = `https://github.com/${REPO}`;
export const ADD_COMMAND = `/plugin marketplace add ${REPO}`;
export const REVALIDATE = 600;

const TREE_URL = `https://api.github.com/repos/${REPO}/git/trees/HEAD?recursive=1`;
const RAW = `https://raw.githubusercontent.com/${REPO}/HEAD/`;
const HEADERS = { 'User-Agent': 'glyphh-web (+https://glyphh.ai)' };
const TIMEOUT_MS = 8000;
const MAX_TEXT = 200_000; // a file larger than this is shown cut, never refused

async function get(url, headers = {}) {
  return fetch(url, {
    headers: { ...HEADERS, ...headers },
    next: { revalidate: REVALIDATE },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

/** Every file path in the repo: {state: 'ok', paths: Set} | {state: 'empty'} | {state: 'error'}. */
// GitHub allows few calls an hour without a token: when it refuses one, the last listing this process read is shown.
let lastTree = null;
const tree = cache(async () => {
  try {
    const res = await get(TREE_URL, { Accept: 'application/vnd.github+json' });
    if (res.status === 404 || res.status === 409) return { state: 'empty' }; // no commits yet, or no repo
    if (!res.ok) return lastTree || { state: 'error' };
    const body = await res.json();
    const paths = new Set((Array.isArray(body?.tree) ? body.tree : []).filter((e) => e?.type === 'blob').map((e) => String(e.path)));
    lastTree = { state: 'ok', paths };
    return lastTree;
  } catch {
    return lastTree || { state: 'error' };
  }
});

/** A file's text, or null when it is not there or cannot be read. */
const text = cache(async (path) => {
  try {
    const res = await get(RAW + path.split('/').map(encodeURIComponent).join('/'));
    if (!res.ok) return null;
    return (await res.text()).slice(0, MAX_TEXT);
  } catch {
    return null;
  }
});

async function json(path) {
  const t = await text(path);
  if (t === null) return null;
  try {
    const v = JSON.parse(t);
    return v && typeof v === 'object' ? v : null;
  } catch {
    return null;
  }
}

const str = (v) => (typeof v === 'string' ? v.trim() : '');
const list = (v) => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);
const obj = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v : {});
const author = (v) => (typeof v === 'string' ? { name: v.trim(), url: '' } : { name: str(obj(v).name), url: webUrl(obj(v).url) });

/** Only a web address is ever linked. */
export function webUrl(v) {
  const s = str(v);
  return /^https?:\/\//i.test(s) ? s : '';
}

/** A path inside the repo from a marketplace `source` such as "./plugins/x"; null when it is not one. */
function repoDir(source, root = '') {
  if (typeof source !== 'string') return null;
  const raw = source.trim();
  if (!raw || /^[a-z][a-z0-9+.-]*:/i.test(raw) || raw.startsWith('/')) return null;
  const parts = [];
  for (const part of [...root.split('/'), ...raw.split('/')]) {
    if (!part || part === '.') continue;
    if (part === '..') return null;
    parts.push(part);
  }
  return parts.join('/');
}

/** Where a plugin kept in another repo lives, as a web address ('' when none can be told). */
function externalUrl(source) {
  if (typeof source === 'string') return webUrl(source.replace(/\.git$/, ''));
  const s = obj(source);
  const repo = str(s.repo);
  if (/^[\w.-]+\/[\w.-]+$/.test(repo)) return `https://github.com/${repo}`;
  return webUrl(str(s.url).replace(/\.git$/, ''));
}

export const fileUrl = (path) => `${REPO_URL}/blob/HEAD/${path.split('/').map(encodeURIComponent).join('/')}`;
export const dirUrl = (path) => (path ? `${REPO_URL}/tree/HEAD/${path.split('/').map(encodeURIComponent).join('/')}` : REPO_URL);
export const rawUrl = (path) => RAW + path.split('/').map(encodeURIComponent).join('/');

/**
 * The front matter of a markdown file (the `key: value` lines between two `---` lines) and the rest. Reads the
 * small part of YAML that skills, commands and agents use: plain and quoted values, and `>` or `|` blocks.
 */
export function frontMatter(source) {
  const src = String(source || '').replace(/^﻿/, '');
  const m = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(src);
  if (!m) return { data: {}, body: src };
  const data = {};
  const lines = m[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const kv = /^([A-Za-z0-9_-]+):[ \t]*(.*)$/.exec(lines[i]);
    if (!kv) continue;
    let value = kv[2].trim();
    const block = /^[>|][+-]?$/.test(value);
    const more = [];
    while (i + 1 < lines.length && (/^[ \t]+\S/.test(lines[i + 1]) || (block && lines[i + 1].trim() === ''))) more.push(lines[++i].trim());
    if (block) value = value.startsWith('|') ? more.join('\n') : more.join(' ');
    else if (more.length && value) value = [value, ...more].join(' ');
    else if (more.length) continue; // a list or a map: not something shown
    value = value.trim();
    if (value.length > 1 && ((value[0] === '"' && value.endsWith('"')) || (value[0] === "'" && value.endsWith("'")))) {
      value = value[0] === '"' ? value.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, ' ') : value.slice(1, -1).replace(/''/g, "'");
    }
    data[kv[1]] = value.replace(/\s+/g, ' ').trim();
  }
  return { data, body: src.slice(m[0].length) };
}

/** The first plain paragraph of a markdown text: a description for a file that names none. */
function firstParagraph(md) {
  for (const block of String(md || '').split(/\r?\n\s*\r?\n/)) {
    const line = block.trim().replace(/\s+/g, ' ');
    if (line && !/^(#|```|~~~|<|\||[-*+] |\d+\. |>|---)/.test(line)) return line.replace(/[*_`]/g, '').slice(0, 300);
  }
  return '';
}

/** The marketplace file and the repo's paths. */
const index = cache(async () => {
  const t = await tree();
  if (t.state !== 'ok') return { state: t.state };
  const file = obj(t.paths.has('.claude-plugin/marketplace.json') ? await json('.claude-plugin/marketplace.json') : null);
  const meta = obj(file.metadata);
  const root = str(meta.pluginRoot);
  let entries = (Array.isArray(file.plugins) ? file.plugins : []).filter((p) => str(obj(p).name)).map((p) => ({ ...p, dir: repoDir(p.source, root) }));
  if (entries.length === 0) {
    // No list (or no marketplace file yet): every folder that holds a plugin is one.
    entries = [...t.paths]
      .filter((p) => p.endsWith('/.claude-plugin/plugin.json'))
      .map((p) => p.slice(0, -'/.claude-plugin/plugin.json'.length))
      .map((dir) => ({ name: dir.split('/').pop(), dir }));
  }
  return {
    state: entries.length ? 'ok' : 'empty',
    paths: t.paths,
    entries,
    marketplace: {
      name: str(file.name) || 'plugins',
      owner: str(obj(file.owner).name),
      description: str(meta.description) || str(file.description),
      version: str(meta.version),
    },
  };
});

/** The names of a plugin's MCP servers, from plugin.json `mcpServers` (a map, or a path to a file) or `.mcp.json`. */
async function connectors(dir, manifest, paths) {
  const found = new Map();
  const take = (servers, path) => {
    const map = obj(obj(servers).mcpServers && typeof obj(servers).mcpServers === 'object' ? servers.mcpServers : servers);
    for (const [name, def] of Object.entries(map)) {
      if (!found.has(name)) found.set(name, { name, kind: str(obj(def).type) || (obj(def).url ? 'http' : obj(def).command ? 'local' : ''), url: fileUrl(path) });
    }
  };
  const declared = manifest.mcpServers;
  if (declared && typeof declared === 'object') take(declared, `${dir}/.claude-plugin/plugin.json`);
  const file = typeof declared === 'string' ? repoDir(declared, dir) : null;
  for (const path of [file, `${dir}/.mcp.json`]) {
    if (path && paths.has(path)) take(await json(path), path);
  }
  return [...found.values()];
}

/** The events a plugin hooks, from `hooks/hooks.json` or plugin.json `hooks`. */
async function hooks(dir, manifest, paths) {
  const path = `${dir}/hooks/hooks.json`;
  const inline = manifest.hooks && typeof manifest.hooks === 'object' ? manifest.hooks : null;
  const file = inline ? null : paths.has(path) ? await json(path) : null;
  const events = obj(obj(inline || file).hooks || inline || file);
  const url = fileUrl(inline ? `${dir}/.claude-plugin/plugin.json` : path);
  return Object.entries(events)
    .filter(([, v]) => Array.isArray(v) && v.length)
    .map(([name, v]) => ({ name, count: v.length, url }));
}

const under = (paths, prefix, test) => [...paths].filter((p) => p.startsWith(prefix) && test(p.slice(prefix.length))).sort();

/** One plugin as the list shows it: what the marketplace and its own plugin.json say, and what it holds. */
async function summary(entry, paths) {
  const e = obj(entry);
  const dir = e.dir;
  const local = typeof dir === 'string' && dir !== '';
  const manifest = obj(local && paths.has(`${dir}/.claude-plugin/plugin.json`) ? await json(`${dir}/.claude-plugin/plugin.json`) : null);
  const by = author(manifest.author);
  const fallback = author(e.author);
  const plugin = {
    name: str(e.name),
    description: str(manifest.description) || str(e.description),
    version: str(manifest.version) || str(e.version),
    author: { name: by.name || fallback.name, url: by.url || fallback.url },
    category: str(e.category) || str(manifest.category),
    keywords: [...new Set([...list(manifest.keywords), ...list(e.keywords), ...list(e.tags)])],
    license: str(manifest.license) || str(e.license),
    homepage: webUrl(manifest.homepage) || webUrl(e.homepage),
    local,
    dir: local ? dir : '',
    url: local ? dirUrl(dir) : externalUrl(e.source) || webUrl(typeof manifest.repository === 'string' ? manifest.repository : '') || REPO_URL,
    skills: [], commands: [], agents: [], hooks: [], connectors: [],
  };
  if (!local) return plugin;
  plugin.skills = under(paths, `${dir}/skills/`, (rest) => /^[^/]+\/SKILL\.md$/.test(rest));
  plugin.commands = under(paths, `${dir}/commands/`, (rest) => /\.md$/i.test(rest));
  plugin.agents = under(paths, `${dir}/agents/`, (rest) => /\.md$/i.test(rest));
  [plugin.hooks, plugin.connectors] = await Promise.all([hooks(dir, manifest, paths), connectors(dir, manifest, paths)]);
  return plugin;
}

/** What a card and a header count. */
export function counts(plugin) {
  return [
    ['Skills', plugin.skills.length],
    ['Commands', plugin.commands.length],
    ['Agents', plugin.agents.length],
    ['Hooks', plugin.hooks.reduce((n, h) => n + h.count, 0)],
    ['Connectors', plugin.connectors.length],
  ].filter(([, n]) => n > 0);
}

/** The whole marketplace for the list: {state, marketplace, plugins}. state is 'ok', 'empty' or 'error'. */
export const getMarketplace = cache(async () => {
  try {
    const ix = await index();
    if (ix.state !== 'ok') return { state: ix.state, marketplace: ix.marketplace || { name: 'plugins' }, plugins: [] };
    const plugins = await Promise.all(ix.entries.map((e) => summary(e, ix.paths)));
    return { state: 'ok', marketplace: ix.marketplace, plugins };
  } catch {
    return { state: 'error', marketplace: { name: 'plugins' }, plugins: [] };
  }
});

async function documents(pathList, nameOf) {
  return Promise.all(pathList.map(async (path) => {
    const { data, body } = frontMatter(await text(path));
    return {
      name: str(data.name) || nameOf(path),
      description: str(data.description) || firstParagraph(body),
      body: body.trim(),
      path,
      url: fileUrl(path),
    };
  }));
}

/** One plugin in full, for its page: {state: 'ok', plugin, marketplace} | {state: 'missing'} | {state: 'error'}. */
export const getPlugin = cache(async (name) => {
  const m = await getMarketplace();
  if (m.state === 'error') return { state: 'error' };
  const found = m.plugins.find((p) => p.name === name);
  if (!found) return { state: 'missing' };
  if (!found.local) return { state: 'ok', marketplace: m.marketplace, plugin: { ...found, readme: '' } };
  try {
    const ix = await index();
    const readmePath = ['README.md', 'readme.md', 'Readme.md'].map((f) => `${found.dir}/${f}`).find((p) => ix.paths.has(p));
    const base = (p) => p.split('/').pop().replace(/\.md$/i, '');
    const [skills, commands, agents, readme] = await Promise.all([
      documents(found.skills, (p) => p.split('/').slice(-2)[0]),
      documents(found.commands, base),
      documents(found.agents, base),
      readmePath ? text(readmePath) : null,
    ]);
    return { state: 'ok', marketplace: m.marketplace, plugin: { ...found, skills, commands, agents, readme: readme || '', readmePath: readmePath || '' } };
  } catch {
    return { state: 'error' };
  }
});
