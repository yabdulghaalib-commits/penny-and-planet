interface AdSlotProps {
  position?: 'in-article' | 'sidebar';
  /** Network-specific ad unit id, once one is configured (AdSense slot id, Mediavine/Raptive placement id, etc.). Unused until a network is wired up. */
  adUnitId?: string;
}

/**
 * Reserved for future display advertising. Usage in MDX: <Ad position="in-article" />
 *
 * Integration note: this renders a static placeholder today. Wiring up a
 * real network later (Google AdSense, Mediavine, or Raptive) means
 * replacing the placeholder markup below with that network's script/slot
 * tag — this component is the only place that needs to change; every page
 * and article that already uses <Ad /> or <Sidebar /> picks up the change
 * automatically. `adUnitId` is threaded through now so that swap doesn't
 * require touching call sites either.
 */
export function AdSlot({ position = 'in-article', adUnitId }: AdSlotProps) {
  return (
    <div
      className="not-prose my-8 flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-sand-400 bg-sand-100 py-10 text-center"
      aria-label="Advertisement placeholder"
      data-ad-position={position}
      data-ad-unit-id={adUnitId}
    >
      <span className="font-mono text-eyebrow uppercase tracking-widest text-ink-muted">Advertisement</span>
      <span className="text-xs text-ink-muted">{position === 'sidebar' ? 'Sidebar placement' : 'In-article placement'}</span>
    </div>
  );
}
