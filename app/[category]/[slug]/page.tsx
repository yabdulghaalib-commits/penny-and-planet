import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs, buildArticleBreadcrumbs } from '@/components/blog/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { SocialShare } from '@/components/blog/SocialShare';
import { HeadingCopyEnhancer } from '@/components/blog/HeadingCopyEnhancer';
import { ArticleHeader } from '@/components/blog/ArticleHeader';
import { ArticleBody } from '@/components/blog/ArticleBody';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { MobileTableOfContents } from '@/components/blog/MobileTableOfContents';
import { ArticleDownloadResource } from '@/components/blog/ArticleDownloadResource';
import { ArticleDisclaimer } from '@/components/blog/ArticleDisclaimer';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { ArticleNavigation } from '@/components/blog/ArticleNavigation';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { PopularArticles } from '@/components/blog/PopularArticles';
import { ContinueLearning } from '@/components/blog/ContinueLearning';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { getAllArticleMeta } from '@/lib/content/articles';
import { getFullArticleBySlug, getRelatedArticles, getAdjacentArticles } from '@/lib/content/query';
import { getResourceBySlug } from '@/lib/content/resources';
import { articleHref } from '@/lib/format';
import { siteConfig } from '@/lib/config/site';

interface ArticlePageProps {
  params: { category: string; slug: string };
}

export function generateStaticParams() {
  return getAllArticleMeta().map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

function loadArticleOrNotFound(params: ArticlePageProps['params']) {
  const article = getFullArticleBySlug(params.slug);
  if (!article || article.category !== params.category) return null;
  return article;
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = loadArticleOrNotFound(params);
  if (!article) return {};

  const url = `${siteConfig.url}${articleHref(article.category, article.slug)}`;
  const ogImage = article.ogImageUrl ?? article.featuredImageUrl;

  return {
    title: article.metaTitle ?? article.title,
    description: article.metaDescription ?? article.excerpt,
    alternates: { canonical: article.canonicalUrl ?? url },
    openGraph: {
      type: 'article',
      url,
      title: article.metaTitle ?? article.title,
      description: article.metaDescription ?? article.excerpt,
      images: [{ url: ogImage }],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle ?? article.title,
      description: article.metaDescription ?? article.excerpt,
      images: [ogImage],
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = loadArticleOrNotFound(params);
  if (!article) notFound();

  const related = getRelatedArticles(article);
  const { previous, next } = getAdjacentArticles(article.slug);
  const resource = article.downloadableResourceSlug ? getResourceBySlug(article.downloadableResourceSlug) : undefined;
  const articleUrl = `${siteConfig.url}${articleHref(article.category, article.slug)}`;
  const breadcrumbItems = buildArticleBreadcrumbs(article.category, article.title);

  // BlogPosting (a more specific schema.org type than plain Article) is the
  // correct type for individual posts on a blog — see SiteJsonLd for the
  // sitewide Blog entity this rolls up into.
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: [article.ogImageUrl ?? article.featuredImageUrl],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { '@type': 'Person', name: article.author.name, url: `${siteConfig.url}/author/${article.author.slug}` },
    publisher: { '@type': 'Organization', name: siteConfig.name, logo: { '@type': 'ImageObject', url: `${siteConfig.url}/favicon.ico` } },
    mainEntityOfPage: articleUrl,
  };

  return (
    <article className="py-8 lg:py-12">
      {/* eslint-disable-next-line react/no-danger -- static, server-generated structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {article.faqItems && <FaqJsonLd items={article.faqItems} />}

      <ReadingProgress />
      <HeadingCopyEnhancer />

      <Container>
        <Breadcrumbs items={breadcrumbItems} className="mx-auto max-w-content-narrow" />

        <div className="mt-6">
          <ArticleHeader article={article} />
        </div>

        <div className="mt-6">
          <SocialShare title={article.title} />
        </div>

        <div className="mx-auto mt-8 max-w-content-narrow lg:hidden">
          <MobileTableOfContents items={article.toc} />
        </div>

        <div className="mx-auto mt-10 grid max-w-[1100px] gap-12 lg:grid-cols-[1fr_220px]">
          <ArticleBody rawContent={article.rawContent} />
          <div className="space-y-10">
            <TableOfContents items={article.toc} />
            <div className="hidden lg:block">
              <PopularArticles variant="compact" limit={4} title="Popular Articles" />
            </div>
          </div>
        </div>

        {resource && <ArticleDownloadResource resource={resource} />}
        <ArticleDisclaimer category={article.category} />
        <AuthorBio author={article.author} />
      </Container>

      <div className="mt-14">
        <NewsletterSection />
      </div>

      <Container className="mt-14">
        <RelatedArticles articles={related} />
        <ArticleNavigation previous={previous} next={next} />
        <ContinueLearning category={article.category} excludeSlug={article.slug} />
      </Container>
    </article>
  );
}
