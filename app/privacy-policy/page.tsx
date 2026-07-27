import type { Metadata } from 'next';
import { LegalPageLayout, LegalSectionBlock } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Penny and Planet collects, uses, and protects your information.',
  alternates: { canonical: '/privacy-policy' },
};

const sections = [
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'newsletter-subscriptions', title: 'Newsletter Subscriptions' },
  { id: 'cookies', title: 'Cookies' },
  { id: 'analytics', title: 'Analytics' },
  { id: 'third-party-services', title: 'Third-Party Services' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'data-protection', title: 'Data Protection' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'contact-us', title: 'Contact Us' },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="July 25, 2026"
      intro="This Privacy Policy explains what information Penny and Planet collects, how we use it, and the choices you have. We've tried to write it in plain language rather than dense legal jargon."
      sections={sections}
    >
      <LegalSectionBlock id="information-we-collect" title="Information We Collect">
        <p>We collect information in a few limited ways:</p>
        <ul>
          <li>Information you provide directly, such as your name and email address when you subscribe to our newsletter or submit the contact form</li>
          <li>Technical information collected automatically, such as browser type, device type, and pages visited, used to understand how the site is used</li>
          <li>Information from cookies, described in more detail in our <a href="/cookie-policy">Cookie Policy</a></li>
        </ul>
        <p>We do not collect sensitive personal information (such as financial account numbers) through the website.</p>
      </LegalSectionBlock>

      <LegalSectionBlock id="newsletter-subscriptions" title="Newsletter Subscriptions">
        <p>
          When you subscribe to our newsletter, we collect your email address for the purpose of sending you
          updates, guides, and occasional offers relevant to personal finance and sustainable living. You can
          unsubscribe at any time using the link included in every email we send.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="cookies" title="Cookies">
        <p>
          We use cookies to keep the site functioning properly and to understand how visitors use it. See our{' '}
          <a href="/cookie-policy">Cookie Policy</a> for a full breakdown of the categories of cookies we use and
          how to manage your preferences.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="analytics" title="Analytics">
        <p>
          We use privacy-conscious analytics tools to understand aggregate traffic patterns — which articles are
          read, how visitors navigate the site, and general audience demographics. This data is analyzed in
          aggregate and is not used to identify you individually.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="third-party-services" title="Third-Party Services">
        <p>
          We work with a small number of third-party services to operate the site — for example, an email
          service provider for newsletter delivery and an analytics provider. These providers only receive the
          information necessary to perform their function and are contractually required to protect it.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="your-rights" title="Your Rights">
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>Request a copy of the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt out of marketing communications at any time</li>
        </ul>
        <p>To exercise any of these rights, contact us using the details below.</p>
      </LegalSectionBlock>

      <LegalSectionBlock id="data-protection" title="Data Protection">
        <p>
          We take reasonable technical and organizational measures to protect the information we hold, including
          restricting access to those who need it and using reputable, security-conscious service providers.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="data-retention" title="Data Retention">
        <p>
          We retain newsletter subscriber information for as long as you remain subscribed, and contact form
          submissions for as long as needed to resolve your inquiry. You can request deletion at any time.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="contact-us" title="Contact Us">
        <p>
          If you have questions about this Privacy Policy or how your information is handled, reach out at{' '}
          <a href="mailto:hello@pennyandplanet.com">hello@pennyandplanet.com</a> or through our{' '}
          <a href="/contact">Contact page</a>.
        </p>
      </LegalSectionBlock>
    </LegalPageLayout>
  );
}
