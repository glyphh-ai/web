/**
 * The people behind Glyphh, for /about's People section. Only what is true and on record: no employers, clients,
 * credentials or achievements until they are given. An entry with `draft: true` is kept out of the page until its
 * facts arrive. `photo` is a path in public/ (optional); without one the person's initials are shown.
 */
export const PEOPLE = [
  {
    slug: 'chris-timmerman',
    name: 'Christopher “Chris” Timmerman',
    role: 'Founder',
    location: 'Austin, Texas',
    photo: null,
    linkedin: 'https://www.linkedin.com/in/christophertimmerman',
    bio: [
      'Chris has spent 27 years in software engineering and problem solving. He founded Glyphh, built its decision engine, Ada, and now runs Glyphh as an independent engineering studio: applications, experiments, research, a YouTube channel, and consulting for people with a problem worth solving.',
    ],
  },
  {
    slug: 'darrell-whatley',
    name: 'Darrell Whatley',
    role: null,
    location: null,
    photo: null,
    linkedin: 'https://www.linkedin.com/in/darrell-whatley-51b324',
    bio: [],
    draft: true,
  },
];

export const publishedPeople = () => PEOPLE.filter((p) => !p.draft);
