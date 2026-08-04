'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PublishToggleProps {
  id: number;
  status: 'draft' | 'published';
}

export function PublishToggle({ id, status }: PublishToggleProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isPublished = status === 'published';

  async function handleToggle() {
    setLoading(true);
    const nextStatus = isPublished ? 'draft' : 'published';
    await fetch(`/api/admin/articles/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statusOnly: true, status: nextStatus }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className={
        isPublished
          ? 'rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-forest-700 hover:bg-sage-200 disabled:opacity-60'
          : 'rounded-full bg-sand-200 px-3 py-1 text-xs font-medium text-ink-muted hover:bg-sand-300 disabled:opacity-60'
      }
    >
      {loading ? 'Updating…' : isPublished ? 'Published' : 'Draft'}
    </button>
  );
}
