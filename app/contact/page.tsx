import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/contact/ContactForm';
import { FaqList } from '@/components/contact/FaqList';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Penny and Planet team: questions, collaborations, and feedback welcome.',
  alternates: { canonical: '/contact' },
};

const FAQ_ITEMS = [
  {
    question: 'Can I suggest a blog topic?',
    answer:
      "Absolutely. Reader suggestions shape a lot of what we cover. Use the form below with \"Topic suggestion\" as the subject and tell us what you'd like to see.",
  },
  {
    question: 'Can I collaborate with Penny and Planet?',
    answer:
      "Yes, we're open to thoughtful collaborations that align with our focus on practical finance and sustainable living. Send us a note with \"Collaboration\" as the subject and a bit about what you have in mind.",
  },
  {
    question: 'Do you accept guest posts?',
    answer:
      'We occasionally accept guest contributions from writers with genuine expertise in our topic areas. Include "Guest post" as the subject along with a short pitch and a writing sample or two.',
  },
  {
    question: 'How can I report an error in an article?',
    answer:
      'We take accuracy seriously and appreciate corrections. Include the article title, a link if you have it, and what you believe is incorrect. We review and fix these quickly.',
  },
  {
    question: 'How can I contact you regarding partnerships?',
    answer:
      'For advertising, sponsorship, or affiliate partnership inquiries, use "Partnership inquiry" as the subject. See our Disclosure page for how we handle partnerships editorially.',
  },
];

export default function ContactPage() {
  return (
    <div className="py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-2 text-display-md text-ink sm:text-display-lg">Contact Us</h1>
          <p className="mt-4 text-body-base text-ink-muted">
            Questions, topic suggestions, corrections, or partnership ideas: we&apos;d genuinely like to hear
            from you. Fill out the form below and we&apos;ll get back to you within 2–3 business days.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-12 lg:grid-cols-[1fr_320px]">
          <div className="rounded-lg border border-sand-300 bg-white p-6 sm:p-8">
            <ContactForm />
          </div>

          <aside className="space-y-8">
            <div>
              <p className="eyebrow">Email</p>
              <a
                href="mailto:hello@pennyandplanet.com"
                className="mt-2 block font-display text-lg text-ink hover:text-forest-700"
              >
                hello@pennyandplanet.com
              </a>
            </div>

            <div>
              <p className="eyebrow">Follow along</p>
              <ul className="mt-2 space-y-1.5">
                {['Instagram', 'Pinterest', 'YouTube'].map((platform) => (
                  <li key={platform}>
                    <a href="#" className="text-sm text-ink-soft underline decoration-sand-300 underline-offset-4 hover:text-forest-700 hover:decoration-forest-300">
                      {platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Response time</p>
              <p className="mt-2 text-sm text-ink-muted">
                We typically reply within 2–3 business days. Partnership and press inquiries may take a little
                longer during busy periods.
              </p>
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-20 max-w-3xl">
          <div className="text-center">
            <p className="eyebrow">Common questions</p>
            <h2 className="mt-2 text-display-sm text-ink sm:text-display-md">Frequently Asked Questions</h2>
          </div>
          <div className="mt-8">
            <FaqList items={FAQ_ITEMS} />
          </div>
        </div>
      </Container>
    </div>
  );
}
