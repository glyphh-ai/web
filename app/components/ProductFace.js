import ExpandableShot from './ExpandableShot';

/**
 * ProductFace — the shared template for the three faces of the product
 * (assistant / coding agent / autopilot). One component, used three times,
 * alternating screenshot side — visibly the same template on purpose: three
 * faces of one product, not three products. Stacks image-above-text on
 * mobile.
 */

export default function ProductFace({ title, body, tags, shot, alt, flip }) {
  return (
    <section className={`face${flip ? ' face-flip' : ''}`}>
      <div className="container face-grid">
        <div className="face-shot reveal">
          <ExpandableShot src={shot} alt={alt} />
        </div>
        <div className="face-copy reveal">
          <h2 className="face-title">{title}</h2>
          <p className="face-body">{body}</p>
          <div className="face-tags">
            {tags.map((t) => (
              <span className="face-tag" key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
