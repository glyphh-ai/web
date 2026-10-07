// The desktop downloads — ONE source of truth for every place the site offers
// the installer (the Download section, the Quick Start, the FAQ). Each row is
// a build of the latest GitHub release; /api/download resolves the asset name
// against the newest release and 302s to a short-lived signed URL (the
// releases repo is private, the server holds the token). /api/version names
// the release tag. Add a build here and every surface carries it.

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.glyphh.ai';
export const RELEASES_URL = 'https://github.com/glyphh-ai/releases/releases';

export const DOWNLOADS = [
  { id: 'mac-arm', os: 'macOS', arch: 'Apple Silicon', asset: 'Glyphh-arm64.dmg', href: '/api/download?platform=mac&arch=arm64', requires: 'macOS 12+' },
  { id: 'mac-x64', os: 'macOS', arch: 'Intel', asset: 'Glyphh-x64.dmg', href: '/api/download?platform=mac&arch=x64', requires: 'macOS 12+' },
  { id: 'win', os: 'Windows', arch: 'x64', asset: 'Glyphh-Setup.exe', href: '/api/download?platform=win', requires: 'Windows 10+' },
  { id: 'linux', os: 'Linux', arch: 'x64 AppImage', asset: 'Glyphh-x86_64.AppImage', href: '/api/download?platform=linux', requires: 'x64, glibc' },
];

export const byId = (id) => DOWNLOADS.find((d) => d.id === id) || DOWNLOADS[0];

// The visitor's platform from the User-Agent. Mac defaults to Apple Silicon:
// Safari and Firefox never expose the architecture, and most Macs are arm64;
// the Intel row is one click away.
export function detectDownload() {
  if (typeof navigator === 'undefined') return 'mac-arm';
  const ua = navigator.userAgent || '';
  if (/windows/i.test(ua)) return 'win';
  if (/linux|x11|bsd/i.test(ua) && !/android/i.test(ua)) return 'linux';
  return 'mac-arm';
}
