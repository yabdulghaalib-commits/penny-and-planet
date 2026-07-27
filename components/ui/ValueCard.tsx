interface ValueCardProps {
  title: string;
  description: string;
}

export function ValueCard({ title, description }: ValueCardProps) {
  return (
    <div className="rounded-lg border border-sand-300 bg-white p-6">
      <h3 className="font-display text-lg text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
    </div>
  );
}
