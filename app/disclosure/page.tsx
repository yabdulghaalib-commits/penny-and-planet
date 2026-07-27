import type { Metadata } from 'next';
import { LegalPageLayout, LegalSectionBlock } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Disclosure',
  description: 'How Penny and Planet handles affiliate relationships, sponsored content, and product recommendations.',
  alternates: { canonical: '/disclosure' },
};

const sections = [
  { id: 'affiliate-relationships', title: 'Affiliate Relationships' },
  { id: 'sponsored-articles', title: 'Sponsored Articles' },
  { id: 'advertising', title: 'Advertising Transparency' },
  { id: 'product-reviews', title: 'Product Reviews' },
  { id: 'editorial-independence', title: 'Editorial Independence' },
  { id: 'recommendation-standards', title: 'Our Recommendation Standards' },
  { id: 'honest-opinions', title: 'Our Commitment to Honest Opinions' },
];

export default function DisclosurePage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Disclosure"
      lastUpdated="July 25, 2026"
      intro="Trust is the foundation of everything we publish. This page explains, plainly, how Penny and Planet may make money from this site — now or in the future — and the standards we hold ourselves to regardless."
      sections={sections}
    >
      <LegalSectionBlock id="affiliate-relationships" title="Affiliate Relationships">
        <p>
          Penny and Planet may participate in affiliate programs, meaning we could earn a small commission when
          you click a link or make a purchase through one, at no additional cost to you. If and when an article
          includes an affiliate link, we'll say so clearly near the recommendation itself, not buried in a
          footer.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="sponsored-articles" title="Sponsored Articles">
        <p>
          Any article that is sponsored, or created in partnership with a brand, will be clearly labeled as such
          at the top of the piece. We will never disguise paid content as independent editorial content.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="advertising" title="Advertising Transparency">
        <p>
          If Penny and Planet displays advertising in the future, ads will be visually distinguished from
          editorial content and will not influence which topics we choose to cover or what we say about them.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="product-reviews" title="Product Reviews">
        <p>
          When we review or recommend a specific product or service, that recommendation reflects our genuine
          assessment based on research, use, or expert input — not the size of a potential commission.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="editorial-independence" title="Editorial Independence">
        <p>
          Advertisers, affiliate partners, and sponsors have no influence over our editorial opinions, ratings,
          or the topics we choose to write about. Compensation from a partner is never a factor in whether we
          recommend something.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="recommendation-standards" title="Our Recommendation Standards">
        <p>Before recommending anything — a product, service, app, or strategy — we aim to:</p>
        <ul>
          <li>Verify claims against credible, independent sources wherever possible</li>
          <li>Disclose any financial relationship clearly and prominently</li>
          <li>Update or remove recommendations that no longer hold up</li>
        </ul>
      </LegalSectionBlock>

      <LegalSectionBlock id="honest-opinions" title="Our Commitment to Honest Opinions">
        <p>
          If something isn't worth your money or your time, we'll say so — even if it means walking away from a
          partnership opportunity. That standard doesn't change based on how the site is monetized.
        </p>
      </LegalSectionBlock>
    </LegalPageLayout>
  );
}
