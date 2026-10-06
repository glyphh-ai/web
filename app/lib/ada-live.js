// Ada on the site is ONE switch, default off (his order, 2026-10-06: Ada is
// brought back in full and disabled until it is ready). Build with
// NEXT_PUBLIC_ADA=1 and everything Ada shows: the Products menu entry, the
// product page at /products/ada, the Ada docs group and its pages, the
// "Ada in Your Code" blog post, the research page's Ada tiles and thread, the
// font lab's Ada sample, the links that point at the Ada docs, and the
// glyphh-ada rows of the live catalog. Without it every one of those is
// unlisted, answers 404, or keeps today's copy. NEXT_PUBLIC_ so the one read
// works in client components too; Next inlines it at build time.
export const adaLive = () => process.env.NEXT_PUBLIC_ADA === '1';
