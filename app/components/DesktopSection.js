import DesktopShots from './DesktopShots';

/**
 * DesktopSection — the first section in the frame (his order, 2026-10-05:
 * "move the screen shots out of the hero and further down in the first
 * section … somewhere to talk about the desktop on the page"). The frame's
 * pattern: a kicker row, the small heading, a lede, then the v2 screenshots
 * cycling in the white-ruled frame, exactly as they did in the hero.
 */
export default function DesktopSection() {
  return (
    <section className="hiw dsk" id="desktop">
      <div className="qs-head">
        <span className="qs-kicker">Glyphh Desktop</span>
        <a href="#download" className="qs-more">Download &darr;</a>
      </div>
      <h2 className="ix-h2 lt-h2">The same app on your machine and in your browser.</h2>
      <p className="ix-desc hv-pitch-lede">
        Chat, work, and code run beside the apps you already use. A session works in a folder on your
        desktop, or as a chat in your org&rsquo;s cloud when no desktop is online. Mac, Windows, Linux,
        and the CLIs you already run.
      </p>
      <div className="dsk-shots">
        <DesktopShots />
      </div>
    </section>
  );
}
