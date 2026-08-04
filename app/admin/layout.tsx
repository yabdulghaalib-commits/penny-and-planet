import { AdminNav } from '@/components/admin/AdminNav';

export const metadata = {
  title: 'Penny and Planet Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand-100">
      <AdminNav />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">{children}</main>
    </div>
  );
}
