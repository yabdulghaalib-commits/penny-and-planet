interface ActionStepsProps {
  title?: string;
  steps: string[];
}

/** Usage in MDX: <ActionSteps steps={["Create a budget", "Start an emergency fund"]} /> */
export function ActionSteps({ title = 'Action Steps', steps }: ActionStepsProps) {
  return (
    <div className="not-prose my-8 rounded-lg border-l-4 border-earth-400 bg-earth-50 p-6">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 20 20" className="h-5 w-5 text-earth-600" fill="none" aria-hidden="true">
          <path d="M4 10h8M4 10l3-3M4 10l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 5h3v10h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <p className="font-display text-lg text-ink">{title}</p>
      </div>
      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-earth-500 font-mono text-xs font-semibold text-white">
              {index + 1}
            </span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
