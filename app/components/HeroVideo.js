export default function HeroVideo() {
  return (
    <section className="hero-video reveal">
      <div className="hero-video-inner">
        <video
          className="hero-video-player"
          src="/cypher-start.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  );
}
