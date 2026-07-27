import Image from 'next/image';

interface RecommendedProductProps {
  name: string;
  description: string;
  imageUrl: string;
  href: string;
  ctaLabel?: string;
}

/**
 * Reserved for future affiliate/product recommendations. Usage in MDX:
 * <RecommendedProduct name="..." description="..." imageUrl="..." href="..." />
 * Always shows an "Affiliate link" disclosure — never hide the relationship, per our Disclosure page.
 */
export function RecommendedProduct({ name, description, imageUrl, href, ctaLabel = 'View' }: RecommendedProductProps) {
  return (
    <div className="not-prose my-8 flex flex-col gap-4 rounded-lg border border-sand-300 bg-white p-5 sm:flex-row sm:items-center">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-sand-100">
        <Image src={imageUrl} alt="" fill className="object-cover" />
      </div>
      <div className="flex-1">
        <p className="font-display text-base text-ink">{name}</p>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
        <p className="mt-1.5 text-xs text-ink-muted">
          Affiliate link — see our <a href="/disclosure" className="underline decoration-sand-300 underline-offset-4">Disclosure</a>.
        </p>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="shrink-0 rounded-full bg-forest-700 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-forest-600"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
