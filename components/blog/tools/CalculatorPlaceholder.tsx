const CALCULATOR_LABELS = {
  budget: 'Budget Calculator',
  savings: 'Savings Calculator',
  investment: 'Investment Calculator',
  'carbon-footprint': 'Carbon Footprint Calculator',
  'cost-comparison': 'Cost Comparison Tool',
} as const;

type CalculatorType = keyof typeof CALCULATOR_LABELS;

interface CalculatorPlaceholderProps {
  type: CalculatorType;
  description?: string;
}

/**
 * Reserved slot for a future interactive tool. Usage in MDX:
 * <Calculator type="budget" description="See how a 50/30/20 split fits your income." />
 * Intentionally inert — the button is disabled — until the real tool ships.
 */
export function CalculatorPlaceholder({ type, description }: CalculatorPlaceholderProps) {
  return (
    <div className="not-prose my-8 rounded-lg border border-dashed border-sand-400 bg-sand-100 p-6 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-white text-forest-600 ring-1 ring-sand-300">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 7h8M8 11h2m3 0h2M8 15h2m3 0h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <p className="mt-3 font-display text-base text-ink">{CALCULATOR_LABELS[type]}</p>
      <p className="mt-1 text-sm text-ink-muted">
        {description ?? "We're building an interactive version of this tool. Check back soon."}
      </p>
      <button
        type="button"
        disabled
        aria-disabled="true"
        className="mt-4 inline-flex cursor-not-allowed items-center gap-1.5 rounded-full bg-sand-300 px-4 py-2 text-sm font-medium text-ink-muted"
      >
        Coming soon
      </button>
    </div>
  );
}
