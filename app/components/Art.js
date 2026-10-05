/**
 * Art — one of the deck's line-art pieces (public/art/*.webp, from
 * ../glyphh-slides, his order 2026-10-05: "way more minimalistic"): a black
 * ground, 1px white lines, one purple dot. Decorative unless an alt is given.
 * The light theme inverts the picture in CSS (.art), so one file serves both.
 */
export default function Art({ name, alt = '', className = '' }) {
  return (
    <img
      src={`/art/${name}.webp`}
      alt={alt}
      className={`art ${className}`.trim()}
      width="1264"
      height="848"
      loading="lazy"
      decoding="async"
      aria-hidden={alt ? undefined : 'true'}
    />
  );
}
