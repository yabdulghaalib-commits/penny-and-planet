import GithubSlugger from 'github-slugger';
import type { TocItem } from '@/lib/types';

const HEADING_PATTERN = /^(#{2,3})\s+(.*)$/gm;

/**
 * Extracts H2/H3 headings from raw Markdown/MDX source to build a table of
 * contents. Uses the same slugger `rehype-slug` uses internally, so the
 * `#slug` anchors generated here always match the ids rendered on the
 * actual headings — no separate id-generation logic to keep in sync.
 */
export function extractTableOfContents(rawContent: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  let match: RegExpExecArray | null;
  HEADING_PATTERN.lastIndex = 0;
  while ((match = HEADING_PATTERN.exec(rawContent)) !== null) {
    const level = match[1]?.length === 2 ? 2 : 3;
    const text = (match[2] ?? '').replace(/[*_`]/g, '').trim();
    if (!text) continue;

    items.push({
      depth: level,
      text,
      slug: slugger.slug(text),
    });
  }

  return items;
}
