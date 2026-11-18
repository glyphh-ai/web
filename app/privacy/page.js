// Rewritten 2026-11-18: Glyphh is a game studio. What glyphh.ai itself holds (server logs, nothing more) and what the
// games hold; Bams & Brags has a privacy policy of its own (bamsandbrags.com/legal/privacy). A careful draft, not a
// lawyer's text. What the site loads from other hosts was read from public/ and app/layout.js (the fonts, the games'
// videos), and each company named in section 5 from the games' own servers.
// test/games.test.mjs checks what the three legal pages may and may not say.

export const metadata = {
  title: 'Privacy Policy — Glyphh',
  description: 'Privacy Policy for glyphh.ai and the games made by Glyphh AI LLC.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <div className="policy-page">
        <div className="container">
          <a href="/" className="policy-back">&larr; Back</a>
          <h1 className="policy-title">Privacy Policy</h1>

          <div className="policy-note">
            <p>This page is written in plain English. It was updated on 18 November 2026 to describe Glyphh as it is now: a small independent game studio, and its games.</p>
          </div>

          <p><strong>Effective Date:</strong> November 18, 2026</p>
          <p><strong>Last updated 18 November 2026</strong></p>
          <p>This policy explains what Glyphh AI LLC (&ldquo;Glyphh&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) holds when you visit the website glyphh.ai or play one of our games. Use of the website and the games is governed by our <a href="/terms">Terms of Use</a>.</p>

          <h2>In short</h2>
          <ul>
            <li><strong>This website keeps almost nothing.</strong> It has no accounts, no sign-in and no forms. It sets no cookies and runs no tracking or advertising scripts.</li>
            <li><strong>The games keep what they need to work:</strong> your account, your play, what you make and what you buy. Never your card number.</li>
            <li><strong>We never sell your information</strong>, and we never share it except with the companies listed below, only as needed to run the website and the games.</li>
            <li><strong>To see or delete what we hold about you</strong>, write to <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</li>
          </ul>

          <h2>1. This Website</h2>
          <p>glyphh.ai presents the studio and its games and links to them. We do not ask you for anything here, and the website does not store anything in your browser.</p>
          <p><strong>Server logs.</strong> Like any website, the servers that deliver glyphh.ai see ordinary request logs: your IP address, the time, the page asked for and your browser&apos;s description of itself. Those servers are run by Fly.io, our hosting provider, with Cloudflare in front of it.</p>
          <p><strong>Fonts.</strong> The pages load their fonts from Google Fonts. Your browser asks Google for them, so Google receives that request, with your IP address.</p>
          <p><strong>Videos.</strong> The videos on this website are served from the games&apos; own sites: freefallfrank.com, bamsandbrags.com and crabbyknifefight.com. When a video loads, your browser asks that site for it, so that site receives the request, with your IP address.</p>
          <p><strong>Email.</strong> If you write to us, we receive your email address and what you wrote.</p>

          <h2>2. Our Games</h2>
          <p>Each game is a website of its own and holds its own information.</p>
          <p><strong>Bams &amp; Brags</strong> (bamsandbrags.com) has a privacy policy of its own, at <a href="https://bamsandbrags.com/legal/privacy">bamsandbrags.com/legal/privacy</a>. It governs that game.</p>
          <p><strong>Free Fall Frank</strong> (freefallfrank.com) and <strong>Crabby Knife Fight</strong> (crabbyknifefight.com) have no policy of their own; this one covers them. They hold:</p>
          <ul>
            <li><strong>Your account.</strong> When you sign in with Google we receive your email address, your name and your account id at Google. When you sign in with a link sent by email, we hold your email address. We never hold a password. Free Fall Frank can be played without an account; Crabby Knife Fight asks you to sign in.</li>
            <li><strong>Your play.</strong> The name you choose for the lists, your progress, your runs, your scores and times, and what you have earned in the game. The name you choose and your best scores and times are shown to other players.</li>
            <li><strong>What you make.</strong> The levels and places you build, with their names. A level or place you share can be played by anyone who has its link, and by everyone if it is listed publicly. Free Fall Frank keeps the IP address a level was made from.</li>
            <li><strong>What you buy</strong> (Free Fall Frank only). What you bought, the amount, the time, the email address used at checkout and Stripe&apos;s reference for the payment. We never receive your full card number.</li>
            <li><strong>Reports</strong> (Crabby Knife Fight only). If you report a place another player made: who reported it, what was reported and why.</li>
            <li><strong>Your device.</strong> A random id your browser makes and keeps, with the first and last time we saw it, how many visits, the site or link the visit came from, and your browser&apos;s description of itself.</li>
            <li><strong>Cookies and browser storage.</strong> One cookie that keeps you signed in for up to a year, and, in Free Fall Frank, one that remembers you have played before. Your settings and progress on that device are kept in the browser&apos;s own storage.</li>
            <li><strong>Your connection to Claude.</strong> If you add a game&apos;s connector to your own Claude, the game holds a record of that sign-in so Claude can act for your account in that game.</li>
          </ul>

          <h2>3. How We Use It</h2>
          <ul>
            <li>To run the games for you: sign-in, your progress, your scores, what you make and what you bought</li>
            <li>To send you a sign-in link when you ask for one</li>
            <li>To see how the games are played, from our own counts, and improve them</li>
            <li>To keep the website and the games secure and to detect and stop abuse and cheating</li>
            <li>To support you when you ask</li>
            <li>To meet legal obligations</li>
          </ul>
          <p>We do not use your information for anything else, and we never sell it.</p>

          <h2>4. Email</h2>
          <p>The games send email from support@glyphh.ai, through Resend. Free Fall Frank and Crabby Knife Fight send only the sign-in link you ask for.</p>

          <h2>5. Companies That Help Us</h2>
          <p>We use these companies to run the website and the games. Each processes information only as needed to provide its service to us:</p>
          <ul>
            <li><strong>Fly.io</strong> (United States): hosts this website, and the games&apos; servers and databases.</li>
            <li><strong>Cloudflare</strong>: sits in front of glyphh.ai. For Bams &amp; Brags, it also stores the photos posted in that game (Cloudflare R2).</li>
            <li><strong>Stripe</strong>: payments in the games. Receives your payment and card details at checkout (<a href="https://stripe.com/privacy">Stripe&apos;s Privacy Policy</a>).</li>
            <li><strong>Resend</strong>: sends the games&apos; email. Receives the email address we are writing to and the email itself.</li>
            <li><strong>Google</strong>: sign-in with Google in the games, if you choose it, and the fonts on our pages (Google Fonts).</li>
            <li><strong>Anthropic</strong>: for Bams &amp; Brags only, runs Claude for that game&apos;s Claude features. That game&apos;s own policy says what it receives.</li>
          </ul>
          <p>If you add a game&apos;s connector to your own Claude, what you type and what the connector returns pass through Claude under your agreement with Anthropic.</p>
          <p>We may also share information if the law requires it, or to protect someone&apos;s safety or our rights.</p>

          <h2>6. Where Your Information Is</h2>
          <p>This website and the games run in the United States. If you use them from outside the United States, your information is transferred to and processed there, and where the companies above operate.</p>

          <h2>7. How Long We Keep It</h2>
          <p>Account, play and purchase records are kept while your account exists and for a reasonable time after, and as the law requires (for example, payment records). A sign-in link works once and for a short time.</p>

          <h2>8. Access, Deletion and Your Rights</h2>
          <p>Depending on where you live, you may have the right to access, correct, delete, restrict or object to the processing of your personal data, and to receive it in a portable form.</p>
          <p>To ask what we hold about you, or to have your account in a game deleted, write to <a href="mailto:support@glyphh.ai">support@glyphh.ai</a> from the email address on the account, and say which game. We may need to check that the request comes from you. We keep what the law requires us to keep, such as payment records.</p>

          <h2>9. Children</h2>
          <p>This website and our games are not intended for children under 13, and we do not knowingly collect their personal information. If we learn that we have, we will delete it.</p>

          <h2>10. Security</h2>
          <p>No system is perfectly secure. If we learn of a breach affecting your information, we will tell you without undue delay and as the law requires. Report security issues to <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>

          <h2>11. Changes to This Policy</h2>
          <p>We may update this policy. We will post material changes on this page, with a new date, before they take effect.</p>

          <h2>12. Contact</h2>
          <p>Privacy and security questions and requests: <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>.</p>
        </div>
      </div>
    </>
  );
}
