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
          ? 'border border-[#0d9488]/22 bg-white text-slate-950 shadow-[0_12px_32px_rgba(13,148,136,0.14)] hover:border-[#0d9488]/34 hover:bg-[#ccfbf1]'
          : 'border border-[#0d9488]/24 bg-[#0d9488]/10 text-teal-100 hover:border-[#0d9488]/36 hover:bg-[#0d9488]/16',
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
