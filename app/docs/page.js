import DocArticle from './DocArticle';
import { PAGES } from './content';

const intro = PAGES.find((p) => p.slug === 'introduction');
export const metadata = { title: { absolute: 'Glyphh Docs' }, description: intro.lede };

export default function DocsHome() {
  return <DocArticle slug="introduction" />;
}
