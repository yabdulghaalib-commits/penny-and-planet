import { Container } from '@/components/ui/Container';

/** Next.js route-level loading UI. Kept intentionally minimal — most pages here are statically generated and rarely show this, but it prevents a blank flash on the ones that aren't. */
export default function Loading() {
  return (
    <div className="py-16" aria-busy="true" aria-live="polite">
      <Container>
        <div className="mx-auto max-w-2xl animate-pulse space-y-4 text-center">
          <div className="mx-auto h-3 w-24 rounded-full bg-sand-200" />
          <div className="mx-auto h-8 w-3/4 rounded-md bg-sand-200" />
          <div className="mx-auto h-4 w-1/2 rounded-md bg-sand-200" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-80 animate-pulse rounded-lg bg-sand-200" />
          ))}
        </div>
        <span className="sr-only">Loading…</span>
      </Container>
    </div>
  );
}
