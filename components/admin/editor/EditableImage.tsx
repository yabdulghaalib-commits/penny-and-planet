'use client';

import Image from '@tiptap/extension-image';
import { ReactNodeViewRenderer, NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { useState } from 'react';

function EditableImageView({ node, updateAttributes }: NodeViewProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(node.attrs.alt ?? '');

  function save() {
    updateAttributes({ alt: draft });
    setEditing(false);
  }

  return (
    <NodeViewWrapper className="not-prose group relative my-4 inline-block max-w-full">
      {/* eslint-disable-next-line @next/next/no-img-element -- editor preview only, not the public site */}
      <img src={node.attrs.src} alt={node.attrs.alt ?? ''} className="max-w-full rounded-md" />
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="absolute bottom-2 right-2 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        Edit alt text
      </button>
      {!node.attrs.alt && (
        <span className="absolute left-2 top-2 rounded-full bg-gold-400 px-2 py-0.5 text-[0.6875rem] font-medium text-forest-900">
          Missing alt text
        </span>
      )}
      {editing && (
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 rounded-b-md bg-white/95 p-2">
          <input
            autoFocus
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') save();
              if (event.key === 'Escape') setEditing(false);
            }}
            placeholder="Describe this image"
            className="flex-1 rounded border border-sand-300 px-2 py-1 text-xs"
          />
          <button type="button" onClick={save} className="rounded bg-forest-700 px-2 py-1 text-xs font-medium text-white">
            Save
          </button>
        </div>
      )}
    </NodeViewWrapper>
  );
}

export const EditableImage = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(EditableImageView);
  },
});
