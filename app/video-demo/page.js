import VideoDemo from './VideoDemo';

// Unlisted recording stage for the Glyphh Desktop promo video — see
// scripts/record-demo.mjs. Not linked from anywhere; kept out of indexes.
export const metadata = {
  title: 'Glyphh — demo stage',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VideoDemo />;
}
