import type { MetadataRoute } from 'next';
import { getAllArticleMeta } from '@/lib/content/articles';
import { getAllAuthors } from '@/lib/content/authors';
import { getAllResources } from '@/lib/content/resources';
import { getAllTags } from '@/lib/content/query';
import { categories } from '@/lib/data/categories';
import { collections } from '@/lib/data/collections';
import { articleHref, authorHref, categoryHref, tagHref } from '@/lib/format';
import { siteConfig } from '@/lib/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticleMeta();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: 'daily', priority: 1 },
    { url: `${siteConfig.url}/articles`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteConfig.url}/search`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${siteConfig.url}/collections`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${siteConfig.url}/resources`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${siteConfig.url}/shop`, changeFrequency: 'weekly', priority: 0.4 },
    { url: `${siteConfig.url}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteConfig.url}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteConfig.url}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteConfig.url}/cookie-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteConfig.url}/disclosure`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteConfig.url}/terms-of-use`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteConfig.url}/disclaimer`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const resourceRoutes: MetadataRoute.Sitemap = getAllResources().map((resource) => ({
    url: `${siteConfig.url}/resources/${resource.slug}`,
    changeFrequency: 'monthly',
    priority: 0.4,
  }));

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${siteConfig.url}/collections/${collection.slug}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteConfig.url}${articleHref(article.category, article.slug)}`,
    lastModified: article.updatedAt ?? article.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteConfig.url}${categoryHref(category.slug)}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const tagRoutes: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${siteConfig.url}${tagHref(tag.slug)}`,
    changeFrequency: 'weekly',
    priority: 0.4,
  }));

  const authorRoutes: MetadataRoute.Sitemap = getAllAuthors().map((author) => ({
    url: `${siteConfig.url}${authorHref(author.slug)}`,
    changeFrequency: 'monthly',
    priority: 0.3,
  }));

  return [...staticRoutes, ...resourceRoutes, ...collectionRoutes, ...articleRoutes, ...categoryRoutes, ...tagRoutes, ...authorRoutes];
}
