import {
  createElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

interface DeviceSignals {
  coarsePointer: boolean;
  lowPower: boolean;
  saveData: boolean;
  smallViewport: boolean;
}

export interface DeviceProfile extends DeviceSignals {
  allowHeroMotion: boolean;
  allowPageLoader: boolean;
  allowScrollProgress: boolean;
  allowViewportMotion: boolean;
  enableSmoothScroll: boolean;
  enhancedEffects: boolean;
  reducedMotion: boolean;
}

type NavigatorHints = Navigator & {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
  deviceMemory?: number;
};

const defaultProfile: DeviceProfile = {
  allowHeroMotion: true,
  allowPageLoader: true,
  allowScrollProgress: true,
  allowViewportMotion: true,
  coarsePointer: false,
  enableSmoothScroll: true,
  enhancedEffects: true,
  lowPower: false,
  reducedMotion: false,
  saveData: false,
  smallViewport: false,
};

const DeviceProfileContext = createContext<DeviceProfile>(defaultProfile);

function readDeviceSignals(): DeviceSignals {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      coarsePointer: false,
      lowPower: false,
      saveData: false,
      smallViewport: false,
    };
  }

  const navigatorHints = navigator as NavigatorHints;
  const connection = navigatorHints.connection;
  const effectiveType = connection?.effectiveType ?? '';
  const lowBandwidth = effectiveType === 'slow-2g' || effectiveType === '2g';
  const saveData = Boolean(connection?.saveData);
  const deviceMemory = navigatorHints.deviceMemory ?? 8;
  const hardwareThreads = navigator.hardwareConcurrency ?? 8;

  return {
    coarsePointer: window.matchMedia('(pointer: coarse)').matches,
    lowPower:
      saveData || lowBandwidth || deviceMemory <= 4 || hardwareThreads <= 4,
    saveData,
    smallViewport: window.matchMedia('(max-width: 767px)').matches,
  };
}

function buildDeviceProfile(
  signals: DeviceSignals,
  reducedMotion: boolean,
): DeviceProfile {
  const constrainedDevice =
    reducedMotion || signals.lowPower || signals.coarsePointer;
  const allowEnhancedMotion = !constrainedDevice;

  return {
    ...signals,
    allowHeroMotion: allowEnhancedMotion,
    allowPageLoader:
      !reducedMotion &&
      !signals.coarsePointer &&
      !signals.lowPower &&
      !signals.smallViewport,
    allowScrollProgress: allowEnhancedMotion && !signals.smallViewport,
    allowViewportMotion: allowEnhancedMotion,
    enableSmoothScroll: allowEnhancedMotion,
    enhancedEffects:
      !signals.coarsePointer &&
      !signals.lowPower &&
      !signals.smallViewport,
    reducedMotion,
  };
}

function subscribeToMediaQuery(
  mediaQuery: MediaQueryList,
  listener: () => void,
) {
  if ('addEventListener' in mediaQuery) {
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }

  const legacyMediaQuery = mediaQuery as MediaQueryList & {
    addListener?: (callback: () => void) => void;
    removeListener?: (callback: () => void) => void;
  };

  legacyMediaQuery.addListener?.(listener);
  return () => legacyMediaQuery.removeListener?.(listener);
}

export function useDeviceProfileValue() {
  const reducedMotion = usePrefersReducedMotion();
  const [signals, setSignals] = useState<DeviceSignals>(() => readDeviceSignals());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateSignals = () => setSignals(readDeviceSignals());
    const mediaQueries = [
      window.matchMedia('(pointer: coarse)'),
      window.matchMedia('(max-width: 767px)'),
    ];

    updateSignals();

    const unsubscribers = mediaQueries.map((mediaQuery) =>
      subscribeToMediaQuery(mediaQuery, updateSignals),
    );

    window.addEventListener('resize', updateSignals, { passive: true });

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
      window.removeEventListener('resize', updateSignals);
    };
  }, []);

  return useMemo(
    () => buildDeviceProfile(signals, reducedMotion),
    [reducedMotion, signals],
  );
}

interface DeviceProfileProviderProps {
  children: ReactNode;
  value: DeviceProfile;
}

export function DeviceProfileProvider({
  children,
  value,
}: DeviceProfileProviderProps) {
  return createElement(DeviceProfileContext.Provider, { value }, children);
}

export function useDeviceProfile() {
  return useContext(DeviceProfileContext);
}
