interface PromoBannerProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Reserved for future promotions. Usage in MDX or a page: <PromoBanner title="..." description="..." ctaLabel="..." ctaHref="/shop" /> */
export function PromoBanner({ title, description, ctaLabel, ctaHref }: PromoBannerProps) {
  return (
    <div className="not-prose my-8 flex flex-col items-center gap-4 rounded-lg bg-gradient-to-br from-forest-700 to-forest-800 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
      <div>
        <p className="font-display text-lg text-white">{title}</p>
        <p className="mt-1 text-sm text-sand-100">{description}</p>
      </div>
      <a
        href={ctaHref}
        className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-forest-800 transition-colors hover:bg-sand-100"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
