import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

// Branded social-share image (Open Graph / Twitter card) — matches the
// research-company theme: warm dark ground, Neon Orchid gradient accent,
// faint punch-card dot lattice.
export const alt = 'Glyphh — Ada: a self-hosted classifier that learns from precedent, in your own runtime.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logo = readFileSync(join(process.cwd(), 'public', 'glyphh-logo-white.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#1a1a1c',
          padding: '90px',
          position: 'relative',
        }}
      >
        {/* purple / pink washes, bottom-left → top-right like the site */}
        <div
          style={{
            position: 'absolute',
            top: '-320px',
            right: '-220px',
            width: '760px',
            height: '760px',
            display: 'flex',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.38) 0%, rgba(147, 51, 234, 0.12) 45%, rgba(26, 26, 28, 0) 68%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-360px',
            right: '80px',
            width: '680px',
            height: '680px',
            display: 'flex',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.22) 0%, rgba(236, 72, 153, 0.07) 45%, rgba(26, 26, 28, 0) 68%)',
          }}
        />
        {/* punch-card dot lattice */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(179, 107, 251, 0.16) 1.5px, transparent 1.5px)',
            backgroundSize: '30px 30px',
            maskImage: 'linear-gradient(115deg, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 100%)',
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={312} height={103} alt="Glyphh" style={{ marginBottom: '54px' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: '68px', fontWeight: 800, color: '#ffffff', letterSpacing: '-2px', lineHeight: 1.08 }}>
            Decisions from precedent,
          </div>
          <div style={{ display: 'flex', fontSize: '68px', fontWeight: 800, color: '#ffffff', letterSpacing: '-2px', lineHeight: 1.08 }}>
            in your&nbsp;
            <span
              style={{
                backgroundImage: 'linear-gradient(to top right, #c084fc, #f0abfc)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              own runtime
            </span>
            .
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: '29px', color: '#b6b6b6', marginTop: '42px' }}>
          Ada · a self-hosted classifier that learns from labelled examples
        </div>
        <div style={{ display: 'flex', gap: '26px', marginTop: '34px', fontSize: '22px', color: '#b36bfb' }}>
          <span>[ record ]</span>
          <span>[ answer ]</span>
          <span>[ hand off ]</span>
          <span>[ learn ]</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
