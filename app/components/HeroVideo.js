export default function HeroVideo() {
  return (
    <section className="hero-video reveal">
      <div className="hero-video-frame">
        <div className="hero-video-inner">
          <video
            className="hero-video-player"
            src="/hero-v1-yosup.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </section>
  );
}
