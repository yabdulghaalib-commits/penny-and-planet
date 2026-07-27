/** Reserved for future sponsored posts. Usage in MDX: <SponsoredDisclosure sponsorName="..." /> */
export function SponsoredDisclosure({ sponsorName }: { sponsorName?: string }) {
  return (
    <div className="not-prose my-6 flex items-center gap-2 rounded-md bg-gold-50 px-4 py-3 text-sm text-ink-soft">
      <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-gold-600" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 9v4.5m0-7v.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span>
        This article {sponsorName ? `is sponsored by ${sponsorName}` : 'contains sponsored content'}. See our{' '}
        <a href="/disclosure" className="underline decoration-gold-300 underline-offset-4">
          Disclosure
        </a>{' '}
        for details.
      </span>
    </div>
  );
}
