import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface SectionShellProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function SectionShell({
  children,
  className,
  ...props
}: SectionShellProps) {
  return (
    <section
      className={cn('relative py-16 sm:py-20 lg:py-24', className)}
      {...props}
    >
      {children}
    </section>
  );
}
