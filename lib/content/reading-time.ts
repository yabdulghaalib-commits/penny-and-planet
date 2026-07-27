import { WORDS_PER_MINUTE } from '@/lib/constants';

/**
 * Calculates estimated reading time from raw Markdown/MDX source. Strips
 * the most common syntax noise (code fences, JSX components, links,
 * headings markers) before counting words, so estimates stay close to
 * what a reader actually reads rather than counting markup as words.
 */
export function calculateReadingTime(rawContent: string): number {
  const plainText = rawContent
    .replace(/```[\s\S]*?```/g, ' ') // code blocks
    .replace(/<[^>]+>/g, ' ') // JSX/HTML tags and custom MDX components
    .replace(/!\[.*?\]\(.*?\)/g, ' ') // images
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links → keep link text
    .replace(/[#>*_~`-]/g, ' '); // markdown punctuation

  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
