import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { mdxComponents } from '@/components/mdx/mdx-components';

interface ArticleBodyProps {
  rawContent: string;
}

/**
 * Server component: compiles raw MDX to React on the server (no client JS
 * shipped for content that doesn't need it). `rehype-slug` gives every
 * heading a stable id; `rehype-autolink-headings` appends a "#" anchor
 * after each H2/H3 — `HeadingCopyEnhancer` (rendered once at the page
 * level) progressively enhances those anchors into copy-to-clipboard
 * buttons on the client.
 */
export async function ArticleBody({ rawContent }: ArticleBodyProps) {
  const { content } = await compileMDX({
    source: rawContent,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'append',
              properties: { className: ['heading-anchor'], 'aria-label': 'Copy link to this section' },
              content: { type: 'text', value: '#' },
            },
          ],
        ],
      },
    },
  });

  return <div className="prose-editorial mx-auto max-w-content-narrow">{content}</div>;
}
