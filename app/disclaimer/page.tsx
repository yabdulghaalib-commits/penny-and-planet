import type { Metadata } from 'next';
import { LegalPageLayout, LegalSectionBlock } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Important context on how to use the educational content published on Penny and Planet.',
  alternates: { canonical: '/disclaimer' },
};

const sections = [
  { id: 'educational-purposes', title: 'Educational Purposes Only' },
  { id: 'not-professional-advice', title: 'Not Professional Advice' },
  { id: 'consult-a-professional', title: 'Consult a Qualified Professional' },
  { id: 'sustainable-living-disclaimer', title: 'Sustainable Living Recommendations' },
  { id: 'no-guarantees', title: 'No Guarantees' },
  { id: 'contact', title: 'Contact' },
];

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Disclaimer"
      lastUpdated="July 25, 2026"
      intro="Please read this page carefully — it explains the limits of what Penny and Planet's content can and should be used for."
      sections={sections}
    >
      <LegalSectionBlock id="educational-purposes" title="Educational Purposes Only">
        <p>
          All content published on Penny and Planet — including articles, guides, worksheets, and downloadable
          resources — is intended for general educational and informational purposes only. It is not tailored
          to your individual financial situation, goals, or risk tolerance.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="not-professional-advice" title="Not Professional Advice">
        <p>
          Nothing on this site constitutes professional financial, legal, tax, or investment advice. We are not
          licensed financial advisors, accountants, or attorneys, and no content here should be treated as a
          substitute for personalized advice from one.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="consult-a-professional" title="Consult a Qualified Professional">
        <p>
          Before making any significant financial, legal, or tax decision, please consult a qualified
          professional who can evaluate your specific circumstances. What works well in a general example may
          not be appropriate for your situation.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="sustainable-living-disclaimer" title="Sustainable Living Recommendations">
        <p>
          Our sustainable living, eco-friendly, and green home suggestions are general in nature and may not be
          practical, affordable, or suitable for every individual, household, climate, or living situation.
          Please adapt any recommendation to your own circumstances and local regulations.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="no-guarantees" title="No Guarantees">
        <p>
          We make reasonable efforts to keep our content accurate and current, but we make no guarantees about
          outcomes. Any results mentioned in an article — savings figures, payback periods, investment returns —
          are illustrative and will vary based on individual circumstances.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="contact" title="Contact">
        <p>
          If you have questions about this disclaimer, reach out at{' '}
          <a href="mailto:hello@pennyandplanet.com">hello@pennyandplanet.com</a> or through our{' '}
          <a href="/contact">Contact page</a>.
        </p>
      </LegalSectionBlock>
    </LegalPageLayout>
  );
}
