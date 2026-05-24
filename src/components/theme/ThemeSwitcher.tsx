import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/theme/ThemeProvider';
import { cn } from '@/lib/cn';

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { resolvedTheme, themePreference, toggleTheme } = useTheme();
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const Icon = resolvedTheme === 'dark' ? Sun : Moon;

  return (
    <button
      aria-label={`Switch to ${nextTheme} theme`}
      className={cn(
        'surface inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--text)] transition hover:border-[#0d9488]/30 hover:bg-white/10 hover:text-[color:var(--secondary)]',
        className,
      )}
      onClick={toggleTheme}
      title={
        themePreference === 'system'
          ? `Following system theme. Switch to ${nextTheme}.`
          : `Switch to ${nextTheme} theme`
      }
      type="button"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
