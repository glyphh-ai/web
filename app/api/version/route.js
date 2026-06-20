export const revalidate = 3600;

export async function GET() {
  try {
    const headers = { Accept: 'application/vnd.github+json' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const repo = process.env.RELEASES_REPO || 'glyphh-ai/glyphh-releases';
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return Response.json({ version: null });
    const data = await res.json();
    return Response.json({ version: data.tag_name || null });
  } catch {
    return Response.json({ version: null });
  }
}
