export interface FaqJsonLdItem {
  question: string;
  answer: string;
}

export function buildFaqJsonLd(items: FaqJsonLdItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function FaqJsonLd({ items }: { items: FaqJsonLdItem[] }) {
  if (items.length === 0) return null;
  return (
    // eslint-disable-next-line react/no-danger -- static, server-generated structured data
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(items)) }} />
  );
}
