/**
 * The people behind Glyphh, its two co-founders, for /about's People section. Only what is true and on record: no
 * employers, clients, credentials or achievements until they are given. Each bio is in its person's own voice; a
 * person whose facts have not arrived shows a name, a role and a link, and no bio. `photo` is a path in public/
 * (optional); without one the person's initials are shown. `draft: true` keeps an entry off the page.
 */
export const PEOPLE = [
  {
    slug: 'chris-timmerman',
    name: 'Christopher “Chris” Timmerman',
    role: 'Co-founder',
    location: 'Austin, Texas',
    photo: null,
    linkedin: 'https://www.linkedin.com/in/christophertimmerman',
    bio: [
      'I’ve spent 27 years in software engineering and problem solving. I built Ada, the decision engine Glyphh started with, and I’m building Glyphh now as an independent engineering studio: applications, experiments, research, the show, and work for people with a problem worth solving.',
    ],
  },
  {
    slug: 'darrell-whatley',
    name: 'Darrell Whatley',
    role: 'Co-founder',
    location: null,
    photo: null,
    linkedin: 'https://www.linkedin.com/in/darrell-whatley-51b324',
    bio: [],
  },
];

export const publishedPeople = () => PEOPLE.filter((p) => !p.draft);
