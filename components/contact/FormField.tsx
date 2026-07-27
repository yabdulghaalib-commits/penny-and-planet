import type { InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function FormField({ label, id, ...props }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="mt-2 w-full rounded-md border border-sand-300 bg-white px-4 py-2.5 text-ink placeholder:text-ink-muted focus:border-forest-500 focus:outline-none"
      />
    </div>
  );
}
