import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

// The social-share image (Open Graph / Twitter card), the studio's (2026-11-25): black, white, a hairline grid, the
// logo (the black cat and wordmark, glyphh-logo-black.png), the headline and the tagline. No gradients.
export const alt = 'Glyphh — Give us a problem. We’ll find a solution. The Art of Problem Solving.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logo = readFileSync(join(process.cwd(), 'public', 'glyphh-logo-black.png'));
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
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={363} height={120} alt="Glyphh" style={{ marginBottom: '54px' }} />
        <div style={{ display: 'flex', fontSize: '22px', color: '#a6a6a6', letterSpacing: '4px', marginBottom: '22px' }}>
          INDEPENDENT AI ENGINEERING STUDIO
        </div>
        <div style={{ display: 'flex', fontSize: '76px', fontWeight: 800, color: '#ffffff', letterSpacing: '-2px', lineHeight: 1.05 }}>
          Give us a problem.
        </div>
        <div style={{ display: 'flex', fontSize: '76px', fontWeight: 800, color: '#ffffff', letterSpacing: '-2px', lineHeight: 1.05 }}>
          We&rsquo;ll find a solution.
        </div>
        <div style={{ display: 'flex', fontSize: '30px', color: '#c8c8c8', marginTop: '40px' }}>
          The Art of Problem Solving.
        </div>
      </div>
    ),
    { ...size },
  );
}
