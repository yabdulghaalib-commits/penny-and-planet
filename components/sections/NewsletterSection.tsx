'use client';

import { useId, useState, type FormEvent } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { subscribeToNewsletter } from '@/lib/services/newsletter';

const BENEFITS = [
  'Practical money-saving tips',
  'Sustainable living ideas',
  'Budgeting resources',
  'Exclusive financial guides',
  'Eco-friendly lifestyle advice',
  'Printable planners & checklists',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterSection() {
  const emailId = useId();
  const statusId = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    const result = await subscribeToNewsletter(email);

    setStatus(result.success ? 'success' : 'error');
    setMessage(result.message);
    if (result.success) setEmail('');
  }

  return (
    <section id="newsletter" aria-labelledby="newsletter-heading" className="bg-forest-700 py-16 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow text-sage-300">Join the community</p>
          <h2 id="newsletter-heading" className="mt-2 text-display-sm text-white sm:text-display-md">
            Get smarter with money and lighter on the planet, one email at a time.
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-sm text-sand-100">
                <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-sage-300" fill="none" aria-hidden="true">
                  <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-forest-800/60 p-6 ring-1 ring-forest-600 sm:p-8">
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor={emailId} className="block text-sm font-medium text-sand-100">
              Email address
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id={emailId}
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-describedby={message ? statusId : undefined}
                aria-invalid={status === 'error'}
                className="w-full flex-1 rounded-full border border-forest-500 bg-forest-800 px-4 py-2.5 text-white placeholder:text-sand-300 focus:border-sage-300 focus:outline-none"
              />
              <Button type="submit" size="md" disabled={status === 'loading'} className="shrink-0">
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </Button>
            </div>

            <p id={statusId} role="status" className="mt-3 min-h-[1.25rem] text-sm text-sage-200">
              {message}
            </p>

            <p className="mt-1 text-xs text-sand-300">
              No spam, ever. Unsubscribe anytime. Read our{' '}
              <a href="/privacy-policy" className="underline decoration-forest-500 underline-offset-4 hover:decoration-sage-300">
                privacy policy
              </a>
              .
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
