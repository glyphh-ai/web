// Where the docs and the site live. In production the docs are their own host
// (docs.glyphh.ai, served by this app: middleware.js maps /x to /docs/x there),
// so every link is absolute. In development both are paths on this server.
const live = process.env.NODE_ENV === 'production';
export const DOCS = live ? 'https://docs.glyphh.ai' : '/docs';
export const SITE = live ? 'https://glyphh.ai' : '/';
