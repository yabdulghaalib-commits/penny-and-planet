import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { SearchExperience } from '@/components/search/SearchExperience';
import { categories } from '@/lib/data/categories';
import { getAllTags, getPopularArticles } from '@/lib/content/query';
import { articleHref } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search Penny and Planet articles by title, topic, category, tag, or author.',
  alternates: { canonical: '/search' },
};

export default function SearchPage() {
  const tags = getAllTags();
  const suggestedArticles = getPopularArticles(4).map((article) => ({
    title: article.title,
    href: articleHref(article.category, article.slug),
  }));

  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
      <Container className="pt-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
      </Container>

      <Suspense fallback={null}>
        <SearchExperience categories={categories} tags={tags} suggestedArticles={suggestedArticles} />
      </Suspense>
    </>
  );
}
