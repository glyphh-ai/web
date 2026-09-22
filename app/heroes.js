// Hero message variants. The URL path selects which one renders — bare
// glyphh.ai shows `default`, glyphh.ai/code shows `code`, glyphh.ai/work shows
// `work` (see ../middleware.js for the rewrite and ./page.js for the read).
// The address bar keeps the path (so campaign links are shareable + trackable)
// while the page canonicalizes to glyphh.ai, so SEO never fragments.
//
// To test a new message: add an entry here, then point a campaign at
// glyphh.ai/<key>. That's the whole change — no component edits, no deploy of
// anything but this file.

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

// Shared announcement pill — sits above the headline, links to the live
// /models table. Announces the newest catalog addition.
// The pill announces the product, not a model: the model is no longer the point.
const KIMI_PILL = {
  label: 'New — direct-attach to open-weight models',
  cta: 'See all models',
  href: '/pricing#models',
};

export const heroes = {
  // Bare glyphh.ai — the configurable-workspace thesis (his copy,
  // 2026-08-28). The hero tab bar is gone, so this entry is what the home
  // page actually shows; the campaign paths below still swap it.
  // Bare glyphh.ai (his copy, 2026-09-19): the open desktop client for frontier AI.
  // Bare glyphh.ai (his copy, 2026-09-21): the AI Router for the enterprise.
  // The desktop message that used to sit here moved to `desktop` below and
  // fronts /products/desktop.
  default: {
    pill: KIMI_PILL,
    title: {
      lead: 'The AI Router for the ',
      accent: 'enterprise.',
    },
    sub:
      'Put your whole AI stack behind one key. See who is driving spend, cap it ' +
      'before it runs away, and send every request to the model that should handle it.',
    cta: { label: 'Get started free', href: PLATFORM_URL },
  },

  // /products/desktop — the open desktop client for frontier AI (his copy,
  // 2026-09-19; the home hero until 2026-09-21).
  desktop: {
    pill: KIMI_PILL,
    title: {
      lead: 'The open desktop client for ',
      accent: 'frontier AI.',
    },
    sub:
      'Glyphh is the vendor-neutral interface for Claude, ChatGPT, Gemini, and open-source models. ' +
      'Work with every top-tier AI provider through a single, consistent desktop app.',
    cta: { label: 'Download Glyphh', href: '/#download' },
  },

  // glyphh.ai/chat — the conversational front door: every model, one thread.
  chat: {
    pill: KIMI_PILL,
    title: { lead: 'The open desktop client for frontier AI. Built for ', accent: 'chat.' },
    sub:
      'Glyphh is the vendor-neutral interface for Claude, ChatGPT, Gemini, and open-source models. ' +
      'Work with every top-tier AI provider through a single, consistent desktop app.',
    cta: { label: 'Download Glyphh', href: '/#download' },
  },

  // glyphh.ai/work — the always-on agent pitch (Gemini Spark register), but
  // anchored to the one thing single-model agents can't say: every model.
  work: {
    pill: KIMI_PILL,
    title: { lead: 'The open desktop client for frontier AI. Built for ', accent: 'work.' },
    sub:
      'Glyphh is the vendor-neutral interface for Claude, ChatGPT, Gemini, and open-source models. ' +
      'Work with every top-tier AI provider through a single, consistent desktop app.',
    cta: { label: 'Download Glyphh', href: '/#download' },
  },

  // glyphh.ai/code — simple, Cursor-like, model-forward.
  code: {
    pill: KIMI_PILL,
    title: { lead: 'The open desktop client for frontier AI. Built for ', accent: 'code.' },
    sub:
      'Glyphh is the vendor-neutral interface for Claude, ChatGPT, Gemini, and open-source models. ' +
      'Work with every top-tier AI provider through a single, consistent desktop app.',
    cta: { label: 'Download Glyphh', href: '/#download' },
  },

  // glyphh.ai/dream — the builder's close (the retired DREAM band's copy).
  dream: {
    pill: KIMI_PILL,
    title: { lead: 'What will you ', accent: 'build?' },
    sub:
      'Start with an idea. Give it context. Let Glyphh reason, build, ' +
      'connect, and iterate — cloned apps, custom tools, live products, all ' +
      'inside your workspace.',
    cta: { label: 'Start building free', href: PLATFORM_URL },
  },
};

export function heroFor(variant) {
  return heroes[variant] || heroes.default;
}
