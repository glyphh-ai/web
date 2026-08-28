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
const KIMI_PILL = {
  label: 'New — Kimi K3 is live',
  cta: 'See all models',
  href: '/pricing#models',
};

export const heroes = {
  // Bare glyphh.ai — the configurable-workspace thesis (his copy,
  // 2026-08-28). The hero tab bar is gone, so this entry is what the home
  // page actually shows; the campaign paths below still swap it.
  default: {
    pill: KIMI_PILL,
    title: {
      lead: 'Glyphh is a workspace you configure ',
      accent: 'for your way of working',
    },
    sub:
      'Set up your space, connect and arrange your apps, choose which ' +
      'agents do what and when. Bounce from job to job on your desktop, web, ' +
      'or mobile with a 24/7 assistant by your side.',
    cta: { label: 'Get started free', href: PLATFORM_URL },
  },

  // glyphh.ai/chat — the conversational front door: every model, one thread.
  chat: {
    pill: KIMI_PILL,
    title: { lead: 'One chat. ', accent: 'Every AI.' },
    sub:
      'Ask anything — the right model answers, with your browser, files, and ' +
      'apps working beside the conversation. Persistent memory carries your ' +
      'context, so you never start cold.',
    cta: { label: 'Start chatting free', href: PLATFORM_URL },
  },

  // glyphh.ai/work — the always-on agent pitch (Gemini Spark register), but
  // anchored to the one thing single-model agents can't say: every model.
  work: {
    pill: KIMI_PILL,
    title: { lead: 'Your 24/7 ', accent: 'AI coworker.' },
    sub:
      'Hand Glyphh your work and it keeps going in the background — 24/7, even ' +
      'when your laptop and phone are off. It runs autonomously but always ' +
      'under your direction, draws on every model at once, and checks with you ' +
      'before it makes a big move.',
    cta: { label: 'Get started free', href: PLATFORM_URL },
  },

  // glyphh.ai/code — simple, Cursor-like, model-forward.
  code: {
    pill: KIMI_PILL,
    title: { lead: 'Code with ', accent: 'every model.' },
    sub:
      'The AI editor that runs Claude, GPT, Gemini, and Kimi K3 side by side. ' +
      'Switch models mid-thought, loop agents on the hard problems, and only ' +
      'pay for what you run.',
    cta: { label: 'Start coding free', href: PLATFORM_URL },
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
