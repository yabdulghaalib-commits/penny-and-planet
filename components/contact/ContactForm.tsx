'use client';

import { useId, useState, type FormEvent, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/contact/FormField';
import { submitContactForm } from '@/lib/services/contact';

type Status = 'idle' | 'loading' | 'success' | 'error';

const initialValues = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();
  const statusId = useId();

  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  function updateField(field: keyof typeof initialValues) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    const result = await submitContactForm(values);

    setStatus(result.success ? 'success' : 'error');
    setStatusMessage(result.message);
    if (result.success) setValues(initialValues);
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-lg border border-forest-200 bg-forest-50 p-6 text-center">
        <p className="font-display text-lg text-ink">Message sent!</p>
        <p className="mt-2 text-sm text-ink-muted">{statusMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id={nameId}
          label="Full Name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={updateField('name')}
        />
        <FormField
          id={emailId}
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={updateField('email')}
        />
      </div>

      <FormField
        id={subjectId}
        label="Subject"
        name="subject"
        type="text"
        required
        value={values.subject}
        onChange={updateField('subject')}
      />

      <div>
        <label htmlFor={messageId} className="block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={6}
          required
          value={values.message}
          onChange={updateField('message')}
          className="mt-2 w-full resize-y rounded-md border border-sand-300 bg-white px-4 py-2.5 text-ink placeholder:text-ink-muted focus:border-forest-500 focus:outline-none"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-md bg-earth-50 px-4 py-3 text-sm text-earth-700">
          {statusMessage}
        </p>
      )}

      <p id={statusId} className="sr-only" aria-live="polite">
        {status === 'loading' ? 'Sending your message…' : ''}
      </p>

      <Button type="submit" size="lg" disabled={status === 'loading'} className="w-full sm:w-auto">
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  );
}
