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

// Always hit the live release — Next's default fetch cache otherwise pins a
// stale "latest" (which 404s when its assets are the old Yo-* names).
export const dynamic = 'force-dynamic';

const REPO = process.env.RELEASES_REPO || 'glyphh-ai/releases';
const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.glyphh.ai';

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

  // THE SERVER HOLDS THE TOKEN (his report, 2026-09-19: the homepage download
  // answered 502). The releases repo is private and this site has no GitHub
  // credential, so ask our own server for the newest release and the signed
  // asset URL; it reads GitHub with the token it already has. The direct
  // GitHub path below stays for a deployment that does set GITHUB_TOKEN.
  if (!token) {
    try {
      const listRes = await fetch(`${API_BASE}/api/releases`, { cache: 'no-store' });
      if (!listRes.ok) return new Response('Could not fetch release info', { status: 502 });
      const releases = (await listRes.json())?.data ?? [];
      const latest = releases.find((r) => !r.prerelease && r.assets?.some((a) => a.name === assetName))
        ?? releases.find((r) => r.assets?.some((a) => a.name === assetName));
      if (!latest) return new Response(`Asset "${assetName}" not found in latest release`, { status: 404 });
      const assetRes = await fetch(
        `${API_BASE}/api/releases/asset?tag=${encodeURIComponent(latest.tag)}&name=${encodeURIComponent(assetName)}`,
        { cache: 'no-store' },
      );
      if (!assetRes.ok) return new Response('Could not resolve download URL', { status: 502 });
      const url = (await assetRes.json())?.data?.url;
      if (!url) return new Response('Could not resolve download URL', { status: 502 });
      return Response.redirect(url, 302);
    } catch {
      return new Response('Download failed', { status: 500 });
    }
  }

  try {
    // 1. Get latest release metadata
    const headers = { Accept: 'application/vnd.github+json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    const releaseRes = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers,
      cache: 'no-store',
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
      cache: 'no-store',
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
