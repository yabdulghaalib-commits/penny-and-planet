'use client';

import { useId, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export function NotFoundSearch() {
  const inputId = useId();
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-2">
      <label htmlFor={inputId} className="sr-only">
        Search articles
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search articles…"
        className="w-full rounded-full border border-sand-300 bg-white px-5 py-2.5 text-ink placeholder:text-ink-muted focus:border-forest-500 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-forest-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-600"
      >
        Search
      </button>
    </form>
  );
}
