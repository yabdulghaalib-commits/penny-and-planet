import type { DownloadableResource } from '@/lib/types';

interface ArticleDownloadResourceProps {
  resource: DownloadableResource;
}

/** Rendered automatically when an article's frontmatter references a `downloadableResource` slug. */
export function ArticleDownloadResource({ resource }: ArticleDownloadResourceProps) {
  return (
    <div className="mx-auto mt-10 flex max-w-content-narrow items-center gap-4 rounded-lg border border-forest-200 bg-forest-50 p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-forest-600 text-white">
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M10 3v9m0 0 3.5-3.5M10 12l-3.5-3.5M4 15h12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="flex-1">
        <p className="font-display text-base text-ink">{resource.title}</p>
        <p className="text-sm text-ink-muted">{resource.description}</p>
      </div>
      <a
        href={resource.fileUrl}
        download
        className="shrink-0 rounded-full bg-forest-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-600"
      >
        Download
      </a>
    </div>
  );
}
