import type { Metadata } from 'next';
import { ArticlesIndexView } from './_view';

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Browse every Penny and Planet guide on money and sustainable living.',
  alternates: { canonical: '/articles' },
};

export default function ArticlesIndexPage() {
  return <ArticlesIndexView page={1} />;
}
