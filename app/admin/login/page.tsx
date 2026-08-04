import { Suspense } from 'react';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-100 px-5">
      <div className="w-full max-w-sm rounded-lg border border-sand-300 bg-white p-8">
        <p className="eyebrow text-center">Penny &amp; Planet</p>
        <h1 className="mt-2 text-center font-display text-2xl text-ink">Admin Login</h1>
        <div className="mt-6">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
