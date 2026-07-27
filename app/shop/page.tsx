import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ProductCard } from '@/components/monetization/ProductCard';
import { getAllProducts } from '@/lib/content/products';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Digital planners, spreadsheets, and workbooks for money and sustainable living — coming soon.',
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Coming soon</p>
          <h1 className="mt-2 text-display-md text-ink sm:text-display-lg">Digital Products</h1>
          <p className="mt-4 text-body-base text-ink-muted">
            We&apos;re building a small shop of premium planners, spreadsheets, and workbooks that go deeper than
            our free resource library. Here&apos;s a preview of what&apos;s in the works.
          </p>
        </div>

        {products.length > 0 && (
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
