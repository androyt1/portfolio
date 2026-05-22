import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('container-shell', className)} {...props} />;
}
