export interface NewsletterSubscribeResult {
  success: boolean;
  message: string;
}

/**
 * Session-level guard against double-submitting the same address twice in
 * a row (e.g. an accidental double-click). This is a UX nicety only — it
 * resets on page reload and is not a substitute for real deduplication,
 * which MailerLite (or any ESP) already handles natively by email address
 * once this stub is replaced with a real API call.
 */
const recentlySubscribed = new Set<string>();

/**
 * Single integration point for newsletter signups, called from every
 * newsletter form on the site (homepage, sidebar, end of articles). Swap
 * this implementation for a real call to MailerLite's API (or any other
 * ESP) and every form on the site picks it up with no UI changes.
 *
 * MailerLite integration sketch (see .env.example for the env vars):
 *   POST https://connect.mailerlite.com/api/subscribers
 *   Authorization: Bearer ${process.env.MAILERLITE_API_KEY}
 *   body: { email, groups: [process.env.MAILERLITE_GROUP_ID] }
 * This should move behind a Next.js Route Handler (e.g. /api/newsletter)
 * so the API key never reaches the browser — this function would then
 * `fetch('/api/newsletter', { method: 'POST', body: ... })` instead of
 * calling an ESP directly.
 */
export async function subscribeToNewsletter(email: string): Promise<NewsletterSubscribeResult> {
  // TODO(stage: newsletter integration): replace this stub with a fetch()
  // to a /api/newsletter Route Handler that forwards to MailerLite.
  await new Promise((resolve) => setTimeout(resolve, 500));

  const normalizedEmail = email.trim().toLowerCase();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
  if (!isValidEmail) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  if (recentlySubscribed.has(normalizedEmail)) {
    return { success: true, message: "You're already on the list. Check your inbox for a confirmation email." };
  }

  recentlySubscribed.add(normalizedEmail);
  return { success: true, message: "You're in! Check your inbox to confirm your subscription." };
}
