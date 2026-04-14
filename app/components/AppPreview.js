'use client';

import { useState, useEffect } from 'react';

const placeholders = [
  'Ask Yo to refine...',
  'Summarize this as a spec...',
  'Extract the auth section...',
  'Make this a README...',
];

export default function AppPreview() {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        i = (i + 1) % placeholders.length;
        setPlaceholder(placeholders[i]);
        setFade(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="app-preview">
      <div className="container">
        <div className="preview-window">
          <div className="preview-bar">
            <div className="preview-dots">
              <span></span><span></span><span></span>
            </div>
            <span className="preview-title">Yo.</span>
          </div>
          <div className="preview-content">
            <div className="preview-sidebar">
              <div className="preview-sidebar-item active">claude-api-design.md</div>
              <div className="preview-sidebar-item">react-patterns.md</div>
              <div className="preview-sidebar-item">db-migration-plan.md</div>
              <div className="preview-sidebar-item">auth-flow-spec.md</div>
            </div>
            <div className="preview-main">
              <div className="preview-msg preview-msg-captured">
                <span className="preview-msg-label">Captured from Claude</span>
                <div className="preview-msg-text">
                  <span className="preview-code-kw">## API Design Recommendations</span><br /><br />
                  For your REST API, I&apos;d recommend implementing<br />
                  resource-based routing with proper HTTP semantics...<br />
                  <span className="preview-fade"></span>
                </div>
              </div>
              <div className="preview-msg preview-msg-user">
                <span className="preview-msg-text-user">extract the authentication section and make it a standalone spec</span>
              </div>
              <div className="preview-msg preview-msg-yo">
                <span className="preview-msg-label preview-msg-label-yo">Yo</span>
                <div className="preview-msg-text">
                  <span className="preview-code-kw">## Authentication Specification</span><br /><br />
                  <span className="preview-code-fn">OAuth 2.0 + PKCE flow</span> for public clients...<br />
                  Token rotation with <span className="preview-code-str">refresh_token</span> grant...<br />
                  <span className="preview-fade"></span>
                </div>
              </div>
              <div className="preview-input-bar">
                <span className="preview-placeholder" style={{ opacity: fade ? 0 : 1 }}>{placeholder}</span>
                <span className="preview-send">&#8593;</span>
              </div>
            </div>
          </div>
          <div className="preview-gradient"></div>
        </div>
      </div>
    </section>
  );
}
