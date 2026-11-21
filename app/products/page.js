import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './products.css';

// The products: Ada, which Glyphh runs, and rrotor, which you run (his order, 2026-11-02: a Products menu with
// Ada, the home, and rrotor).

export const metadata = {
  title: 'Products — Glyphh',
  description:
    'Glyphh makes two things: Ada, decisions from your own precedents, run by Glyphh; and rrotor, the secure runtime you run yourself where the AI content your teams create lives and is governed.',
  alternates: { canonical: '/products' },
};

const PRODUCTS = [
  {
    href: '/',
    who: 'Glyphh runs it',
    title: 'Ada',
    body: 'A decision your software can act on, from the decisions you have already made: a typed outcome, a calibrated confidence and the precedents behind it, with no language model in the path.',
  },
  {
    href: '/products/rrotor',
    who: 'You run it',
    title: 'rrotor',
    body: 'A secure runtime where the AI content your teams create lives and is governed: pages, tools and jobs made with any agent, reviewed by a person, opened by role, on record, at your own host.',
  },
];

export default function ProductsPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/" className="ix-crumb">&larr; Home</a>
          <span className="qs-kicker">Products</span>
          <h1 className="ix-title">Two products. One runs at Glyphh, one runs at yours.</h1>
          <p className="ix-lede">
            Ada decides from precedent, and Glyphh runs it for you. rrotor governs the AI content your teams create,
            on your own machine or your own servers, and nothing of it passes through Glyphh.
          </p>
        </section>

        <section className="ix-section">
          <div className="ix-grid pr-grid">
            {PRODUCTS.map((p) => (
              <a key={p.href} href={p.href} className="ix-card ix-card-tall pr-card">
                <span className="qs-kicker">{p.who}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <span className="pr-more">Read it &rarr;</span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
