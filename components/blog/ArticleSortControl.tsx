'use client';

import { useId } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SORT_OPTIONS, SORT_LABELS, isArticleSortOption } from '@/lib/content/sorting';

export function ArticleSortControl() {
  const id = useId();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = isArticleSortOption(searchParams.get('sort')) ? searchParams.get('sort') : 'recent';

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (event.target.value === 'recent') {
      params.delete('sort');
    } else {
      params.set('sort', event.target.value);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink-soft">
        Sort by
      </label>
      <select
        id={id}
        value={currentSort ?? 'recent'}
        onChange={handleChange}
        className="rounded-full border border-sand-300 bg-white px-3 py-1.5 text-sm text-ink focus:border-forest-500 focus:outline-none"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {SORT_LABELS[option]}
          </option>
        ))}
      </select>
    </div>
  );
}
