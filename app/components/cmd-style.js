const CMD_RE = /(\.(?:[Yy]o|[Ss]up|[Dd]rip|[Dd]ip|[Pp]eace|[Cc]ode|[Ww]s))(?![a-zA-Z0-9])/g;

export function styledText(text) {
  if (typeof text !== 'string') return text;
  const re = new RegExp(CMD_RE.source, CMD_RE.flags);
  const parts = [];
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(<span key={m.index} className="compose-cmd">{m[1]}</span>);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 1 ? parts : text;
}
