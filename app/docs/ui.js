// The docs' two building blocks: a key/value row and a code block.

export function Row({ k, children }) {
  return (
    <div className="dx-row">
      <code>{k}</code>
      <span>{children}</span>
    </div>
  );
}

export function Code({ children, lang }) {
  return <pre className="dx-code" data-lang={lang}>{children}</pre>;
}
