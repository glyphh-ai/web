'use client';

import { useState } from 'react';

/**
 * A video of our own (public/), loaded only when it is asked for: the poster and a play button first, and the
 * video itself, with its controls, after a click. Nothing autoplays and nothing is fetched before the click.
 */
export default function Video({ src, poster, title, tall }) {
  const [on, setOn] = useState(false);
  return (
    <figure className={`st-video${tall ? ' tall' : ''}`}>
      <div className="st-video-box">
        {on ? (
          <video src={src} poster={poster} controls autoPlay playsInline preload="none" />
        ) : (
          <button type="button" className="yt-facade" onClick={() => setOn(true)} aria-label={`Play: ${title}`}>
            <img src={poster} alt="" loading="lazy" decoding="async" />
            <span className="yt-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </button>
        )}
      </div>
      <figcaption>{title}</figcaption>
    </figure>
  );
}
