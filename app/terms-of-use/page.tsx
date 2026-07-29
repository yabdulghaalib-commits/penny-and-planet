import type { Metadata } from 'next';
import { LegalPageLayout, LegalSectionBlock } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms and conditions governing your use of Penny and Planet.',
  alternates: { canonical: '/terms-of-use' },
};

const sections = [
  { id: 'website-usage', title: 'Website Usage' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'acceptable-use', title: 'Acceptable Use' },
  { id: 'limitation-of-liability', title: 'Limitation of Liability' },
  { id: 'external-links', title: 'External Links' },
  { id: 'disclaimer', title: 'Disclaimer' },
  { id: 'changes-to-terms', title: 'Changes to These Terms' },
  { id: 'contact', title: 'Contact Information' },
];

export default function TermsOfUsePage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms of Use"
      lastUpdated="July 25, 2026"
      intro="These Terms of Use govern your access to and use of Penny and Planet. By using this site, you agree to these terms."
      sections={sections}
    >
      <LegalSectionBlock id="website-usage" title="Website Usage">
        <p>
          Penny and Planet provides educational content about personal finance and sustainable living. You may
          browse, read, and share our content for personal, non-commercial purposes, subject to the terms below.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="intellectual-property" title="Intellectual Property">
        <p>
          All content on this site, including articles, graphics, illustrations, and the overall design, is
          the property of Penny and Planet unless otherwise credited, and is protected by copyright. You may
          quote brief excerpts with proper attribution and a link back to the original article, but may not
          republish full articles without written permission.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="acceptable-use" title="Acceptable Use">
        <p>When using this site, you agree not to:</p>
        <ul>
          <li>Attempt to gain unauthorized access to any part of the site or its underlying systems</li>
          <li>Use automated tools to scrape or republish our content at scale</li>
          <li>Post or transmit anything unlawful, harmful, or infringing through the contact form or comments</li>
          <li>Interfere with the site's normal operation in any way</li>
        </ul>
      </LegalSectionBlock>

      <LegalSectionBlock id="limitation-of-liability" title="Limitation of Liability">
        <p>
          Penny and Planet is provided on an "as is" basis. We make reasonable efforts to keep content accurate
          and up to date, but we make no warranties about completeness or reliability, and we are not liable
          for any loss or damage arising from your use of the site or reliance on its content. See also our{' '}
          <a href="/disclaimer">Disclaimer</a>.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="external-links" title="External Links">
        <p>
          Our content sometimes links to external websites for reference or further reading. We don't control
          these sites and aren't responsible for their content, accuracy, or privacy practices. Links do not
          imply endorsement unless explicitly stated.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="disclaimer" title="Disclaimer">
        <p>
          Content on this site is for educational and informational purposes only and does not constitute
          professional financial, legal, or tax advice. Full details are in our dedicated{' '}
          <a href="/disclaimer">Disclaimer page</a>.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="changes-to-terms" title="Changes to These Terms">
        <p>
          We may update these Terms of Use from time to time to reflect changes to the site or applicable law.
          The "Last updated" date at the top of this page will always reflect the most recent revision.
          Continued use of the site after changes take effect constitutes acceptance of the updated terms.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="contact" title="Contact Information">
        <p>
          Questions about these terms can be sent to{' '}
          <a href="mailto:hello@pennyandplanet.com">hello@pennyandplanet.com</a> or through our{' '}
          <a href="/contact">Contact page</a>.
        </p>
      </LegalSectionBlock>
    </LegalPageLayout>
  );
}
