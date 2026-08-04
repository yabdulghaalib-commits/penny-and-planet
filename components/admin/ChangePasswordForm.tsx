'use client';

import { useId, useState, type FormEvent } from 'react';

export function ChangePasswordForm() {
  const currentId = useId();
  const newId = useId();
  const confirmId = useId();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('New password and confirmation do not match.');
      return;
    }

    setStatus('saving');
    setMessage('');

    try {
      const response = await fetch('/api/admin/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
        return;
      }

      setStatus('success');
      setMessage('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  const inputClass = 'mt-1.5 w-full rounded-md border border-sand-300 bg-white px-3.5 py-2 text-sm text-ink focus:border-forest-500 focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
      <div>
        <label htmlFor={currentId} className="block text-sm font-medium text-ink">Current password</label>
        <input id={currentId} type="password" required autoComplete="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label htmlFor={newId} className="block text-sm font-medium text-ink">New password</label>
        <input id={newId} type="password" required minLength={10} autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputClass} />
        <p className="mt-1 text-xs text-ink-muted">At least 10 characters.</p>
      </div>
      <div>
        <label htmlFor={confirmId} className="block text-sm font-medium text-ink">Confirm new password</label>
        <input id={confirmId} type="password" required autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} />
      </div>

      {message && (
        <p role="status" className={`rounded-md px-4 py-3 text-sm ${status === 'success' ? 'bg-forest-50 text-forest-700' : 'bg-earth-50 text-earth-700'}`}>
          {message}
        </p>
      )}

      <button type="submit" disabled={status === 'saving'} className="rounded-full bg-forest-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-forest-600 disabled:opacity-60">
        {status === 'saving' ? 'Updating…' : 'Update password'}
      </button>
    </form>
  );
}
