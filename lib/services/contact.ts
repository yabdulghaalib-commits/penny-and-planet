export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResult {
  success: boolean;
  message: string;
}

/**
 * Single integration point for the contact form. The form component only
 * ever calls this function — wiring it to a real email service or backend
 * API later (e.g. a Next.js Route Handler that forwards to Resend,
 * SendGrid, or a support inbox) means editing this file only.
 */
export async function submitContactForm(values: ContactFormValues): Promise<ContactFormResult> {
  // TODO(stage: contact backend): replace with a real API route.
  await new Promise((resolve) => setTimeout(resolve, 600));

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
  if (!values.name.trim() || !isValidEmail || !values.subject.trim() || !values.message.trim()) {
    return { success: false, message: 'Please fill in every field with a valid email address.' };
  }

  return {
    success: true,
    message: "Thanks for reaching out. We'll get back to you within 2–3 business days.",
  };
}
