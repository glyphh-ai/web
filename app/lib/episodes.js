/**
 * The YouTube episodes, newest first. An episode with a `video` (its YouTube id) is published; one without is
 * planned and is shown as planned. Publishing one is filling in its `video` and `published` date. `project` names
 * the project page it belongs to.
 */
export const EPISODES = [
  { title: 'I Built an AI Startup. Here’s Why I’m Walking Away From It.', summary: 'Building Ada and Ada Cloud, what worked, what didn’t, and why Glyphh is becoming a studio.', video: null, published: null, project: 'glyphh-ai-decision-engine', featured: true },
  { title: 'I Combined Five AI Models Into One. Is It Actually Smarter?', summary: 'One question to several models, their answers compared: agreement, disagreement and what only one saw.', video: null, published: null, project: 'glyphh-collective' },
  { title: 'Can AI Make Intelligent Decisions Without an LLM?', summary: 'Deciding from precedent on a CPU, measured against a large language model.', video: null, published: null, project: 'glyphh-ai-decision-engine' },
  { title: '27 Years of Software Engineering. What AI Has Actually Changed.', summary: 'What is different now, and what isn’t.', video: null, published: null },
  { title: 'Give Me a Problem. I’ll Build the Solution.', summary: 'A viewer’s problem, taken apart and solved on camera.', video: null, published: null },
];

export const featuredEpisode = () => EPISODES.find((e) => e.video) || EPISODES.find((e) => e.featured) || EPISODES[0];
