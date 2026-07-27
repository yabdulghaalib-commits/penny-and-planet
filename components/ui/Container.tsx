import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Centralized max-width + gutter wrapper. Every section on the site should
 * be wrapped in this rather than redeclaring max-width/padding, so global
 * layout adjustments only ever need to happen here.
 */
export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10', className)}>{children}</Tag>;
}
