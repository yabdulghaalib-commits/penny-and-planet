'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  if (pathname === '/admin/login') return null;

  async function handleLogout() {
    setLoggingOut(true);
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="border-b border-sand-300 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/admin/articles" className="font-display text-lg text-ink">
          Penny &amp; Planet <span className="text-forest-600">Admin</span>
        </Link>
        <nav aria-label="Admin" className="flex items-center gap-1">
          <Link href="/admin/articles" className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft hover:bg-sand-200 hover:text-forest-700">
            Articles
          </Link>
          <Link href="/admin/articles/new" className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft hover:bg-sand-200 hover:text-forest-700">
            New Article
          </Link>
          <Link href="/admin/settings" className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft hover:bg-sand-200 hover:text-forest-700">
            Settings
          </Link>
          <Link href="/" className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft hover:bg-sand-200 hover:text-forest-700">
            View Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="ml-2 rounded-full bg-forest-700 px-4 py-2 text-sm font-medium text-white hover:bg-forest-600 disabled:opacity-60"
          >
            {loggingOut ? 'Logging out…' : 'Log out'}
          </button>
        </nav>
      </div>
    </header>
  );
}
