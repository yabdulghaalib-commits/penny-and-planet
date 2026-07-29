import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SignatureGraphic } from '@/components/ui/SignatureGraphic';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-sand-100">
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-24">
        <div className="animate-fade-up max-w-xl">
          <p className="eyebrow">Money &amp; sustainability, together</p>

          <h1 className="mt-4 text-display-md text-ink sm:text-display-lg">
            Build real wealth while living more intentionally.
          </h1>

          <p className="mt-6 text-body-lg text-ink-muted">
            Penny and Planet helps you manage money wisely, save more, and invest with confidence, while
            spending less on things that don&apos;t matter and reducing your impact on the planet along the
            way.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/articles" size="lg">
              Explore the latest articles
            </Button>
            <Button href="#newsletter" variant="secondary" size="lg">
              Join the newsletter
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-sand-300 pt-8">
            <div>
              <dt className="eyebrow">Guides</dt>
              <dd className="mt-1 font-display text-2xl text-ink">200+</dd>
            </div>
            <div>
              <dt className="eyebrow">Readers</dt>
              <dd className="mt-1 font-display text-2xl text-ink">40k+</dd>
            </div>
            <div>
              <dt className="eyebrow">Focus</dt>
              <dd className="mt-1 font-display text-2xl text-ink">Money + Planet</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-sage-100 via-sand-100 to-transparent blur-2xl" />
          <SignatureGraphic />
        </div>
      </Container>
    </section>
  );
}
