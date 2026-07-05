import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

// Branded social-share image (Open Graph / Twitter card).
export const alt = 'Glyphh — AI research & development. Everything open source.';
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
          background: '#000000',
          padding: '90px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={372} height={123} alt="Glyphh" style={{ marginBottom: '52px' }} />
        <div style={{ display: 'flex', fontSize: '66px', fontWeight: 800, color: '#ffffff', letterSpacing: '-2px', lineHeight: 1.05 }}>
          Building the substrate
        </div>
        <div style={{ display: 'flex', fontSize: '66px', fontWeight: 800, color: '#ffffff', letterSpacing: '-2px', lineHeight: 1.05 }}>
          of machine intelligence.
        </div>
        <div style={{ display: 'flex', fontSize: '30px', color: '#b6b6b6', marginTop: '40px' }}>
          AI research &amp; development · Everything open source
        </div>
      </div>
    ),
    { ...size },
  );
}
