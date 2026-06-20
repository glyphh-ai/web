/**
 * Download proxy for private GitHub releases.
 *
 *   GET /api/download?platform=mac              → Apple Silicon DMG (default)
 *   GET /api/download?platform=mac&arch=arm64   → Apple Silicon DMG
 *   GET /api/download?platform=mac&arch=x64     → Intel DMG
 *   GET /api/download?platform=win              → Windows installer
 *
 * Uses GITHUB_TOKEN to authenticate with the GitHub API, fetches the
 * latest release asset URL, and 302-redirects the user to a temporary
 * S3 download link that requires no auth.
 */

const REPO = process.env.RELEASES_REPO || 'glyphh-ai/glyphh-releases';

function assetNameFor(platform, arch) {
  if (platform === 'win') return 'Glyphh-Setup.exe';
  // Mac is multi-arch — default to Apple Silicon.
  const a = arch === 'x64' ? 'x64' : 'arm64';
  return `Glyphh-${a}.dmg`;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform') || 'mac';
  const arch = searchParams.get('arch') || 'arm64';
  const assetName = assetNameFor(platform, arch);

  const token = process.env.GITHUB_TOKEN;

  try {
    // 1. Get latest release metadata
    const headers = { Accept: 'application/vnd.github+json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    const releaseRes = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers,
    });

    if (!releaseRes.ok) {
      return new Response('Could not fetch release info', { status: 502 });
    }

    const release = await releaseRes.json();
    const asset = release.assets?.find((a) => a.name === assetName);

    if (!asset) {
      return new Response(`Asset "${assetName}" not found in latest release`, { status: 404 });
    }

    // 2. Request the asset with octet-stream accept — GitHub responds with
    //    a 302 redirect to a temporary S3 URL that works without auth.
    const assetHeaders = { Accept: 'application/octet-stream' };
    if (token) assetHeaders.Authorization = `Bearer ${token}`;
    const assetRes = await fetch(asset.url, {
      headers: assetHeaders,
      redirect: 'manual',
    });

    const downloadUrl = assetRes.headers.get('location');
    if (!downloadUrl) {
      return new Response('Could not resolve download URL', { status: 502 });
    }

    // 3. Redirect user to the temporary URL
    return Response.redirect(downloadUrl, 302);
  } catch (err) {
    return new Response('Download failed', { status: 500 });
  }
}
