'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from 'tiptap-markdown';
import { useEffect, useRef, useState } from 'react';
import { EditableImage } from '@/components/admin/editor/EditableImage';
import { EditorToolbar } from '@/components/admin/editor/EditorToolbar';
import { MediaLibraryModal, type PickedImage } from '@/components/admin/editor/MediaLibraryModal';

interface ArticleContentEditorProps {
  value: string;
  onChange: (markdown: string) => void;
  /** Rich Text is the safe default for a new, empty article. An article that already has content starts in Raw mode — see the in-file note below for why. */
  initialMode?: 'rich' | 'raw';
}

/** MDX shortcodes (Callout, PullQuote, YouTubeEmbed, etc.) all start with an uppercase letter, unlike plain HTML tags — used to detect them and warn before switching an existing article into Rich Text mode. */
const MDX_SHORTCODE_PATTERN = /<[A-Z][A-Za-z]*[\s/>]/;

export function ArticleContentEditor({ value, onChange, initialMode }: ArticleContentEditorProps) {
  const [mode, setMode] = useState<'rich' | 'raw'>(initialMode ?? (value.trim() ? 'raw' : 'rich'));
  const [rawValue, setRawValue] = useState(value);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [docxStatus, setDocxStatus] = useState<'idle' | 'importing' | 'error'>('idle');
  const [docxError, setDocxError] = useState('');
  const docxInputRef = useRef<HTMLInputElement>(null);
  const hasShortcodes = MDX_SHORTCODE_PATTERN.test(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, autolink: true }),
      EditableImage,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder: 'Start writing…' }),
      Markdown.configure({ html: true, tightLists: true, bulletListMarker: '-', linkify: false }),
    ],
    content: rawValue,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: 'prose-editorial max-w-none min-h-[24rem] px-4 py-3 focus:outline-none' },
    },
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.getMarkdown();
      onChange(markdown);
    },
  });

  // Keep the raw textarea and the Tiptap doc in sync only when switching modes, not on every keystroke — avoids fighting cursor position in either editor.
  function switchToRaw() {
    if (editor) setRawValue(editor.storage.markdown.getMarkdown());
    setMode('raw');
  }

  function switchToRich() {
    editor?.commands.setContent(rawValue);
    setMode('rich');
  }

  function handleRawChange(next: string) {
    setRawValue(next);
    onChange(next);
  }

  function insertImage(image: PickedImage) {
    editor?.chain().focus().setImage({ src: image.url, alt: image.alt }).run();
  }

  async function handleDocxImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setDocxStatus('importing');
    setDocxError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/import/docx', { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) {
        setDocxError(data.error || 'Could not import this document.');
        setDocxStatus('idle');
        return;
      }
      setRawValue(data.markdown);
      onChange(data.markdown);
      setMode('rich');
      editor?.commands.setContent(data.markdown);
      setDocxStatus('idle');
    } catch {
      setDocxError('Could not import this document. Please try again.');
      setDocxStatus('idle');
    } finally {
      if (docxInputRef.current) docxInputRef.current.value = '';
    }
  }

  return (
    <div className="rounded-md border border-sand-300 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-300 px-3 py-2">
        <div className="flex overflow-hidden rounded-full border border-sand-300 text-xs font-medium">
          <button
            type="button"
            onClick={switchToRich}
            className={`px-3 py-1.5 ${mode === 'rich' ? 'bg-forest-700 text-white' : 'text-ink-soft hover:bg-sand-100'}`}
          >
            Rich Text
          </button>
          <button
            type="button"
            onClick={switchToRaw}
            className={`px-3 py-1.5 ${mode === 'raw' ? 'bg-forest-700 text-white' : 'text-ink-soft hover:bg-sand-100'}`}
          >
            Raw Markdown
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input ref={docxInputRef} type="file" accept=".docx" onChange={handleDocxImport} className="hidden" />
          <button
            type="button"
            onClick={() => docxInputRef.current?.click()}
            disabled={docxStatus === 'importing'}
            className="rounded-full border border-sand-300 px-3 py-1.5 text-xs font-medium text-ink-soft hover:bg-sand-100 disabled:opacity-60"
          >
            {docxStatus === 'importing' ? 'Importing…' : 'Import from Word (.docx)'}
          </button>
        </div>
      </div>

      {docxError && <p className="border-b border-sand-300 bg-earth-50 px-4 py-2 text-xs text-earth-700">{docxError}</p>}

      {mode === 'rich' && hasShortcodes && (
        <p className="border-b border-sand-300 bg-gold-100 px-4 py-2 text-xs text-forest-800">
          This article contains custom formatting blocks (like <code>&lt;Callout&gt;</code>) that Rich Text mode doesn&apos;t
          display specially. They may not round-trip perfectly. Raw Markdown mode is the safer choice for this article.
        </p>
      )}

      {mode === 'rich' ? (
        <>
          <EditorToolbar editor={editor} onInsertImage={() => setMediaPickerOpen(true)} />
          <EditorContent editor={editor} />
        </>
      ) : (
        <textarea
          value={rawValue}
          onChange={(event) => handleRawChange(event.target.value)}
          rows={22}
          className="w-full rounded-b-md px-4 py-3 font-mono text-xs leading-relaxed text-ink focus:outline-none"
          spellCheck={false}
        />
      )}

      <MediaLibraryModal open={mediaPickerOpen} onClose={() => setMediaPickerOpen(false)} onSelect={insertImage} />
    </div>
  );
}
