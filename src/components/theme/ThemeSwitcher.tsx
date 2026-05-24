import { LaptopMinimal, Moon, Sun } from 'lucide-react';

import {
  useTheme,
  type ThemePreference,
} from '@/components/theme/ThemeProvider';
import { cn } from '@/lib/cn';

const themeOptions: Array<{
  icon: typeof LaptopMinimal;
  label: string;
  value: ThemePreference;
}> = [
  { icon: LaptopMinimal, label: 'System', value: 'system' },
  { icon: Sun, label: 'Light', value: 'light' },
  { icon: Moon, label: 'Dark', value: 'dark' },
];

interface ThemeSwitcherProps {
  className?: string;
  showLabels?: boolean;
}

export function ThemeSwitcher({
  className,
  showLabels = false,
}: ThemeSwitcherProps) {
  const { resolvedTheme, setThemePreference, themePreference } = useTheme();

  return (
    <div
      aria-label="Theme switcher"
      className={cn(
        'surface inline-flex items-center gap-1 rounded-full p-1',
        showLabels ? 'w-full justify-between' : '',
        className,
      )}
      role="group"
    >
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const isActive = themePreference === option.value;
        const isSystemActive = option.value === 'system' && themePreference === 'system';

        return (
          <button
            aria-label={`${option.label} theme`}
            aria-pressed={isActive}
            className={cn(
              'inline-flex h-10 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium transition',
              showLabels ? 'flex-1' : 'w-10 px-0',
              isActive
                ? 'border border-[#0d9488]/26 bg-[#0d9488] text-white shadow-[0_10px_24px_rgba(13,148,136,0.2)]'
                : 'text-[color:var(--muted)] hover:bg-white/10 hover:text-[color:var(--text)]',
            )}
            key={option.value}
            onClick={() => setThemePreference(option.value)}
            title={
              option.value === 'system'
                ? `System theme (${resolvedTheme})`
                : option.label
            }
            type="button"
          >
            <Icon className="h-4 w-4" />
            {showLabels ? <span>{option.label}</span> : null}
            {isSystemActive && showLabels ? (
              <span className="sr-only">{`Currently following ${resolvedTheme}`}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
