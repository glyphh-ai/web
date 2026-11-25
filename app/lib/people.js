/**
 * The people behind Glyphh, its two co-founders: the People section on /about and each person's bio page at
 * /about/<slug>. High-level bios drawn from each person's LinkedIn profile, not job histories: no employers, clients
 * or titles by company are named. Each bio is in its person's own voice. `summary` is the short line on /about;
 * `bio` is the bio page. `position` is a day role given without an employer's name. `photo` is a path in public/
 * (optional); without one the person's initials are shown. `draft: true` keeps an entry off the site.
 */
export const PEOPLE = [
  {
    slug: 'chris-timmerman',
    name: 'Christopher “Chris” Timmerman',
    short: 'Chris Timmerman',
    role: 'Co-founder',
    location: 'Austin, Texas',
    position: 'Runs AI governance and innovation for an enterprise software company.',
    photo: '/people/chris-timmerman.jpg',
    linkedin: 'https://www.linkedin.com/in/christophertimmerman',
    summary:
      'I’ve spent 27 years in enterprise software, from identity and security architecture to running global services and support teams, and now AI governance. I built Ada, the decision engine Glyphh started with.',
    bio: [
      'I’ve spent 27 years in enterprise software. I started as an enterprise architect in identity and access management, helped take a small consultancy through its acquisition, and spent years as the person customers called when a large, complicated deployment had to work.',
      'From there I moved into leading people: building services and security practices in the United States and in Sydney, Australia, serving as a field CTO and a chief technology officer, and running customer support, community, global services delivery and solution engineering organizations.',
      'Today I run AI governance and innovation for an enterprise software company: helping a business adopt AI with clear guardrails, trusted outcomes and a cost that makes sense. I write often about where AI really pays off. My view is simple: AI is at its best as a tool to build with, it needs good, well-understood data to be worth anything, and it should never be left to run unsupervised.',
      'Glyphh is where I build. I built Ada, the decision engine Glyphh started with, and I’m building Glyphh now as an independent engineering studio: applications, experiments, research, the show, and work for people with a problem worth solving.',
    ],
  },
  {
    slug: 'darrell-whatley',
    name: 'Darrell Whatley',
    short: 'Darrell Whatley',
    role: 'Co-founder',
    location: 'Leander, Texas',
    position: 'Runs technical support for a large enterprise software company.',
    photo: '/people/darrell-whatley.jpg',
    linkedin: 'https://www.linkedin.com/in/darrell-whatley-51b324',
    summary:
      'I’ve spent more than 30 years in enterprise IT, most of it supporting the automation and data systems large organizations run on, and leading the teams that keep them running.',
    bio: [
      'I’ve spent more than 30 years in enterprise IT. I started in network and server support, then spent nearly two decades as a senior support analyst on enterprise workload automation, the scheduling software that runs the overnight and around-the-clock work of large companies.',
      'Today I lead a technical support team for that software across mainframe and distributed systems. My work lives in databases, Unix systems, performance tuning, change management and IT automation, and in keeping critical systems available for some of the largest organizations in the country.',
      'What I care about most is people: mentoring strong teams, improving how we work a little every day, and solving the hard problem in front of the customer. In recent years I’ve been learning to put generative AI to work in support and data analytics.',
      'At Glyphh I bring how enterprises support customers at scale, and a long view of what it takes for software to keep working once real people depend on it.',
    ],
  },
];

export const publishedPeople = () => PEOPLE.filter((p) => !p.draft);
export const personBySlug = (slug) => publishedPeople().find((p) => p.slug === slug);

// The first and last names' first letters, for a person without a photo.
export const initials = (name) => {
  const words = name.split(' ').filter((w) => /^[A-Za-z]/.test(w));
  return `${words[0][0]}${words[words.length - 1][0]}`;
};
