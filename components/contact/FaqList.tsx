interface FaqItem {
  question: string;
  answer: string;
}

interface FaqListProps {
  items: FaqItem[];
}

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="divide-y divide-sand-300 rounded-lg border border-sand-300 bg-white">
      {items.map((item) => (
        <details key={item.question} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base text-ink marker:content-none">
            {item.question}
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 shrink-0 text-forest-600 transition-transform duration-300 ease-editorial group-open:rotate-45"
              fill="none"
              aria-hidden="true"
            >
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
