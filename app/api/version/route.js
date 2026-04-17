export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/repos/glyphh-ai/yo-client/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return Response.json({ version: null });
    const data = await res.json();
    return Response.json({ version: data.tag_name || null });
  } catch {
    return Response.json({ version: null });
  }
}
