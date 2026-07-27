'use client';

import { useEffect, useState } from 'react';

/** Returns the id of the heading currently closest to the top of the viewport, for TOC active-state highlighting. */
export function useActiveHeading(headingIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headingIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0]?.target.id ?? null);
        }
      },
      { rootMargin: '-88px 0px -70% 0px', threshold: 0 },
    );

    const elements = headingIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headingIds]);

  return activeId;
}
