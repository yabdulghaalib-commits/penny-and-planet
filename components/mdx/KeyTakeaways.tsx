interface KeyTakeawaysProps {
  title?: string;
  items: string[];
}

/** Usage in MDX: <KeyTakeaways items={["First point", "Second point"]} /> */
export function KeyTakeaways({ title = 'Key Takeaways', items }: KeyTakeawaysProps) {
  return (
    <div className="not-prose my-8 rounded-lg border border-forest-200 bg-forest-50 p-6">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 20 20" className="h-5 w-5 text-forest-600" fill="none" aria-hidden="true">
          <path d="M10 2 3 6v5c0 4 3 6.5 7 7 4-.5 7-3 7-7V6l-7-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="m7.5 10 1.8 1.8L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="font-display text-lg text-ink">{title}</p>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
