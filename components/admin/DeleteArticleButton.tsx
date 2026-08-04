'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteArticleButton({ id, title }: { id: number; title: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
    router.refresh();
  }

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="text-xs text-ink-muted">Delete &ldquo;{title}&rdquo;?</span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="rounded-full bg-earth-600 px-3 py-1 text-xs font-medium text-white hover:bg-earth-700 disabled:opacity-60"
        >
          {loading ? 'Deleting…' : 'Confirm'}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-xs font-medium text-ink-muted hover:text-ink"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-xs font-medium text-earth-600 hover:text-earth-700"
    >
      Delete
    </button>
  );
}
