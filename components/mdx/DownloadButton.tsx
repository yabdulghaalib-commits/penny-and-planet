interface DownloadButtonProps {
  href: string;
  label: string;
}

/** Inline call-to-action for downloadable resources referenced within the article body. */
export function DownloadButton({ href, label }: DownloadButtonProps) {
  return (
    <a
      href={href}
      download
      className="not-prose my-6 inline-flex items-center gap-2 rounded-full bg-forest-700 px-5 py-2.5 text-body-base font-medium text-white transition-colors hover:bg-forest-600"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
        <path d="M10 3v10m0 0 4-4m-4 4-4-4M4 16h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </a>
  );
}
