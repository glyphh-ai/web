// The footer of every page on glyphh.ai, written once. app/layout.js prints it under the legal pages; the plain
// pages in public/ (the front page and each game's page) carry the same markup, and test/games.test.mjs fails if
// one of them differs. Its style is in games.css (.site-foot).
export const FOOTER = `<footer class="site-foot">
    <div class="site-foot-in">
      <div class="site-foot-brand">
        <a href="/" aria-label="Glyphh, the front page"><img src="/glyphh-logo-black.png" alt="Glyphh" class="logo" width="115" height="38" loading="lazy"></a>
        <p>A small independent game studio.</p>
        <a class="site-foot-mail" href="mailto:support@glyphh.ai">support@glyphh.ai</a>
      </div>
      <nav class="site-foot-col" aria-label="Games">
        <p class="site-foot-label">Games</p>
        <a href="/free-fall-frank/">Free Fall Frank</a>
        <a href="/bams-and-brags/">Bams &amp; Brags</a>
        <a href="/crabby-knife-fight/">Crabby Knife Fight</a>
      </nav>
      <nav class="site-foot-col" aria-label="Studio">
        <p class="site-foot-label">Studio</p>
        <a href="/#about">About</a>
        <a href="mailto:support@glyphh.ai?subject=Advertise%20in%20a%20Glyphh%20game">Advertise</a>
      </nav>
      <nav class="site-foot-col" aria-label="Legal">
        <p class="site-foot-label">Legal</p>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <a href="/refund">Refunds</a>
      </nav>
    </div>
    <p class="site-foot-legal">&copy; 2026 Glyphh AI LLC</p>
  </footer>`;
