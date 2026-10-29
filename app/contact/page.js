import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ContactForm from './ContactForm';
import './contact.css';

// /contact: the company's address beside a form. The form posts to
// /api/contact, which emails the message to support@glyphh.ai through Resend
// (app/api/contact/route.js); the visitor's address is the reply-to.

// The company's mailing address, one line each.
const ADDRESS = ['Glyphh AI LLC', 'ADDRESS LINE 1', 'CITY, STATE ZIP', 'United States'];

export const metadata = {
  title: 'Contact — Glyphh',
  description: 'Write to Glyphh: sales, support, partnerships and press. Glyphh AI LLC, the company behind Ada.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="ix-page">
      <Nav />
      <main className="site-frame ix-frame">
        <section className="ix-head">
          <a href="/" className="ix-crumb">&larr; Home</a>
          <span className="qs-kicker">Contact</span>
          <h1 className="ix-title">Talk to us.</h1>
          <p className="ix-lede">
            Questions about Ada, a plan for your team, a partnership, or press. A person reads every message, usually within
            one business day.
          </p>
        </section>

        <section className="ix-section ct">
          <div className="ct-grid">
            <div className="hv-panel ct-form-panel">
              <ContactForm />
            </div>

            <aside className="ct-side">
              <div className="ct-block">
                <span className="qs-kicker">Address</span>
                <address className="ct-address">
                  {ADDRESS.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </div>
              <div className="ct-block">
                <span className="qs-kicker">Email</span>
                <ul className="ct-links">
                  <li><span>Support</span><a href="mailto:support@glyphh.ai">support@glyphh.ai</a></li>
                  <li><span>Security</span><a href="mailto:security@glyphh.ai">security@glyphh.ai</a></li>
                </ul>
              </div>
              <div className="ct-block">
                <span className="qs-kicker">Already a customer?</span>
                <p className="ct-note">
                  The <a href="https://docs.glyphh.ai">docs</a> answer most questions, and your plan and billing are on the{' '}
                  <a href="https://platform.glyphh.ai">platform</a>.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
