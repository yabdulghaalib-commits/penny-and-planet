import { ChangePasswordForm } from '@/components/admin/ChangePasswordForm';

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Settings</h1>
      <div className="mt-6 rounded-lg border border-sand-300 bg-white p-6">
        <h2 className="font-display text-lg text-ink">Change password</h2>
        <div className="mt-4">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
