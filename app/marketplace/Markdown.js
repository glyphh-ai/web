import { fileUrl, rawUrl } from '../lib/marketplace';

// Markdown from the plugins repo (a README, a SKILL.md), drawn as React elements. Nothing in it is ever set as
// HTML: a tag someone wrote in the file is shown as the text it is, and a link is only made to a web address or to
// a file in the repo. Small on purpose: headings, paragraphs, lists, quotes, code, tables, rules, and inline code,
// bold, italic, links and images.

const SAFE_URL = /^(https?:\/\/|mailto:)/i;

function resolve(target, base, forImage) {
  const t = String(target || '').trim().replace(/^<|>$/g, '').split(/\s+/)[0] || '';
  if (!t) return '';
  if (SAFE_URL.test(t)) return forImage && !/^https:\/\//i.test(t) ? '' : t;
  if (/^[a-z][a-z0-9+.-]*:/i.test(t) || t.startsWith('//')) return ''; // javascript:, data: and the like are never linked
  if (t.startsWith('#')) return '';
  const [path, hash] = t.split('#');
  const parts = path.startsWith('/') ? [] : base.split('/').filter(Boolean);
  for (const part of path.split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') parts.pop();
    else parts.push(part);
  }
  const joined = parts.join('/');
  if (forImage) return rawUrl(joined);
  return fileUrl(joined) + (hash ? `#${hash}` : '');
}

const INLINE = new RegExp(
  [
    '(`+)([\\s\\S]*?[^`])\\1(?!`)', // 1,2 code
    '!\\[([^\\]]*)\\]\\(((?:[^()]|\\([^()]*\\))*)\\)', // 3,4 image
    '\\[((?:[^\\[\\]]|\\[[^\\]]*\\])+)\\]\\(((?:[^()]|\\([^()]*\\))*)\\)', // 5,6 link
    '<((?:https?:\\/\\/|mailto:)[^>\\s]+)>', // 7 autolink
    '\\*\\*([\\s\\S]+?)\\*\\*', // 8 bold
    '__([\\s\\S]+?)__', // 9 bold
    '~~([\\s\\S]+?)~~', // 10 struck
    '\\*([^*\\s](?:[\\s\\S]*?[^*\\s])?)\\*', // 11 italic
    '(?<![A-Za-z0-9])_([^_\\s](?:[\\s\\S]*?[^_\\s])?)_(?![A-Za-z0-9])', // 12 italic
    '(https?:\\/\\/[^\\s<>()]+[^\\s<>().,;:!?\'"])', // 13 a bare address
  ].join('|'),
  'g',
);

function inline(text, base, key = 'i', depth = 0) {
  const src = String(text).replace(/\\([\\`*_{}[\]()#+\-.!|<>~])/g, (_, c) => `\u0000${c.charCodeAt(0)}\u0000`);
  const plain = (s) => s.replace(/\u0000(\d+)\u0000/g, (_, n) => String.fromCharCode(Number(n)));
  if (depth > 4) return [plain(src)];
  const out = [];
  let last = 0;
  let n = 0;
  for (const m of src.matchAll(INLINE)) {
    if (m.index > last) out.push(plain(src.slice(last, m.index)));
    const k = `${key}-${n++}`;
    const inner = (s) => inline(s, base, k, depth + 1); // an escaped character stays marked, so it is not read again
    if (m[2] !== undefined) out.push(<code key={k}>{plain(m[2]).trim()}</code>);
    else if (m[3] !== undefined) {
      const srcUrl = resolve(plain(m[4]), base, true);
      out.push(srcUrl ? <img key={k} src={srcUrl} alt={plain(m[3])} loading="lazy" /> : plain(m[3]));
    } else if (m[5] !== undefined) {
      const href = resolve(plain(m[6]), base, false);
      out.push(href ? <a key={k} href={href} target="_blank" rel="noopener noreferrer nofollow">{inner(m[5])}</a> : <span key={k}>{inner(m[5])}</span>);
    } else if (m[7] !== undefined) out.push(<a key={k} href={plain(m[7])} target="_blank" rel="noopener noreferrer nofollow">{plain(m[7]).replace(/^mailto:/, '')}</a>);
    else if (m[8] !== undefined || m[9] !== undefined) out.push(<strong key={k}>{inner(m[8] ?? m[9])}</strong>);
    else if (m[10] !== undefined) out.push(<del key={k}>{inner(m[10])}</del>);
    else if (m[11] !== undefined || m[12] !== undefined) out.push(<em key={k}>{inner(m[11] ?? m[12])}</em>);
    else if (m[13] !== undefined) out.push(<a key={k} href={plain(m[13])} target="_blank" rel="noopener noreferrer nofollow">{plain(m[13])}</a>);
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push(plain(src.slice(last)));
  return out;
}

const FENCE = /^ {0,3}(`{3,}|~{3,})\s*([\w+#.-]*)/;
const HEADING = /^ {0,3}(#{1,6})\s+(.*?)\s*#*\s*$/;
const RULE = /^ {0,3}([-*_])(?:\s*\1){2,}\s*$/;
const ITEM = /^(\s*)([-*+]|\d{1,9}[.)])\s+(.*)$/;
const ROW = /^\s*\|?.*\|.*$/;
const DIVIDER = /^\s*\|?\s*:?-{1,}:?\s*(\|\s*:?-{1,}:?\s*)*\|?\s*$/;

const cells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|'));
const indentOf = (line) => line.match(/^\s*/)[0].replace(/\t/g, '    ').length;

function blocks(lines, base, key, shift, depth = 0) {
  const out = [];
  let i = 0;
  let n = 0;
  const startsBlock = (line) => FENCE.test(line) || HEADING.test(line) || RULE.test(line) || /^ {0,3}>/.test(line) || ITEM.test(line);
  while (i < lines.length) {
    const line = lines[i];
    const k = `${key}-${n++}`;
    if (!line.trim()) { i++; n--; continue; }
    const fence = FENCE.exec(line);
    if (fence) {
      const close = new RegExp(`^ {0,3}${fence[1][0]}{${fence[1].length},}\\s*$`);
      const body = [];
      i++;
      while (i < lines.length && !close.test(lines[i])) body.push(lines[i++]);
      i++;
      out.push(<pre key={k} className="mpmd-pre"><code>{body.join('\n')}</code></pre>);
      continue;
    }
    const heading = HEADING.exec(line);
    if (heading) {
      const Tag = `h${Math.min(heading[1].length + shift, 6)}`;
      out.push(<Tag key={k}>{inline(heading[2], base, k)}</Tag>);
      i++;
      continue;
    }
    if (RULE.test(line)) { out.push(<hr key={k} />); i++; continue; }
    if (/^ {0,3}>/.test(line) && depth < 4) {
      const body = [];
      while (i < lines.length && lines[i].trim() && (/^ {0,3}>/.test(lines[i]) || !startsBlock(lines[i]))) body.push(lines[i++].replace(/^ {0,3}>\s?/, ''));
      out.push(<blockquote key={k}>{blocks(body, base, k, shift, depth + 1)}</blockquote>);
      continue;
    }
    if (ROW.test(line) && i + 1 < lines.length && DIVIDER.test(lines[i + 1]) && lines[i + 1].includes('-')) {
      const head = cells(line);
      const rows = [];
      i += 2;
      while (i < lines.length && lines[i].trim() && lines[i].includes('|')) rows.push(cells(lines[i++]));
      out.push(
        <div key={k} className="mpmd-table">
          <table>
            <thead><tr>{head.map((c, j) => <th key={j}>{inline(c, base, `${k}-h${j}`)}</th>)}</tr></thead>
            <tbody>
              {rows.map((r, a) => <tr key={a}>{head.map((_, j) => <td key={j}>{inline(r[j] || '', base, `${k}-${a}-${j}`)}</td>)}</tr>)}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    const item = ITEM.exec(line);
    if (item && depth < 6) {
      const ordered = /\d/.test(item[2]);
      const at = indentOf(line);
      const items = [];
      while (i < lines.length) {
        const it = ITEM.exec(lines[i]);
        if (!it || indentOf(lines[i]) !== at || /\d/.test(it[2]) !== ordered) break;
        const body = [it[3]];
        i++;
        // what belongs to this item: indented lines, and blank lines followed by one
        while (i < lines.length) {
          if (!lines[i].trim()) {
            if (i + 1 < lines.length && lines[i + 1].trim() && indentOf(lines[i + 1]) > at) { body.push(''); i++; continue; }
            break;
          }
          if (indentOf(lines[i]) > at) { body.push(lines[i].slice(Math.min(indentOf(lines[i]), at + 2))); i++; continue; }
          if (startsBlock(lines[i]) || (ROW.test(lines[i]) && lines[i].includes('|'))) break;
          body.push(lines[i].trim()); // a lazy continuation of the item's paragraph
          i++;
        }
        while (i < lines.length && !lines[i].trim() && i + 1 < lines.length && ITEM.test(lines[i + 1]) && indentOf(lines[i + 1]) === at) i++;
        items.push(body);
      }
      const List = ordered ? 'ol' : 'ul';
      out.push(
        <List key={k}>
          {items.map((body, a) => {
            const task = /^\[([ xX])\]\s+/.exec(body[0]);
            if (task) body[0] = `${task[1] === ' ' ? '☐' : '☑'} ${body[0].slice(task[0].length)}`;
            const inner = blocks(body, base, `${k}-${a}`, shift, depth + 1);
            // a one-paragraph item reads as a line, not as a paragraph in a box
            const only = inner.length === 1 && inner[0].type === 'p' ? inner[0].props.children : inner;
            return <li key={a}>{only}</li>;
          })}
        </List>,
      );
      continue;
    }
    if (/^\s*<!--/.test(line)) { // a comment is not part of the page
      while (i < lines.length && !lines[i].includes('-->')) i++;
      i++;
      n--;
      continue;
    }
    const para = [line.trim()];
    i++;
    while (i < lines.length && lines[i].trim() && !startsBlock(lines[i]) && !(ROW.test(lines[i]) && i + 1 < lines.length && DIVIDER.test(lines[i + 1]))) para.push(lines[i++].trim());
    out.push(<p key={k}>{inline(para.join(' '), base, k)}</p>);
  }
  return out;
}

/**
 * `source` is the markdown; `path` the file it came from in the repo, so its relative links and images resolve;
 * `shift` how far its headings step down (a README's `#` under a section title of the page).
 */
export default function Markdown({ source, path = '', shift = 2, className = '' }) {
  const base = path.split('/').slice(0, -1).join('/');
  const lines = String(source || '').replace(/\r\n?/g, '\n').split('\n');
  return <div className={`mpmd ${className}`.trim()}>{blocks(lines, base, 'b', shift)}</div>;
}
