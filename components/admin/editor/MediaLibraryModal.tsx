'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import type { MediaSearchResult, MediaProvider } from '@/lib/media/types';
import type { MediaLibraryRow } from '@/lib/db/media';

export interface PickedImage {
  url: string;
  alt: string;
}

interface MediaLibraryModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (image: PickedImage) => void;
}

type Tab = 'search' | 'library' | 'upload';

const PROVIDERS: { id: MediaProvider; label: string }[] = [
  { id: 'unsplash', label: 'Unsplash' },
  { id: 'pexels', label: 'Pexels' },
  { id: 'pixabay', label: 'Pixabay' },
];

export function MediaLibraryModal({ open, onClose, onSelect }: MediaLibraryModalProps) {
  const [tab, setTab] = useState<Tab>('search');
  const [provider, setProvider] = useState<MediaProvider>('unsplash');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MediaSearchResult[]>([]);
  const [searchStatus, setSearchStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [searchError, setSearchError] = useState('');
  const [providerAvailability, setProviderAvailability] = useState<Record<MediaProvider, boolean> | null>(null);

  const [libraryItems, setLibraryItems] = useState<MediaLibraryRow[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);

  const [pendingImage, setPendingImage] = useState<{ url: string; alt: string; save: () => Promise<void> } | null>(null);
  const [altDraft, setAltDraft] = useState('');

  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'error'>('idle');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [manualUrl, setManualUrl] = useState('');

  const searchInputId = useId();
  const altInputId = useId();
  const manualUrlId = useId();

  useEffect(() => {
    if (!open) return;
    // Refresh provider availability + library contents each time the modal opens.
    fetch('/api/admin/media')
      .then((response) => response.json())
      .then((data) => {
        setLibraryItems(data.items ?? []);
        setProviderAvailability({
          unsplash: Boolean(data.providers?.unsplashConfigured),
          pexels: Boolean(data.providers?.pexelsConfigured),
          pixabay: Boolean(data.providers?.pixabayConfigured),
        });
      })
      .catch(() => {});
  }, [open]);

  async function handleSearch(event?: React.FormEvent) {
    event?.preventDefault();
    if (!query.trim()) return;
    setSearchStatus('loading');
    setSearchError('');
    try {
      const response = await fetch(`/api/admin/media/search?provider=${provider}&q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (!response.ok) {
        setSearchError(data.error || 'Search failed.');
        setSearchStatus('error');
        return;
      }
      setSearchResults(data.results ?? []);
      setSearchStatus('idle');
    } catch {
      setSearchError('Search failed. Please try again.');
      setSearchStatus('error');
    }
  }

  function chooseSearchResult(result: MediaSearchResult) {
    setAltDraft(result.suggestedAlt);
    setPendingImage({
      url: result.fullUrl,
      alt: result.suggestedAlt,
      save: async () => {
        await fetch('/api/admin/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: result.fullUrl,
            altText: altDraft,
            source: result.provider,
            sourceId: result.sourceId,
            attribution: result.attribution,
            width: result.width,
            height: result.height,
          }),
        });
      },
    });
  }

  function chooseLibraryItem(item: MediaLibraryRow) {
    setAltDraft(item.alt_text);
    setPendingImage({ url: item.url, alt: item.alt_text, save: async () => {} });
  }

  function chooseManualUrl() {
    if (!manualUrl.trim()) return;
    setAltDraft('');
    setPendingImage({
      url: manualUrl.trim(),
      alt: '',
      save: async () => {
        await fetch('/api/admin/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: manualUrl.trim(), altText: altDraft, source: 'manual' }),
        });
      },
    });
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus('uploading');
    setUploadError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/media/upload', { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) {
        setUploadError(data.error || 'Upload failed.');
        setUploadStatus('idle');
        return;
      }
      setAltDraft('');
      setPendingImage({ url: data.url, alt: '', save: async () => {} });
      setUploadStatus('idle');
    } catch {
      setUploadError('Upload failed. Please try again.');
      setUploadStatus('idle');
    }
  }

  async function confirmSelection() {
    if (!pendingImage) return;
    await pendingImage.save();
    onSelect({ url: pendingImage.url, alt: altDraft });
    setPendingImage(null);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4" role="dialog" aria-modal="true" aria-label="Choose an image">
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white">
        <div className="flex items-center justify-between border-b border-sand-300 px-5 py-4">
          <h2 className="font-display text-lg text-ink">Choose an image</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-ink-muted hover:text-ink">
            ✕
          </button>
        </div>

        {pendingImage ? (
          <div className="flex-1 overflow-y-auto p-5">
            <div className="relative mx-auto aspect-video max-w-md overflow-hidden rounded-md bg-sand-100">
              <Image src={pendingImage.url} alt="" fill sizes="480px" className="object-cover" unoptimized />
            </div>
            <div className="mx-auto mt-4 max-w-md">
              <label htmlFor={altInputId} className="block text-sm font-medium text-ink">
                Alt text (describes the image for screen readers and SEO)
              </label>
              <input
                id={altInputId}
                value={altDraft}
                onChange={(event) => setAltDraft(event.target.value)}
                placeholder="Describe what's in the image"
                className="mt-1.5 w-full rounded-md border border-sand-300 px-3.5 py-2 text-sm focus:border-forest-500 focus:outline-none"
              />
              <div className="mt-4 flex gap-3">
                <button type="button" onClick={confirmSelection} className="rounded-full bg-forest-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-forest-600">
                  Use this image
                </button>
                <button type="button" onClick={() => setPendingImage(null)} className="rounded-full border border-sand-300 px-5 py-2.5 text-sm font-medium text-ink-soft hover:bg-sand-100">
                  Back
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-1 border-b border-sand-300 px-5 pt-3">
              {(['search', 'library', 'upload'] as Tab[]).map((tabId) => (
                <button
                  key={tabId}
                  type="button"
                  onClick={() => setTab(tabId)}
                  className={`rounded-t-md px-4 py-2 text-sm font-medium ${tab === tabId ? 'border border-b-white bg-white text-forest-700' : 'text-ink-muted hover:text-ink'}`}
                >
                  {tabId === 'search' ? 'Search' : tabId === 'library' ? 'Library' : 'Upload'}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {tab === 'search' && (
                <div>
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <select value={provider} onChange={(event) => setProvider(event.target.value as MediaProvider)} className="rounded-md border border-sand-300 px-3 py-2 text-sm">
                      {PROVIDERS.map((entry) => (
                        <option key={entry.id} value={entry.id}>{entry.label}</option>
                      ))}
                    </select>
                    <label htmlFor={searchInputId} className="sr-only">Search images</label>
                    <input
                      id={searchInputId}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="e.g. budget planner, kitchen compost"
                      className="flex-1 rounded-md border border-sand-300 px-3.5 py-2 text-sm focus:border-forest-500 focus:outline-none"
                    />
                    <button type="submit" className="rounded-md bg-forest-700 px-4 py-2 text-sm font-medium text-white hover:bg-forest-600">
                      Search
                    </button>
                  </form>

                  {providerAvailability && !providerAvailability[provider] && (
                    <p className="mt-3 rounded-md bg-gold-100 px-4 py-3 text-sm text-forest-800">
                      {PROVIDERS.find((p) => p.id === provider)?.label} isn&apos;t set up yet. Add its API key to your environment variables (see .env.example) to search this provider.
                    </p>
                  )}
                  {searchStatus === 'error' && <p className="mt-3 text-sm text-earth-700">{searchError}</p>}

                  <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {searchResults.map((result) => (
                      <button
                        key={result.sourceId}
                        type="button"
                        onClick={() => chooseSearchResult(result)}
                        className="group relative aspect-square overflow-hidden rounded-md bg-sand-100"
                      >
                        <Image src={result.thumbUrl} alt="" fill sizes="150px" className="object-cover transition-transform group-hover:scale-105" unoptimized />
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-sand-200 pt-4">
                    <label htmlFor={manualUrlId} className="block text-sm font-medium text-ink">Or paste an image URL directly</label>
                    <div className="mt-1.5 flex gap-2">
                      <input
                        id={manualUrlId}
                        value={manualUrl}
                        onChange={(event) => setManualUrl(event.target.value)}
                        placeholder="https://…"
                        className="flex-1 rounded-md border border-sand-300 px-3.5 py-2 text-sm focus:border-forest-500 focus:outline-none"
                      />
                      <button type="button" onClick={chooseManualUrl} className="rounded-md border border-sand-300 px-4 py-2 text-sm font-medium text-ink-soft hover:bg-sand-100">
                        Use URL
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'library' && (
                <div>
                  {libraryLoading && <p className="text-sm text-ink-muted">Loading…</p>}
                  {libraryItems.length === 0 && !libraryLoading && (
                    <p className="text-sm text-ink-muted">No images saved yet. Anything you search, upload, or paste a URL for will show up here for reuse.</p>
                  )}
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {libraryItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => chooseLibraryItem(item)}
                        className="group relative aspect-square overflow-hidden rounded-md bg-sand-100"
                      >
                        <Image src={item.url} alt="" fill sizes="150px" className="object-cover transition-transform group-hover:scale-105" unoptimized />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'upload' && (
                <div className="text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    capture="environment"
                    onChange={handleUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadStatus === 'uploading'}
                    className="rounded-full bg-forest-700 px-6 py-3 text-sm font-medium text-white hover:bg-forest-600 disabled:opacity-60"
                  >
                    {uploadStatus === 'uploading' ? 'Uploading…' : 'Choose a photo'}
                  </button>
                  <p className="mt-2 text-xs text-ink-muted">JPEG, PNG, WebP, or GIF, up to 4MB. On a phone this opens your camera or photo library.</p>
                  {uploadError && <p className="mt-3 text-sm text-earth-700">{uploadError}</p>}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
