'use client';

import { useId, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function LoginForm() {
  const emailId = useId();
  const passwordId = useId();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('from') || '/admin/articles';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || 'Login failed. Please try again.');
        setStatus('error');
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor={emailId} className="block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id={emailId}
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-md border border-sand-300 bg-white px-4 py-2.5 text-ink focus:border-forest-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor={passwordId} className="block text-sm font-medium text-ink">
          Password
        </label>
        <input
          id={passwordId}
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-md border border-sand-300 bg-white px-4 py-2.5 text-ink focus:border-forest-500 focus:outline-none"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-earth-50 px-4 py-3 text-sm text-earth-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-full bg-forest-700 px-5 py-3 font-medium text-white hover:bg-forest-600 disabled:opacity-60"
      >
        {status === 'loading' ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
