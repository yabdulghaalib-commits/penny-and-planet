'use client';

import { useEffect } from 'react';

/**
 * Renders nothing — attaches one delegated click listener for the article
 * content area so every `.heading-anchor` link (added server-side by
 * rehype-autolink-headings) copies its full URL to the clipboard instead
 * of just navigating, with a brief "Copied" tooltip swap.
 */
export function HeadingCopyEnhancer() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const anchor = target.closest<HTMLAnchorElement>('a.heading-anchor');
      if (!anchor) return;

      event.preventDefault();
      const href = anchor.getAttribute('href') ?? '';
      const url = `${window.location.origin}${window.location.pathname}${href}`;

      history.replaceState(null, '', href);
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });

      navigator.clipboard?.writeText(url).then(() => {
        const original = anchor.getAttribute('aria-label');
        anchor.setAttribute('aria-label', 'Copied!');
        anchor.dataset.copied = 'true';
        window.setTimeout(() => {
          anchor.setAttribute('aria-label', original ?? 'Copy link to this section');
          delete anchor.dataset.copied;
        }, 1500);
      });
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
