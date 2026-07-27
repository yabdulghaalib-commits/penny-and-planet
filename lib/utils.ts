type ClassValue = string | number | null | boolean | undefined;

/**
 * Lightweight class-name combiner. Keeps components dependency-free while
 * still letting us conditionally compose Tailwind classes cleanly.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
