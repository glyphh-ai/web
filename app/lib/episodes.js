/**
 * The show on YouTube (@glyphhai): a webcast and podcast where the two founders talk through one problem and then
 * build or test a solution. Episodes newest first. An episode with a `video` (its YouTube id) is published; one
 * without is planned and is shown as planned. Publishing one is filling in its `video` and `published` date.
 * `project` names the project page it belongs to.
 */
export const SHOW = {
  title: 'The show: two founders, one problem per episode',
  summary: 'Chris and Darrell take one problem, talk it through, then build or test a solution on camera. Some work. Some don’t. Either way, you see how.',
};

export const EPISODES = [
  { title: 'I Built an AI Startup. Here’s Why I’m Walking Away From It.', video: null, published: null, project: 'glyphh-ai-decision-engine' },
  { title: 'I Combined Five AI Models Into One. Is It Actually Smarter?', video: null, published: null, project: 'glyphh-collective' },
  { title: 'Can AI Make Intelligent Decisions Without an LLM?', video: null, published: null, project: 'glyphh-ai-decision-engine' },
  { title: '27 Years of Software Engineering. What AI Has Actually Changed.', video: null, published: null },
  { title: 'Give Us a Problem. We’ll Build the Solution.', video: null, published: null },
];

export const latestEpisode = () => EPISODES.find((e) => e.video) || null;
