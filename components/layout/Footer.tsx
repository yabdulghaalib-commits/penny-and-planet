import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SignatureGraphic } from '@/components/ui/SignatureGraphic';

const EXPLORE_LINKS = [
  { label: 'Personal Finance', href: '/category/personal-finance' },
  { label: 'Sustainable Living', href: '/category/sustainable-living' },
  { label: 'Frugal Living', href: '/category/frugal-living' },
  { label: 'Investing', href: '/category/investing' },
  { label: 'Saving Money', href: '/category/saving-money' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Resource Library', href: '/resources' },
  { label: 'Featured Collections', href: '/collections' },
  { label: 'Newsletter', href: '#newsletter' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Disclosure', href: '/disclosure' },
  { label: 'Terms of Use', href: '/terms-of-use' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#' },
  { label: 'Pinterest', href: '#' },
  { label: 'YouTube', href: '#' },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="eyebrow text-sage-300">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-sand-200 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest-800 text-sand-100">
      <Container className="grid grid-cols-2 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Penny and Planet home">
            <SignatureGraphic variant="mark" className="h-8 w-8 text-sage-300" />
            <span className="font-display text-xl text-white">Penny &amp; Planet</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand-200">
            Practical, research-driven guidance for building wealth and living more sustainably — one
            intentional decision at a time.
          </p>
          <ul className="mt-6 flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <Link
                  href={social.href}
                  className="text-sm text-sand-200 underline decoration-forest-600 underline-offset-4 transition-colors hover:text-white hover:decoration-sage-300"
                >
                  {social.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Explore" links={EXPLORE_LINKS} />
        <FooterColumn title="Company" links={COMPANY_LINKS} />
        <FooterColumn title="Legal" links={LEGAL_LINKS} />
      </Container>

      <div className="border-t border-forest-700/60">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-sand-300 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Penny and Planet. All rights reserved.</p>
          <p>Made for readers who want their money and their habits to work in the same direction.</p>
        </Container>
      </div>
    </footer>
  );
}
