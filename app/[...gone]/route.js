// Every address the site no longer has (the old product, pricing, docs and blog pages, and their files) leads to the
// front page. A page or a file that exists is answered before this route is reached. 302 for now.
// Under /.well-known a missing file stays missing: whoever asks there reads a redirect as an answer.
export function GET(request, { params }) {
  return params.then(({ gone }) =>
    gone[0] === '.well-known'
      ? new Response('Not found', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
      : new Response(null, { status: 302, headers: { Location: '/' } }),
  );
}

export const POST = GET;
