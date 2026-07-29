import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { FeaturedArticles } from '@/components/sections/FeaturedArticles';
import { LatestArticles } from '@/components/sections/LatestArticles';
import { CategoryGrid } from '@/components/sections/CategoryGrid';
import { NewsletterSection } from '@/components/sections/NewsletterSection';

export const metadata: Metadata = {
  title: 'Penny and Planet — Money & Sustainable Living',
  description:
    'Practical, research-driven guidance for building wealth while living more sustainably: budgeting, saving, investing, and eco-friendly living, made approachable.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedArticles />
      <LatestArticles />
      <CategoryGrid />
      <NewsletterSection />
    </>
  );
}
