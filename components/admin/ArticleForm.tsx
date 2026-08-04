'use client';

import { useId, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { ArticleRow } from '@/lib/db/articles';
import type { Category } from '@/lib/types';
import { ArticleContentEditor } from '@/components/admin/editor/ArticleContentEditor';
import { MediaLibraryModal, type PickedImage } from '@/components/admin/editor/MediaLibraryModal';

interface AuthorOption {
  slug: string;
  name: string;
}

interface ArticleFormProps {
  categories: Category[];
  authors: AuthorOption[];
  /** Present when editing; absent when creating. */
  article?: ArticleRow;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toDateInputValue(value: string | null): string {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 10);
}

export function ArticleForm({ categories, authors, article }: ArticleFormProps) {
  const router = useRouter();
  const isEditing = Boolean(article);

  const [title, setTitle] = useState(article?.title ?? '');
  const [slug, setSlug] = useState(article?.slug ?? '');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(isEditing);
  const [category, setCategory] = useState(article?.category ?? categories[0]?.slug ?? '');
  const [authorSlug, setAuthorSlug] = useState(article?.author_slug ?? authors[0]?.slug ?? '');
  const [featuredImageUrl, setFeaturedImageUrl] = useState(article?.featured_image_url ?? '');
  const [featuredImageAlt, setFeaturedImageAlt] = useState(article?.featured_image_alt ?? '');
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? '');
  const [content, setContent] = useState(article?.content ?? '');
  const [tags, setTags] = useState(article?.tags?.join(', ') ?? '');
  const [status, setStatus] = useState<'draft' | 'published'>(article?.status ?? 'draft');
  const [featured, setFeatured] = useState(article?.featured ?? false);
  const [publishedAt, setPublishedAt] = useState(toDateInputValue(article?.published_at ?? null));
  const [metaTitle, setMetaTitle] = useState(article?.meta_title ?? '');
  const [metaDescription, setMetaDescription] = useState(article?.meta_description ?? '');
  const [canonicalUrl, setCanonicalUrl] = useState(article?.canonical_url ?? '');
  const [pinterestTitle, setPinterestTitle] = useState(article?.pinterest_title ?? '');
  const [pinterestDescription, setPinterestDescription] = useState(article?.pinterest_description ?? '');
  const [pinterestImageUrl, setPinterestImageUrl] = useState(article?.pinterest_image_url ?? '');

  const [status_, setSubmitStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [error, setError] = useState('');
  const [featuredImagePickerOpen, setFeaturedImagePickerOpen] = useState(false);
  const [pinterestImagePickerOpen, setPinterestImagePickerOpen] = useState(false);

  const ids = {
    title: useId(), slug: useId(), category: useId(), author: useId(), image: useId(), imageAlt: useId(),
    excerpt: useId(), content: useId(), tags: useId(), publishedAt: useId(), metaTitle: useId(),
    metaDescription: useId(), canonicalUrl: useId(), pinTitle: useId(), pinDescription: useId(), pinImage: useId(),
  };

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugManuallyEdited) setSlug(slugify(value));
  }

  function handleFeaturedImagePicked(image: PickedImage) {
    setFeaturedImageUrl(image.url);
    if (image.alt) setFeaturedImageAlt(image.alt);
    setFeaturedImagePickerOpen(false);
  }

  function handlePinterestImagePicked(image: PickedImage) {
    setPinterestImageUrl(image.url);
    setPinterestImagePickerOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>, submitStatus: 'draft' | 'published') {
    event.preventDefault();
    setSubmitStatus('saving');
    setError('');

    const payload = {
      title,
      slug,
      category,
      authorSlug,
      featuredImageUrl,
      featuredImageAlt,
      excerpt,
      content,
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      status: submitStatus,
      featured,
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      canonicalUrl: canonicalUrl || null,
      pinterestTitle: pinterestTitle || null,
      pinterestDescription: pinterestDescription || null,
      pinterestImageUrl: pinterestImageUrl || null,
    };

    try {
      const response = await fetch(isEditing ? `/api/admin/articles/${article!.id}` : '/api/admin/articles', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || 'Something went wrong while saving.');
        setSubmitStatus('error');
        return;
      }

      router.push('/admin/articles');
      router.refresh();
    } catch {
      setError('Something went wrong while saving.');
      setSubmitStatus('error');
    }
  }

  const inputClass = 'mt-1.5 w-full rounded-md border border-sand-300 bg-white px-3.5 py-2 text-sm text-ink focus:border-forest-500 focus:outline-none';
  const labelClass = 'block text-sm font-medium text-ink';

  return (
    <form className="space-y-8" onSubmit={(event) => handleSubmit(event, status)}>
      <section className="rounded-lg border border-sand-300 bg-white p-6">
        <h2 className="font-display text-lg text-ink">Content</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor={ids.title} className={labelClass}>Title</label>
            <input id={ids.title} required value={title} onChange={(e) => handleTitleChange(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor={ids.slug} className={labelClass}>Slug</label>
            <input
              id={ids.slug}
              required
              value={slug}
              onChange={(e) => { setSlug(slugify(e.target.value)); setSlugManuallyEdited(true); }}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-ink-muted">URL: /{category || 'category'}/{slug || 'slug'}</p>
          </div>
          <div>
            <label htmlFor={ids.category} className={labelClass}>Category</label>
            <select id={ids.category} value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
              {categories.map((entry) => (
                <option key={entry.slug} value={entry.slug}>{entry.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={ids.author} className={labelClass}>Author</label>
            <select id={ids.author} value={authorSlug} onChange={(e) => setAuthorSlug(e.target.value)} className={inputClass}>
              {authors.map((entry) => (
                <option key={entry.slug} value={entry.slug}>{entry.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={ids.tags} className={labelClass}>Tags (comma-separated)</label>
            <input id={ids.tags} value={tags} onChange={(e) => setTags(e.target.value)} className={inputClass} placeholder="budgeting-basics, saving-money" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={ids.image} className={labelClass}>Featured image</label>
            <div className="mt-1.5 flex items-start gap-3">
              {featuredImageUrl && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-sand-100">
                  <Image src={featuredImageUrl} alt="" fill sizes="64px" className="object-cover" unoptimized />
                </div>
              )}
              <div className="flex flex-1 gap-2">
                <input id={ids.image} required value={featuredImageUrl} onChange={(e) => setFeaturedImageUrl(e.target.value)} className={inputClass + ' mt-0'} placeholder="Paste a URL, or choose one" />
                <button type="button" onClick={() => setFeaturedImagePickerOpen(true)} className="shrink-0 rounded-md border border-sand-300 px-3 py-2 text-sm font-medium text-ink-soft hover:bg-sand-100">
                  Choose image
                </button>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={ids.imageAlt} className={labelClass}>Featured image alt text</label>
            <input id={ids.imageAlt} required value={featuredImageAlt} onChange={(e) => setFeaturedImageAlt(e.target.value)} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={ids.excerpt} className={labelClass}>Excerpt</label>
            <textarea id={ids.excerpt} required rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={ids.content} className={labelClass}>
              Article content
            </label>
            <div className="mt-1.5">
              <ArticleContentEditor value={content} onChange={setContent} />
            </div>
            <p className="mt-1.5 text-xs text-ink-muted">
              Rich Text mode supports headings, bold/italic, lists, links, blockquotes, and tables, including pasting
              directly from Word or Google Docs. Raw Markdown mode (used automatically when opening an existing
              article) is the plain-text view, and is where the site&apos;s shortcodes like <code>&lt;Callout&gt;</code>,{' '}
              <code>&lt;PullQuote&gt;</code>, <code>&lt;KeyTakeaways&gt;</code>, and <code>&lt;Faq&gt;</code> are written.
              Use Preview after saving to check rendering before publishing.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-sand-300 bg-white p-6">
        <h2 className="font-display text-lg text-ink">Publishing</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <span className={labelClass}>Status</span>
            <div className="mt-1.5 flex gap-2">
              <button type="button" onClick={() => setStatus('draft')} className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${status === 'draft' ? 'border-forest-500 bg-forest-50 text-forest-700' : 'border-sand-300 text-ink-muted'}`}>
                Draft
              </button>
              <button type="button" onClick={() => setStatus('published')} className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${status === 'published' ? 'border-forest-500 bg-forest-50 text-forest-700' : 'border-sand-300 text-ink-muted'}`}>
                Published
              </button>
            </div>
          </div>
          <div>
            <label htmlFor={ids.publishedAt} className={labelClass}>Publish date</label>
            <input id={ids.publishedAt} type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className={inputClass} />
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-4 w-4 rounded border-sand-300" />
              Featured on homepage
            </label>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-sand-300 bg-white p-6">
        <h2 className="font-display text-lg text-ink">SEO</h2>
        <div className="mt-4 grid gap-4">
          <div>
            <label htmlFor={ids.metaTitle} className={labelClass}>SEO title (optional, defaults to Title)</label>
            <input id={ids.metaTitle} value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor={ids.metaDescription} className={labelClass}>Meta description (optional, defaults to Excerpt)</label>
            <textarea id={ids.metaDescription} rows={2} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor={ids.canonicalUrl} className={labelClass}>Canonical URL (optional override)</label>
            <input id={ids.canonicalUrl} value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)} className={inputClass} placeholder="Leave blank to use the default article URL" />
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-sand-300 bg-white p-6">
        <h2 className="font-display text-lg text-ink">Pinterest</h2>
        <p className="mt-1 text-xs text-ink-muted">
          For your own reference when manually creating a Pin. Nothing here is published to Pinterest automatically.
        </p>
        <div className="mt-4 grid gap-4">
          <div>
            <label htmlFor={ids.pinTitle} className={labelClass}>Pinterest title</label>
            <input id={ids.pinTitle} value={pinterestTitle} onChange={(e) => setPinterestTitle(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor={ids.pinDescription} className={labelClass}>Pinterest description</label>
            <textarea id={ids.pinDescription} rows={2} value={pinterestDescription} onChange={(e) => setPinterestDescription(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor={ids.pinImage} className={labelClass}>Pinterest image URL (ideally a tall 2:3 image)</label>
            <div className="mt-1.5 flex gap-2">
              <input id={ids.pinImage} value={pinterestImageUrl} onChange={(e) => setPinterestImageUrl(e.target.value)} className={inputClass + ' mt-0'} />
              <button type="button" onClick={() => setPinterestImagePickerOpen(true)} className="shrink-0 rounded-md border border-sand-300 px-3 py-2 text-sm font-medium text-ink-soft hover:bg-sand-100">
                Choose image
              </button>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <p role="alert" className="rounded-md bg-earth-50 px-4 py-3 text-sm text-earth-700">{error}</p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status_ === 'saving'}
          className="rounded-full bg-forest-700 px-6 py-3 text-sm font-medium text-white hover:bg-forest-600 disabled:opacity-60"
        >
          {status_ === 'saving' ? 'Saving…' : isEditing ? 'Save changes' : 'Create article'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/articles')}
          className="rounded-full border border-sand-300 px-6 py-3 text-sm font-medium text-ink-soft hover:bg-sand-100"
        >
          Cancel
        </button>
      </div>

      <MediaLibraryModal open={featuredImagePickerOpen} onClose={() => setFeaturedImagePickerOpen(false)} onSelect={handleFeaturedImagePicked} />
      <MediaLibraryModal open={pinterestImagePickerOpen} onClose={() => setPinterestImagePickerOpen(false)} onSelect={handlePinterestImagePicked} />
    </form>
  );
}
