import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { useTheme } from '@/components/theme/ThemeProvider';
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
  const { resolvedTheme } = useTheme();
  const primaryClass =
    resolvedTheme === 'light'
      ? 'border border-[#0d9488]/30 bg-[#fbfffe] text-slate-950 shadow-[0_12px_28px_rgba(13,148,136,0.12)] hover:border-[#0d9488]/42 hover:bg-[#dffaf4]'
      : 'border border-[#0d9488]/22 bg-white text-slate-950 shadow-[0_12px_32px_rgba(13,148,136,0.14)] hover:border-[#0d9488]/34 hover:bg-[#ccfbf1]';
  const secondaryClass =
    resolvedTheme === 'light'
      ? 'border border-[#0d9488]/28 bg-[#0d9488]/12 text-[#0f766e] shadow-[0_10px_24px_rgba(13,148,136,0.08)] hover:border-[#0d9488]/40 hover:bg-[#0d9488]/18'
      : 'border border-[#0d9488]/24 bg-[#0d9488]/10 text-teal-100 hover:border-[#0d9488]/36 hover:bg-[#0d9488]/16';

  return (
    <a
      className={cn(
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300',
        variant === 'primary' ? primaryClass : secondaryClass,
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
