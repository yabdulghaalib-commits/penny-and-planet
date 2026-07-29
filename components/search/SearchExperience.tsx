'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { SearchResultCard } from '@/components/ui/SearchResultCard';
import type { SearchResultItem } from '@/lib/services/search';
import type { Category, Tag } from '@/lib/types';
import { SORT_OPTIONS, SORT_LABELS } from '@/lib/content/sorting';

interface SearchExperienceProps {
  categories: Category[];
  tags: Tag[];
  suggestedArticles: { title: string; href: string }[];
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export function SearchExperience({ categories, tags, suggestedArticles }: SearchExperienceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputId = useId();
  const listboxId = useId();

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState(searchParams.get('category') ?? '');
  const [tag, setTag] = useState(searchParams.get('tag') ?? '');
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'recent');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const hasSearched = query.trim().length > 0 || category || tag;

  useEffect(() => {
    if (!hasSearched) {
      setResults([]);
      setStatus('idle');
      return;
    }

    setStatus('loading');
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (category) params.set('category', category);
      if (tag) params.set('tag', tag);
      if (sort !== 'recent') params.set('sort', sort);

      try {
        const response = await fetch(`/api/search?${params.toString()}`);
        const data: SearchResultItem[] = await response.json();
        setResults(data);
        setStatus('success');
      } catch {
        setStatus('error');
      }

      router.replace(params.toString() ? `/search?${params.toString()}` : '/search', { scroll: false });
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- router intentionally excluded to avoid re-triggering on navigation
  }, [query, category, tag, sort, hasSearched]);

  const suggestions = results.slice(0, 5);

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!suggestionsOpen || suggestions.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, suggestions.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      const target = suggestions[activeIndex];
      if (target) router.push(target.url);
    } else if (event.key === 'Escape') {
      setSuggestionsOpen(false);
    }
  }

  return (
    <div className="py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Find what you need</p>
          <h1 className="mt-2 text-display-md text-ink sm:text-display-lg">Search Penny and Planet</h1>
          <p className="mt-4 text-body-base text-ink-muted">
            Search by title, topic, category, tag, or author. Start typing and results appear instantly.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-2xl">
          <label htmlFor={inputId} className="sr-only">
            Search articles
          </label>
          <div className="relative">
            <svg viewBox="0 0 20 20" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="m17 17-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              id={inputId}
              type="search"
              role="combobox"
              aria-expanded={suggestionsOpen}
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSuggestionsOpen(true);
                setActiveIndex(-1);
              }}
              onFocus={() => setSuggestionsOpen(true)}
              onBlur={() => setTimeout(() => setSuggestionsOpen(false), 150)}
              onKeyDown={handleInputKeyDown}
              placeholder="Try “emergency fund” or “zero waste”…"
              className="w-full rounded-full border border-sand-300 bg-white py-4 pl-12 pr-5 text-lg text-ink placeholder:text-ink-muted focus:border-forest-500 focus:outline-none"
              autoComplete="off"
            />
          </div>

          {suggestionsOpen && query.trim().length > 0 && suggestions.length > 0 && (
            <ul id={listboxId} role="listbox" className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-sand-300 bg-white shadow-raised">
              {suggestions.map((result, index) => (
                <li key={result.slug} id={`${listboxId}-option-${index}`} role="option" aria-selected={index === activeIndex}>
                  <a
                    href={result.url}
                    className={`block px-5 py-3 text-sm ${index === activeIndex ? 'bg-sand-100 text-forest-700' : 'text-ink-soft hover:bg-sand-100'}`}
                  >
                    <span className="font-medium text-ink">{result.title}</span>
                    <span className="ml-2 text-xs text-ink-muted">{result.categoryLabel}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-3">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-full border border-sand-300 bg-white px-3 py-1.5 text-sm text-ink focus:border-forest-500 focus:outline-none"
          >
            <option value="">All categories</option>
            {categories.map((entry) => (
              <option key={entry.slug} value={entry.slug}>
                {entry.name}
              </option>
            ))}
          </select>

          <select
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            className="rounded-full border border-sand-300 bg-white px-3 py-1.5 text-sm text-ink focus:border-forest-500 focus:outline-none"
          >
            <option value="">All tags</option>
            {tags.map((entry) => (
              <option key={entry.slug} value={entry.slug}>
                {entry.name}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full border border-sand-300 bg-white px-3 py-1.5 text-sm text-ink focus:border-forest-500 focus:outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {SORT_LABELS[option]}
              </option>
            ))}
          </select>
        </div>

        <div className="mx-auto mt-12 max-w-6xl" aria-live="polite">
          {!hasSearched && (
            <div className="text-center">
              <p className="eyebrow">Not sure where to start?</p>
              <div className="mx-auto mt-4 flex max-w-lg flex-wrap justify-center gap-2">
                {categories.slice(0, 8).map((entry) => (
                  <button
                    key={entry.slug}
                    type="button"
                    onClick={() => setCategory(entry.slug)}
                    className="rounded-full border border-sand-300 bg-white px-4 py-2 text-sm text-ink-soft transition-colors hover:border-forest-300 hover:text-forest-700"
                  >
                    {entry.name}
                  </button>
                ))}
              </div>

              {suggestedArticles.length > 0 && (
                <div className="mx-auto mt-10 max-w-md text-left">
                  <p className="eyebrow text-center">Popular right now</p>
                  <ul className="mt-3 space-y-2">
                    {suggestedArticles.map((article) => (
                      <li key={article.href}>
                        <a href={article.href} className="text-sm text-ink-soft underline decoration-sand-300 underline-offset-4 hover:text-forest-700 hover:decoration-forest-300">
                          {article.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {hasSearched && status === 'loading' && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-80 animate-pulse rounded-lg bg-sand-200" />
              ))}
            </div>
          )}

          {hasSearched && status === 'success' && results.length > 0 && (
            <>
              <p className="mb-6 text-sm text-ink-muted">
                {results.length} {results.length === 1 ? 'result' : 'results'}
                {query.trim() && (
                  <>
                    {' '}
                    for &ldquo;<span className="font-medium text-ink">{query.trim()}</span>&rdquo;
                  </>
                )}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((result) => (
                  <SearchResultCard key={result.slug} result={result} />
                ))}
              </div>
            </>
          )}

          {hasSearched && status === 'success' && results.length === 0 && (
            <div className="text-center">
              <p className="font-display text-lg text-ink">No results found.</p>
              <p className="mt-2 text-sm text-ink-muted">
                Try a different term, or browse by category below.
              </p>
              <div className="mx-auto mt-6 flex max-w-lg flex-wrap justify-center gap-2">
                {categories.slice(0, 8).map((entry) => (
                  <button
                    key={entry.slug}
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setCategory(entry.slug);
                    }}
                    className="rounded-full border border-sand-300 bg-white px-4 py-2 text-sm text-ink-soft transition-colors hover:border-forest-300 hover:text-forest-700"
                  >
                    {entry.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasSearched && status === 'error' && (
            <p className="text-center text-sm text-earth-700">
              Something went wrong loading results. Please try again.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
