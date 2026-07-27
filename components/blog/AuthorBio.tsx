import Image from 'next/image';
import Link from 'next/link';
import type { Author, AuthorSocialLink } from '@/lib/types';
import { authorHref } from '@/lib/format';

const SOCIAL_LABELS: Record<AuthorSocialLink['platform'], string> = {
  twitter: 'Twitter',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  website: 'Website',
  pinterest: 'Pinterest',
};

interface AuthorBioProps {
  author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <aside className="mx-auto mt-14 max-w-content-narrow rounded-lg border border-sand-300 bg-white p-6 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Image
          src={author.avatarUrl}
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-full object-cover"
        />
        <div>
          <p className="eyebrow">Written by</p>
          <Link href={authorHref(author.slug)} className="mt-1 block font-display text-lg text-ink hover:text-forest-700">
            {author.name}
          </Link>
          {author.credentials && <p className="text-xs text-ink-muted">{author.credentials}</p>}
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{author.bio}</p>

          {author.expertise && author.expertise.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {author.expertise.map((area) => (
                <li key={area} className="rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-forest-700">
                  {area}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href={authorHref(author.slug)} className="text-sm font-medium text-forest-700 hover:text-forest-600">
              View all articles →
            </Link>
            {author.socialLinks?.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-muted hover:text-forest-600"
              >
                {SOCIAL_LABELS[link.platform]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
