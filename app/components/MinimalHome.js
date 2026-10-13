import Image from 'next/image';

// THE MINIMAL HOME (his order, 2026-10-13): the Glyphh logo at the centre of
// the page and one line under it, nothing else.
export default function MinimalHome() {
  return (
    <main className="mh-page">
      <Image className="mh-logo" src="/glyphh-logo-black.png" alt="Glyphh" width={650} height={215} priority />
      <h1 className="mh-line">What if you could combine all AI super powers into one?</h1>
    </main>
  );
}
