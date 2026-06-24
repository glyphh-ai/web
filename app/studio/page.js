import AdStudio from '../components/AdStudio';

// Hidden, unlinked page — keep it out of search and crawlers.
export const metadata = {
  title: 'Ad Studio — Glyphh',
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <AdStudio />;
}
