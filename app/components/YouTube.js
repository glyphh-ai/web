'use client';

import { useState } from 'react';

/**
 * A YouTube video that loads only when it is asked for: a poster (YouTube's own thumbnail) and a play button,
 * and the player (youtube-nocookie) after a click. Nothing autoplays on its own and nothing from YouTube loads
 * before the click.
 */
export default function YouTube({ id, title }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <iframe
        className="yt-frame"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay"
        allowFullScreen
      />
    );
  }
  return (
    <button type="button" className="yt-facade" onClick={() => setOn(true)} aria-label={`Play: ${title}`}>
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
      <span className="yt-play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </span>
    </button>
  );
}
