import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { useMagnetic } from '@/hooks/use-magnetic';
import { cn } from '@/lib/cn';

interface MagneticButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function MagneticButton({
  children,
  className,
  icon,
  variant = 'primary',
  ...props
}: MagneticButtonProps) {
  const { onPointerLeave, onPointerMove, ref } = useMagnetic<HTMLAnchorElement>();

  return (
    <a
      className={cn(
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300',
        variant === 'primary'
          ? 'bg-white text-slate-950 hover:bg-cyan-100'
          : 'border border-white/12 bg-white/5 text-white hover:bg-white/10',
        className,
      )}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      ref={ref}
      {...props}
    >
      {children}
      {icon}
    </a>
  );
}
