import Image from 'next/image';
import Link from 'next/link';
import type { DownloadableResource } from '@/lib/types';

const FILE_TYPE_LABELS: Record<DownloadableResource['fileType'], string> = {
  pdf: 'PDF',
  xlsx: 'Spreadsheet',
  docx: 'Word Doc',
  zip: 'ZIP',
};

export function ResourceCard({ resource }: { resource: DownloadableResource }) {
  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-sand-300 bg-white transition-all duration-300 ease-editorial hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
        {resource.previewImage && (
          <Image
            src={resource.previewImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-forest-600">
          {FILE_TYPE_LABELS[resource.fileType]}
        </span>
        <p className="font-display text-base text-ink group-hover:text-forest-700">{resource.title}</p>
        <p className="flex-1 text-sm text-ink-muted">{resource.description}</p>
      </div>
    </Link>
  );
}
