'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SignatureGraphic } from '@/components/ui/SignatureGraphic';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Personal Finance', href: '/category/personal-finance' },
  { label: 'Sustainable Living', href: '/category/sustainable-living' },
  { label: 'Frugal Living', href: '/category/frugal-living' },
  { label: 'Investing', href: '/category/investing' },
  { label: 'Saving Money', href: '/category/saving-money' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand-300 bg-sand-100/90 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Penny and Planet home">
          <SignatureGraphic variant="mark" className="h-8 w-8" />
          <span className="font-display text-xl leading-none text-ink">
            Penny <span className="text-forest-600">&amp;</span> Planet
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-sand-200 hover:text-forest-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          {/* Search — now live, links to /search */}
          <Link
            href="/search"
            aria-label="Search the site"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-sand-200 hover:text-forest-700 sm:flex"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="m17 17-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </Link>

          {/* Reserved: light/dark mode toggle — becomes functional in a later stage */}
          <button
            type="button"
            aria-label="Toggle light and dark mode"
            aria-disabled="true"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-sand-200 hover:text-forest-700 sm:flex"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
              <path
                d="M10 3a7 7 0 1 0 7 7 5.5 5.5 0 0 1-7-7Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Reserved: newsletter shortcut — scrolls to functional newsletter section on the homepage */}
          <Link
            href="#newsletter"
            className="hidden rounded-full bg-forest-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-600 md:inline-flex"
          >
            Subscribe
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-sand-200 hover:text-forest-700 lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
              {isMenuOpen ? (
                <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={cn(
          'overflow-hidden border-t border-sand-300 bg-sand-100 transition-[max-height] duration-300 ease-editorial lg:hidden',
          isMenuOpen ? 'max-h-[28rem]' : 'max-h-0 border-t-0',
        )}
      >
        <Container as="ul" className="flex flex-col gap-1 py-3">
          <li>
            <Link
              href="/search"
              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-body-base font-medium text-ink-soft hover:bg-sand-200 hover:text-forest-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
                <path d="m17 17-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Search
            </Link>
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-md px-3 py-2.5 text-body-base font-medium text-ink-soft hover:bg-sand-200 hover:text-forest-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </Container>
      </nav>
    </header>
  );
}
