import { siteConfig } from '@/lib/config/site';

/** Organization + WebSite schema — rendered once, sitewide, in the root layout. Individual pages add their own (Article/BlogPosting/BreadcrumbList/etc.) on top of this. */
export function SiteJsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.ico`,
    sameAs: ['https://instagram.com/pennyandplanet', 'https://pinterest.com/pennyandplanet'],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const blog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: siteConfig.name,
    url: `${siteConfig.url}/articles`,
    publisher: { '@type': 'Organization', name: siteConfig.name },
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger -- static, server-generated structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      {/* eslint-disable-next-line react/no-danger -- static, server-generated structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      {/* eslint-disable-next-line react/no-danger -- static, server-generated structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blog) }} />
    </>
  );
}
