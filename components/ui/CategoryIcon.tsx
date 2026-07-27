import type { CategorySlug } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CategoryIconProps {
  slug: CategorySlug;
  className?: string;
}

/**
 * Hand-drawn-feeling line icons, one per content category. All share the
 * same stroke weight and rounded caps as the SignatureGraphic so the icon
 * set reads as one family rather than a mixed icon library.
 */
export function CategoryIcon({ slug, className }: CategoryIconProps) {
  const props = {
    viewBox: '0 0 32 32',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: cn('h-6 w-6', className),
    'aria-hidden': true as const,
  };

  switch (slug) {
    case 'personal-finance':
      return (
        <svg {...props}>
          <rect x="5" y="9" width="22" height="15" rx="2.5" />
          <path d="M5 14h22" />
          <circle cx="16" cy="19" r="2.5" />
        </svg>
      );
    case 'budgeting':
      return (
        <svg {...props}>
          <path d="M16 5v11l8 5" />
          <circle cx="16" cy="16" r="11" />
        </svg>
      );
    case 'saving-money':
      return (
        <svg {...props}>
          <circle cx="12" cy="14" r="6" />
          <circle cx="20" cy="18" r="6" />
          <path d="M12 11v-1M20 15v-1" />
        </svg>
      );
    case 'investing':
      return (
        <svg {...props}>
          <path d="M6 24V16M14 24V10M22 24V14M26 6l-8 8-4-4-8 8" />
          <path d="M20 6h6v6" />
        </svg>
      );
    case 'debt-management':
      return (
        <svg {...props}>
          <rect x="7" y="9" width="10" height="7" rx="3.5" />
          <rect x="15" y="16" width="10" height="7" rx="3.5" />
        </svg>
      );
    case 'sustainable-living':
      return (
        <svg {...props}>
          <path d="M8 24c0-10 6-16 16-16-1 10-6 16-16 16Z" />
          <path d="M8 24c4-6 8-9 14-11" />
        </svg>
      );
    case 'eco-friendly-living':
      return (
        <svg {...props}>
          <path d="M16 26c-5-3-8-7-8-12a8 8 0 0 1 16 0c0 5-3 9-8 12Z" />
          <path d="M16 14v12" />
        </svg>
      );
    case 'frugal-living':
      return (
        <svg {...props}>
          <rect x="5" y="10" width="22" height="14" rx="2" />
          <path d="M5 14h22" />
          <circle cx="22" cy="19" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'green-home':
      return (
        <svg {...props}>
          <path d="M6 16 16 7l10 9" />
          <path d="M9 14v11h14V14" />
          <path d="M16 25v-6c0-2 1-3 3-3" />
        </svg>
      );
    case 'minimalism':
      return (
        <svg {...props}>
          <circle cx="16" cy="16" r="9" />
          <path d="M16 16h6" />
        </svg>
      );
    case 'sustainable-food':
      return (
        <svg {...props}>
          <path d="M6 15a10 10 0 0 0 20 0Z" />
          <path d="M6 15h20" />
          <path d="M16 15V9c0-2 1-3 3-3" />
        </svg>
      );
    case 'ethical-shopping':
      return (
        <svg {...props}>
          <path d="M8 12h16l-1.5 13a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2Z" />
          <path d="M12 12v-2a4 4 0 0 1 8 0v2" />
        </svg>
      );
    case 'financial-independence':
      return (
        <svg {...props}>
          <circle cx="16" cy="16" r="10" />
          <path d="M16 11l2.5 4.5L21 17l-3 1-1 3.5-1-3.5-3-1 2.5-1.5Z" />
        </svg>
      );
    default:
      return null;
  }
}
