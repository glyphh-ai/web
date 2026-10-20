import MinimalHome from './components/MinimalHome';
import { HOME_TITLE, HOME_DESCRIPTION } from './lib/home-meta';

// THE MINIMAL HOME (his order, 2026-10-13): the logo and one line.
export const metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
};

export default function Home() {
  return <MinimalHome />;
}
