'use client';

import { useId, useState, type FormEvent } from 'react';
import { subscribeToNewsletter } from '@/lib/services/newsletter';

export function SidebarNewsletterForm() {
  const inputId = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    const result = await subscribeToNewsletter(email);
    setStatus(result.success ? 'success' : 'error');
    setMessage(result.message);
    if (result.success) setEmail('');
  }

  if (status === 'success') {
    return <p className="text-sm text-forest-700">{message}</p>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-2">
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <input
        id={inputId}
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full rounded-full border border-sand-300 bg-white px-4 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-forest-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-full bg-forest-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-600 disabled:opacity-60"
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {status === 'error' && <p className="text-xs text-earth-700">{message}</p>}
    </form>
  );
}
