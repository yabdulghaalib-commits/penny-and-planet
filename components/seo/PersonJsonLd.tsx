import { siteConfig } from '@/lib/config/site';
import type { Author } from '@/lib/types';

export function PersonJsonLd({ author }: { author: Author }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio,
    image: author.avatarUrl,
    url: `${siteConfig.url}/author/${author.slug}`,
    ...(author.socialLinks?.length ? { sameAs: author.socialLinks.map((link) => link.url) } : {}),
    ...(author.credentials ? { jobTitle: author.credentials } : {}),
  };

  return (
    // eslint-disable-next-line react/no-danger -- static, server-generated structured data
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
