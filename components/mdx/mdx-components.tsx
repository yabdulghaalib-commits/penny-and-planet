import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/mdx/Callout';
import { PullQuote } from '@/components/mdx/PullQuote';
import { Figure } from '@/components/mdx/Figure';
import { YouTubeEmbed } from '@/components/mdx/YouTubeEmbed';
import { PDFEmbed } from '@/components/mdx/PDFEmbed';
import { DownloadButton } from '@/components/mdx/DownloadButton';
import { MdxLink } from '@/components/mdx/MdxLink';
import { CodeBlock } from '@/components/mdx/CodeBlock';
import { KeyTakeaways } from '@/components/mdx/KeyTakeaways';
import { ActionSteps } from '@/components/mdx/ActionSteps';
import { ArticleFaq } from '@/components/mdx/ArticleFaq';
import { ComparisonTable } from '@/components/mdx/ComparisonTable';
import { Sources } from '@/components/mdx/Sources';
import { CalculatorPlaceholder } from '@/components/blog/tools/CalculatorPlaceholder';
import { RecommendedProduct } from '@/components/blog/monetization/RecommendedProduct';
import { SponsoredDisclosure } from '@/components/blog/monetization/SponsoredDisclosure';
import { AdSlot } from '@/components/blog/monetization/AdSlot';
import { PromoBanner } from '@/components/monetization/PromoBanner';

/**
 * Maps standard Markdown output (h2, p, ul, table, a, img, pre...) to
 * design-system-consistent elements, and registers the custom shortcodes
 * writers can use directly inside `.mdx` files. This is the one file to
 * touch when adding a new reusable content block.
 *
 * `Calculator`, `RecommendedProduct`, `SponsoredDisclosure`, `Ad`, and
 * `PromoBanner` are reserved for future tools/monetization — fully built
 * and registered, but not used by any current article, so today's reading
 * experience stays unchanged until a future stage opts an article into
 * them.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 {...props} />, // ids are injected by rehype-slug at compile time
  h3: (props) => <h3 {...props} />,
  a: MdxLink,
  pre: CodeBlock,
  img: ({ src, alt }) =>
    // eslint-disable-next-line @next/next/no-img-element -- plain markdown images stay caption-free; use <Figure> for captions
    typeof src === 'string' ? <img src={src} alt={alt ?? ''} className="my-8 w-full rounded-md" loading="lazy" /> : null,

  Callout,
  PullQuote,
  Figure,
  YouTubeEmbed,
  PDFEmbed,
  DownloadButton,
  KeyTakeaways,
  ActionSteps,
  Faq: ArticleFaq,
  ComparisonTable,
  Sources,

  // Reserved for future stages — see components/blog/tools/ and components/blog/monetization/
  Calculator: CalculatorPlaceholder,
  RecommendedProduct,
  SponsoredDisclosure,
  Ad: AdSlot,
  PromoBanner,
};
