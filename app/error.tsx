'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SignatureGraphic } from '@/components/ui/SignatureGraphic';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Next.js route-level error boundary. Catches rendering errors in any page and shows a recoverable, on-brand fallback instead of a blank screen. */
export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console -- intentional: surfaces the error until real error reporting (e.g. Sentry) is wired up
    console.error(error);
  }, [error]);

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto w-40" aria-hidden="true">
            <SignatureGraphic />
          </div>
          <p className="eyebrow mt-6">Something went wrong</p>
          <h1 className="mt-2 text-display-md text-ink">We hit a snag loading this page.</h1>
          <p className="mt-4 text-body-base text-ink-muted">
            Nothing you did caused this — please try again, or head back to the homepage.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={reset} size="lg">
              Try again
            </Button>
            <Button href="/" variant="secondary" size="lg">
              Back to Homepage
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
