import Image from 'next/image';
import type { DigitalProduct } from '@/lib/types';

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
}

/** Reserved for future digital products. The button is intentionally disabled — see lib/content/products.ts for the checkout integration note. */
export function ProductCard({ product }: { product: DigitalProduct }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-sand-300 bg-white">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
        <Image src={product.previewImage} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="font-display text-base text-ink">{product.title}</p>
        <p className="flex-1 text-sm text-ink-muted">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-display text-lg text-ink">{formatPrice(product.price, product.currency)}</span>
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="cursor-not-allowed rounded-full bg-sand-300 px-4 py-2 text-sm font-medium text-ink-muted"
          >
            Coming soon
          </button>
        </div>
      </div>
    </div>
  );
}
