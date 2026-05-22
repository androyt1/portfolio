export interface SketchfabCamera {
  position: [number, number, number];
  target: [number, number, number];
}

export interface SketchfabApi {
  addEventListener: (event: string, callback: (...args: any[]) => void) => void;
  getCameraLookAt: (
    callback: (error: unknown, camera: SketchfabCamera) => void,
  ) => void;
  setBackground: (
    options: { transparent?: boolean },
    callback?: (error: unknown) => void,
  ) => void;
  setCameraEasing: (easing: string, callback?: (error: unknown) => void) => void;
  setCameraLookAt: (
    position: number[],
    target: number[],
    duration?: number,
    callback?: (error: unknown) => void,
  ) => void;
  setFov: (angle: number, callback?: (error: unknown) => void) => void;
  setUserInteraction: (
    enabled: boolean,
    callback?: (error: unknown) => void,
  ) => void;
  start: () => void;
}

export interface SketchfabClient {
  init: (
    uid: string,
    options: Record<string, unknown>,
  ) => void;
}

export interface SketchfabConstructor {
  new (version: string, iframe: HTMLIFrameElement): SketchfabClient;
}

declare global {
  interface Window {
    Sketchfab?: SketchfabConstructor;
  }
}
