// The games and apps on glyphh.ai's front page, one entry each. A new game adds its entry here and a folder of its own
// (public/<name>/index.html); `soon` shows the card without a link until the game is live; `external` is one with a
// site of its own, linked from its card and given no page here. proxy.js serves a game's page from its `href`, and
// app/sitemap.js lists it.
export const pageOf = (g) => Boolean(g.href) && !g.external;
export const GAMES = [
  {
    href: '/free-fall-frank/',
    title: 'Free Fall Frank',
    blurb: 'Frank fell down a manhole. Tap left and right to tumble him through the gaps, in time with the beat. Then ask Claude to build you a level of your own.',
    art: '/free-fall-frank/card.jpg',
    tags: ['free', 'phone and desktop', 'build levels with Claude'],
  },
  {
    href: '/bams-and-brags/',
    title: 'Bams & Brags',
    blurb: 'American mah jongg with beautiful tables, good company and bragging rights. Play with your friends, against the computer or in a tournament, and start a league with a site of its own.',
    art: '/bams-and-brags/card.jpg',
    tags: ['free to play', 'phone, tablet and computer', 'leagues', 'make your own looks with Claude'],
  },
  {
    href: '/crabby-knife-fight/',
    title: 'Crabby Knife Fight',
    blurb: 'They took his family in a crab pot. He found a knife. A punk platformer: seven places, and a knife fight with a traitor crab at the end of each.',
    art: '/crabby-knife-fight/card.jpg',
    tags: ['free', 'phone and desktop', 'make places with Claude'],
  },
  {
    // An app of ours with a site of its own: the card links there, and glyphh.ai has no page or hero video for it.
    href: 'https://sendacarol.com',
    external: true,
    title: 'Send a Carol',
    blurb: 'Custom greeting cards that sing. Say who it is for and add a few photos, and you get an original song with their name in it, set to a little video. For any occasion.',
    art: '/send-a-carol/card.jpg',
    tags: ['1 for $4.99', '5 for $14.99', '10 for $24.99'],
  },
  {
    title: 'More games',
    blurb: 'We are making the next one.',
    tags: [],
    soon: true,
  },
];
