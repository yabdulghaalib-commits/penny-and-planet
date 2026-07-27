import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-sage-100 px-3 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-forest-700',
        className,
      )}
    >
      {children}
    </span>
  );
}
