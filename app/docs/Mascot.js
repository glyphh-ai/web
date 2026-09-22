import { CHARACTERS, CAST } from './mascots';

/** One of the cast, inline, sized by CSS. */
export function Mascot({ name, size = 64, className = '' }) {
  const m = CAST.find((c) => c.key === name) || CAST[0];
  const svg = `<svg viewBox="0 0 48 48" role="img" aria-label="${m.name}">${CHARACTERS[m.key](m.color)}</svg>`;
  return (
    <span
      className={`dx-mascot ${className}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/** The cast, standing in a row. */
export function Cast({ size = 56 }) {
  return (
    <div className="dx-cast" aria-hidden="true">
      {CAST.map((m) => (
        <span key={m.key} className="dx-cast-one">
          <Mascot name={m.key} size={size} />
          <span className="dx-cast-name">{m.name}</span>
        </span>
      ))}
    </div>
  );
}

/* The callouts, in the browser-error-page's grammar: a mascot, a pill with a
   small stroke icon, a title, the detail. Which cousin fronts a note is fixed
   by its kind, the same casting the desktop uses for its error pages. */
const KINDS = {
  note: { mascot: 'scout', tone: 'info', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v.01M12 11v5', label: 'Note' },
  tip: { mascot: 'sage', tone: 'ok', icon: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5.9 1.1 1 1.8V16h5v-.3c.1-.7.4-1.3 1-1.8A6 6 0 0 0 12 3z', label: 'Tip' },
  warn: { mascot: 'patch', tone: 'warn', icon: 'M10.3 3.9 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9.4v4.2M12 17.2v.01', label: 'Watch out' },
  admin: { mascot: 'tally', tone: 'warn', icon: 'M4 10.5h16v10H4zM8 10.5V7a4 4 0 0 1 8 0v3.5M12 14.5V17', label: 'Admin only' },
  wire: { mascot: 'post', tone: 'info', icon: 'M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6zM12 17v5', label: 'Wiring' },
  code: { mascot: 'byte', tone: 'info', icon: 'M8 8 4 12l4 4M16 8l4 4-4 4M14 5l-4 14', label: 'For developers' },
};

export function Note({ kind = 'note', title, children }) {
  const k = KINDS[kind] || KINDS.note;
  return (
    <aside className={`dx-note dx-note-${k.tone}`}>
      <Mascot name={k.mascot} size={72} className="dx-note-mascot" />
      <div className="dx-note-body">
        <span className="dx-pill">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={k.icon} /></svg>
          {k.label}
        </span>
        {title && <div className="dx-note-title">{title}</div>}
        <div className="dx-note-detail">{children}</div>
      </div>
    </aside>
  );
}

/** A keyboard shortcut or command row: `<Row k="⌘⇧Space">…</Row>` */
export function Row({ k, children }) {
  return (
    <div className="dx-row">
      <code>{k}</code>
      <span>{children}</span>
    </div>
  );
}

export function Code({ children, lang }) {
  return (
    <pre className="dx-code" data-lang={lang}>{children}</pre>
  );
}

// A screenshot with a caption. Without a `src` it draws the frame and says
// the shot is coming, so a page can be written before the picture exists.
export function Shot({ src, alt = '', caption }) {
  return (
    <figure className="dx-shot">
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="dx-shot-empty" role="img" aria-label={alt || 'Screenshot coming'}>Screenshot coming</div>
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
