import type { Metadata } from 'next';
import { LegalPageLayout, LegalSectionBlock } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How Penny and Planet uses cookies and how you can manage your preferences.',
  alternates: { canonical: '/cookie-policy' },
};

const sections = [
  { id: 'what-are-cookies', title: 'What Are Cookies?' },
  { id: 'essential-cookies', title: 'Essential Cookies' },
  { id: 'performance-cookies', title: 'Performance & Analytics Cookies' },
  { id: 'preference-cookies', title: 'Preference Cookies' },
  { id: 'third-party-cookies', title: 'Third-Party Cookies' },
  { id: 'managing-preferences', title: 'Managing Your Preferences' },
  { id: 'disabling-cookies', title: 'How to Disable Cookies' },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Cookie Policy"
      lastUpdated="July 25, 2026"
      intro="This page explains what cookies are, which ones Penny and Planet uses, and how you can control them."
      sections={sections}
    >
      <LegalSectionBlock id="what-are-cookies" title="What Are Cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a website. They help the site
          remember information about your visit, which can make your next visit easier and the site more
          useful to you.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="essential-cookies" title="Essential Cookies">
        <p>
          These cookies are necessary for the site to function — for example, remembering your cookie
          preferences or keeping a form submission working as you move between steps. The site cannot function
          properly without them, and they cannot be disabled through our site settings.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="performance-cookies" title="Performance & Analytics Cookies">
        <p>
          These cookies help us understand how visitors use Penny and Planet — which articles are popular,
          how people navigate between pages, and where visitors run into friction. This helps us improve the
          site over time. Information collected here is aggregated and not used to identify you personally.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="preference-cookies" title="Preference Cookies">
        <p>
          These cookies remember choices you make on the site — such as a light/dark mode preference — so you
          don't have to reselect them on every visit.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="third-party-cookies" title="Third-Party Cookies">
        <p>
          Some cookies are set by third-party services we use, such as our email newsletter provider or embedded
          content (for example, an embedded YouTube video within an article). These third parties have their
          own cookie and privacy policies, which we encourage you to review.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="managing-preferences" title="Managing Your Preferences">
        <p>
          Most browsers let you view, manage, and delete cookies through their settings. Because blocking
          essential cookies may affect how the site functions, we recommend only disabling non-essential
          categories if you'd prefer not to be tracked for analytics purposes.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="disabling-cookies" title="How to Disable Cookies">
        <p>You can control or delete cookies through your browser settings. Common browsers provide instructions here:</p>
        <ul>
          <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
          <li>Safari: Preferences → Privacy → Manage Website Data</li>
          <li>Firefox: Settings → Privacy & Security → Cookies and Site Data</li>
          <li>Edge: Settings → Cookies and site permissions</li>
        </ul>
        <p>Disabling cookies entirely may affect the functionality of this and other websites.</p>
      </LegalSectionBlock>
    </LegalPageLayout>
  );
}
