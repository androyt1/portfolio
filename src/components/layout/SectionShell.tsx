import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface SectionShellProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function SectionShell({
  children,
  className,
  style,
  ...props
}: SectionShellProps) {
  return (
    <section
      className={cn('relative scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-20 lg:scroll-mt-32 lg:py-24', className)}
      style={{
        containIntrinsicSize: '1px 960px',
        contentVisibility: 'auto',
        ...style,
      }}
      {...props}
    >
      {children}
    </section>
  );
}
