'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/config/site';

interface SocialShareProps {
  title: string;
}

function useShareLinks(title: string) {
  const pathname = usePathname();
  const url = `${siteConfig.url}${pathname}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    url,
    links: [
      { label: 'Share on X', href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
      { label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
      { label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
      { label: 'Share on Pinterest', href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}` },
      { label: 'Share by email', href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
    ],
  };
}

const ICONS: Record<string, React.ReactNode> = {
  'Share on X': <path d="M4 4l16 16M20 4 4 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  'Share on Facebook': (
    <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z" fill="currentColor" />
  ),
  'Share on LinkedIn': (
    <>
      <rect x="4" y="9" width="3" height="10" fill="currentColor" />
      <circle cx="5.5" cy="5.5" r="1.6" fill="currentColor" />
      <path d="M10 9h3v1.5c.6-1 1.7-1.7 3-1.7 2.3 0 3.5 1.5 3.5 4.3V19h-3v-5.4c0-1.3-.5-2.1-1.6-2.1-1 0-1.6.7-1.9 1.4-.1.3-.1.6-.1 1V19h-3V9Z" fill="currentColor" />
    </>
  ),
  'Share on Pinterest': (
    <path
      d="M12 4a8 8 0 0 0-2.9 15.5c0-.7 0-1.5.2-2.2l1.3-5.5s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.6 0 1-.6 2.4-.9 3.7-.3 1.1.5 2 1.6 2 2 0 3.3-2.5 3.3-5.4 0-2.2-1.5-3.9-4.3-3.9-3.1 0-5.1 2.3-5.1 4.9 0 .9.3 1.5.7 2 .2.2.2.3.1.5l-.2 1c-.1.3-.3.4-.6.2-1.2-.5-1.7-1.8-1.7-3.3 0-2.4 2-5.4 6.1-5.4 3.3 0 5.4 2.4 5.4 4.9 0 3.4-1.9 5.9-4.6 5.9-.9 0-1.8-.5-2.1-1.1l-.6 2.2c-.2.8-.6 1.6-1 2.2A8 8 0 1 0 12 4Z"
      fill="currentColor"
    />
  ),
  'Share by email': (
    <>
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

function CopyLinkButton({ url, className }: { url: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently, sharing links remain usable.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Link copied' : 'Copy link'}
      title={copied ? 'Copied!' : 'Copy link'}
      className={className}
    >
      {copied ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
          <path d="M5 12.5 10 17l9-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
          <path
            d="M10 14a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7L11 7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 10a4 4 0 0 0-5.7 0L6 12.3a4 4 0 0 0 5.7 5.7L13 17"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

const buttonClasses =
  'flex h-10 w-10 items-center justify-center rounded-full border border-sand-300 bg-white text-ink-soft transition-colors hover:border-forest-300 hover:text-forest-700';

export function SocialShare({ title }: SocialShareProps) {
  const { url, links } = useShareLinks(title);

  const iconButtons = (
    <>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className={buttonClasses}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            {ICONS[link.label]}
          </svg>
        </a>
      ))}
      <CopyLinkButton url={url} className={buttonClasses} />
    </>
  );

  return (
    <>
      {/* Floating rail — only on screens wide enough that it can never overlap the article column */}
      <div aria-label="Share this article" className="fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2.5 2xl:flex">
        {iconButtons}
      </div>

      {/* Inline row — every other screen size, placed right under the article header */}
      <div aria-label="Share this article" className="mx-auto flex max-w-content-narrow items-center gap-2.5 2xl:hidden">
        <span className="mr-1 text-sm font-medium text-ink-soft">Share:</span>
        {iconButtons}
      </div>
    </>
  );
}
