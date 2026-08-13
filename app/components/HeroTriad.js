'use client';

/**
 * HeroTriad — "Chat, Work & Code" in the hero lede as live words: white,
 * gradient on hover, and hovering one switches the tab stage below to match
 * (HeroTabs listens for the event). Pointer-only affordance — the tabs
 * themselves stay the accessible control.
 */
const WORDS = [
  { id: 'chat', label: 'Chat' },
  { id: 'work', label: 'Work' },
  { id: 'code', label: 'Code' },
];

function aim(id) {
  window.dispatchEvent(new CustomEvent('glyphh:hero-triad', { detail: id }));
}

export default function HeroTriad() {
  return (
    <>
      {WORDS.map((w, i) => (
        <span key={w.id}>
          {i === 1 ? ', ' : i === 2 ? ' & ' : ''}
          <span className="hero-triad-word" onMouseEnter={() => aim(w.id)}>
            {w.label}
          </span>
        </span>
      ))}
    </>
  );
}
