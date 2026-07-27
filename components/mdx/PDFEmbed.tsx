interface PDFEmbedProps {
  src: string;
  title: string;
}

/** Embeds a PDF inline with a plain-link fallback for browsers/screen readers that can't render the embed. */
export function PDFEmbed({ src, title }: PDFEmbedProps) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-md border border-sand-300">
      <object data={src} type="application/pdf" className="h-[32rem] w-full" aria-label={title}>
        <p className="p-5 text-sm text-ink-muted">
          Your browser can&apos;t display this PDF inline.{' '}
          <a href={src} className="text-forest-600 underline underline-offset-4">
            Open &ldquo;{title}&rdquo; in a new tab
          </a>
          .
        </p>
      </object>
    </div>
  );
}
