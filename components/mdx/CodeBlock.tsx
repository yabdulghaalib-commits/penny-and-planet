import type { HTMLAttributes } from 'react';

/**
 * Styles fenced code blocks (`pre > code`). Inline `code` spans are styled
 * globally via `.prose-editorial code` in globals.css instead of being
 * mapped here, since MDX applies one `code` component to both inline and
 * fenced usage and we only want the block treatment on the `pre` wrapper.
 */
export function CodeBlock(props: HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      {...props}
      className="not-prose my-6 overflow-x-auto rounded-md bg-forest-800 p-5 font-mono text-sm leading-relaxed text-sand-100"
    />
  );
}
