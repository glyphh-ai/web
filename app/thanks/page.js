// Where a mod's Payment Link lands after paying. The mod unlocks by itself
// (it asks /api/license), so there is nothing to copy here.
export const metadata = { title: 'Thanks — Glyphh', robots: { index: false } };

export default function Thanks() {
  return (
    <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '48px 16px', textAlign: 'center' }}>
      <div>
        <h1 style={{ fontSize: 32, margin: '0 0 12px' }}>You're all set.</h1>
        <p style={{ fontSize: 18, opacity: 0.75, margin: 0 }}>Go back to Claude. Your mod unlocks on its own in a few seconds.</p>
      </div>
    </main>
  );
}
