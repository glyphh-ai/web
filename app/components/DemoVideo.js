import { useRef, useEffect } from 'react';

export default function DemoVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="demo-video">
      <video
        ref={videoRef}
        className="demo-video-player"
        src="/demo.mp4"
        muted
        loop
        playsInline
        preload="metadata"
      />
    </section>
  );
}
