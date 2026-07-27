import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SignatureGraphic } from '@/components/ui/SignatureGraphic';
import { ValueCard } from '@/components/ui/ValueCard';
import { NewsletterSection } from '@/components/sections/NewsletterSection';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Penny and Planet helps individuals and families make smarter financial decisions while embracing sustainable living that is practical, affordable, and achievable.',
  alternates: { canonical: '/about' },
};

const CORE_VALUES = [
  {
    title: 'Practicality first',
    description: 'Every guide has to work in a real budget and a real week — not just in theory.',
  },
  {
    title: 'Money and planet, together',
    description: 'We reject the idea that financial responsibility and environmental responsibility compete.',
  },
  {
    title: 'Research over hot takes',
    description: 'We check claims against credible sources before publishing, not just what sounds compelling.',
  },
  {
    title: 'Progress over perfection',
    description: 'Small, sustainable changes beat all-or-nothing overhauls that don\u2019t survive a busy month.',
  },
];

const TOPICS = [
  'Personal Finance',
  'Budgeting',
  'Saving Money',
  'Investing',
  'Financial Independence',
  'Frugal Living',
  'Sustainable Living',
  'Eco-Friendly Habits',
  'Green Home Ideas',
  'Ethical Shopping',
  'Minimalism',
  'Sustainable Food & Lifestyle',
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-sand-100">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-24">
          <div className="max-w-xl">
            <p className="eyebrow">About Penny and Planet</p>
            <h1 className="mt-4 text-display-md text-ink sm:text-display-lg">
              Financial success and a lighter footprint aren&apos;t a trade-off.
            </h1>
            <p className="mt-6 text-body-lg text-ink-muted">
              We started Penny and Planet because so much money advice ignores sustainability, and so much
              sustainability advice ignores cost. We wanted one place that treats both as part of the same
              goal: living well, on purpose.
            </p>
            <div className="mt-9">
              <Button href="/articles" size="lg">
                Explore the latest articles
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-sage-100 via-sand-100 to-transparent blur-2xl" />
            <SignatureGraphic />
          </div>
        </Container>
      </section>

      <section aria-labelledby="story-heading" className="bg-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow">Our story</p>
              <h2 id="story-heading" className="mt-2 text-display-sm text-ink sm:text-display-md">
                The Penny and Planet Story
              </h2>
              <div className="prose-editorial mt-5 max-w-none text-ink-muted">
                <p>
                  Penny and Planet started with a simple frustration: financial advice that assumed you&apos;d
                  give up your values to save money, and sustainability advice that assumed you had money to
                  spare in the first place. Neither felt honest.
                </p>
                <p>
                  So we set out to build something different — practical guides that treat your budget and your
                  environmental impact as connected, not competing, priorities. Reducing food waste saves money.
                  A smaller, more intentional wardrobe costs less and creates less waste. Building an emergency
                  fund reduces the financial pressure that often pushes people toward less sustainable, more
                  convenience-driven choices.
                </p>
                <p>
                  What began as a handful of guides has grown into a full library covering personal finance,
                  sustainable living, and everything in between — always grounded in what&apos;s actually
                  achievable for a real household.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src="https://picsum.photos/seed/pp-about-story/900/700"
                alt="A tidy home office desk with a notebook, plant, and laptop, representing intentional planning"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 480px, 100vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="mission-vision-heading" className="py-16 lg:py-24">
        <Container>
          <h2 id="mission-vision-heading" className="sr-only">
            Mission and Vision
          </h2>
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-forest-200 bg-forest-50 p-8">
              <p className="eyebrow">Our mission</p>
              <p className="mt-3 font-display text-xl leading-snug text-ink">
                To help individuals and families make smarter financial decisions while embracing sustainable
                living practices that are practical, affordable, and genuinely achievable.
              </p>
            </div>
            <div className="rounded-lg border border-sand-300 bg-white p-8">
              <p className="eyebrow">Our vision</p>
              <p className="mt-3 font-display text-xl leading-snug text-ink">
                A world where financial wellbeing and environmental responsibility are treated as one
                lifestyle, not two separate — and often conflicting — pursuits.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="values-heading" className="bg-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What we stand for</p>
            <h2 id="values-heading" className="mt-2 text-display-sm text-ink sm:text-display-md">
              Core Values
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            {CORE_VALUES.map((value) => (
              <ValueCard key={value.title} title={value.title} description={value.description} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="philosophy-heading" className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 id="philosophy-heading" className="mt-2 text-display-sm text-ink sm:text-display-md">
                Our Editorial Philosophy
              </h2>
              <div className="prose-editorial mt-5 max-w-none text-ink-muted">
                <p>
                  We write for people who are busy, not people with unlimited time to research every decision.
                  That means we prioritize clarity over jargon, and a realistic next step over an idealized
                  perfect plan.
                </p>
                <p>
                  Every guide is built around a simple test: could someone read this on a lunch break and walk
                  away with something they can actually do this week?
                </p>
              </div>
            </div>

            <div>
              <p className="eyebrow">Why you can trust us</p>
              <h2 className="mt-2 text-display-sm text-ink sm:text-display-md">Why Readers Trust Us</h2>
              <div className="prose-editorial mt-5 max-w-none text-ink-muted">
                <p>
                  We cross-check claims against credible, independent sources before publishing, and we correct
                  errors publicly when we get something wrong. If we ever recommend a specific product or
                  service, we disclose any financial relationship clearly — see our full{' '}
                  <a href="/disclosure">Disclosure</a> for details.
                </p>
                <p>
                  We&apos;re committed to factual, research-based, and practical advice — not trends dressed up
                  as strategy.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="topics-heading" className="bg-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What you&apos;ll find here</p>
            <h2 id="topics-heading" className="mt-2 text-display-sm text-ink sm:text-display-md">
              Topics We Cover
            </h2>
            <p className="mt-4 text-body-base text-ink-muted">
              Everything we publish falls somewhere across these areas — and they&apos;re more connected than
              they might first appear.
            </p>
          </div>
          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {TOPICS.map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-sand-300 bg-sand-100 px-4 py-2 text-sm font-medium text-ink-soft"
              >
                {topic}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <Button href="/articles" size="lg">
              Explore the latest articles
            </Button>
          </div>
        </Container>
      </section>

      <NewsletterSection />
    </>
  );
}
