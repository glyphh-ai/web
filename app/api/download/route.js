/**
 * Download proxy for private GitHub releases.
 *
 * GET /api/download?platform=mac  → redirects to temporary Yo.dmg URL
 * GET /api/download?platform=win  → redirects to temporary Yo-Setup.exe URL
 *
 * Uses GITHUB_TOKEN to authenticate with the GitHub API, fetches the
 * latest release asset URL, and 302-redirects the user to a temporary
 * S3 download link that requires no auth.
 */

const REPO = 'glyphh-ai/yo-releases';
const ASSETS = { mac: 'Yo.dmg', win: 'Yo-Setup.exe' };

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform') || 'mac';
  const assetName = ASSETS[platform] || ASSETS.mac;

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return new Response('Download service not configured', { status: 503 });
  }

  try {
    // 1. Get latest release metadata
    const releaseRes = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
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
    const assetRes = await fetch(asset.url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/octet-stream',
      },
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
