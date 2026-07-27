interface SourceItem {
  label: string;
  url: string;
}

interface SourcesProps {
  items: SourceItem[];
}

/** Usage in MDX: <Sources items={[{ label: "Federal Reserve, Survey of Consumer Finances", url: "https://..." }]} /> */
export function Sources({ items }: SourcesProps) {
  if (items.length === 0) return null;

  return (
    <div className="not-prose mt-10 border-t border-sand-300 pt-6">
      <p className="eyebrow">Sources &amp; References</p>
      <ol className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item.url} className="text-sm text-ink-muted">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-sand-300 underline-offset-4 hover:text-forest-600"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
