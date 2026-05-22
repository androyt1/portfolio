import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';

import type { SketchfabApi, SketchfabCamera } from '@/types/sketchfab';

const SCRIPT_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';

function normalize(vector: number[]) {
  const length = Math.hypot(...vector) || 1;
  return vector.map((value) => value / length);
}

function cross(a: number[], b: number[]) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function buildStates(camera: SketchfabCamera) {
  const vector = camera.position.map((value, index) => value - camera.target[index]);
  const forward = normalize(vector);
  const side = normalize(cross(forward, [0, 1, 0]));
  const lift = [0, 1, 0];
  const distance = Math.hypot(...vector) || 2.8;

  const makeState = (
    forwardScale: number,
    sideScale: number,
    liftScale: number,
    targetOffset: [number, number, number],
  ) => {
    const target = camera.target.map(
      (value, index) => value + targetOffset[index] * distance,
    );

    const position = target.map(
      (value, index) =>
        value +
        forward[index] * distance * forwardScale +
        side[index] * distance * sideScale +
        lift[index] * distance * liftScale,
    );

    return { position, target };
  };

  return [
    makeState(1.02, -0.05, 0.04, [0, 0, 0]),
    makeState(0.88, 0.18, 0.09, [0.015, 0.012, 0]),
    makeState(1.12, -0.12, -0.01, [-0.02, 0.02, 0.01]),
    makeState(0.94, 0, 0.12, [0, 0.02, 0]),
  ];
}

function loadScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.Sketchfab) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_URL}"]`,
    );

    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Failed to load Sketchfab')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Sketchfab'));
    document.body.appendChild(script);
  });
}

export interface SketchfabViewerHandle {
  ready: boolean;
  transitionToState: (index: number) => void;
}

interface SketchfabViewerProps {
  title: string;
  uid: string;
}

export const SketchfabViewer = forwardRef<
  SketchfabViewerHandle,
  SketchfabViewerProps
>(function SketchfabViewer({ title, uid }, ref) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const apiRef = useRef<SketchfabApi | null>(null);
  const statesRef = useRef<ReturnType<typeof buildStates>>([]);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      ready,
      transitionToState: (index: number) => {
        if (!ready || !apiRef.current || statesRef.current.length === 0) {
          return;
        }

        const state = statesRef.current[index % statesRef.current.length];
        apiRef.current.setCameraLookAt(state.position, state.target, 1.65);
      },
    }),
    [ready],
  );

  useEffect(() => {
    let cancelled = false;

    loadScript()
      .then(() => {
        if (!iframeRef.current || !window.Sketchfab || cancelled) {
          return;
        }

        const client = new window.Sketchfab('1.12.1', iframeRef.current);
        client.init(uid, {
          annotation_visible: 0,
          autospin: 0.1,
          autostart: 1,
          camera: 0,
          dnt: 1,
          preload: 1,
          transparent: 1,
          ui_controls: 0,
          ui_hint: 0,
          ui_infos: 0,
          ui_settings: 0,
          ui_stop: 0,
          ui_watermark: 0,
          ui_watermark_link: 0,
          success: (api: SketchfabApi) => {
            apiRef.current = api;
            api.start();

            api.addEventListener('modelLoadProgress', (factor: number) => {
              setProgress((current) => Math.max(current, factor * 70));
            });

            api.addEventListener('textureLoadProgress', (factor: number) => {
              setProgress((current) => Math.max(current, 70 + factor * 25));
            });

            api.addEventListener('viewerready', () => {
              api.setBackground({ transparent: true });
              api.setCameraEasing('easeInOutCubic');
              api.setFov(33);
              api.setUserInteraction(false);
              api.getCameraLookAt((error, camera) => {
                if (error) {
                  setProgress(100);
                  setReady(true);
                  return;
                }

                statesRef.current = buildStates(camera);
                setProgress(100);
                setReady(true);
              });
            });
          },
        });
      })
      .catch(() => {
        setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [uid]);

  return (
    <div className="absolute inset-0">
      <iframe
        allow="autoplay; fullscreen; xr-spatial-tracking"
        className="h-full w-full"
        ref={iframeRef}
        title={title}
      />
      {!ready ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm"
          exit={{ opacity: 0 }}
        >
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-white/55">
              Calibrating 3D scene
            </p>
            <p className="mt-2 text-sm text-white/70">
              {Math.round(progress).toString().padStart(2, '0')}%
            </p>
          </div>
          <div className="h-px w-32 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-100 via-white to-cyan-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      ) : null}
    </div>
  );
});
