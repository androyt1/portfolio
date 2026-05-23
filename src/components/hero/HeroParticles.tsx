import type { Engine, ISourceOptions } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

let particlesReady = false;

const heroParticleOptions: ISourceOptions = {
  background: {
    color: {
      value: "transparent",
    },
  },
  detectRetina: true,
  fpsLimit: 60,
  fullScreen: {
    enable: false,
  },
  interactivity: {
    events: {
      onClick: {
        enable: false,
      },
      onHover: {
        enable: false,
      },
      resize: true,
    },
  },
  particles: {
    color: {
      value: ["#8cd8ff", "#d7f2ff", "#7eb7ff"],
    },
    links: {
      color: "#8cd8ff",
      distance: 132,
      enable: true,
      opacity: 0.12,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out",
      },
      random: false,
      speed: 0.55,
      straight: false,
    },
    number: {
      density: {
        area: 920,
        enable: true,
      },
      value: 40,
    },
    opacity: {
      value: {
        max: 0.42,
        min: 0.16,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: {
        max: 2.8,
        min: 1.1,
      },
    },
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
};

async function initHeroParticles(engine: Engine) {
  if (particlesReady) {
    return;
  }

  await loadSlim(engine);
  particlesReady = true;
}

export function HeroParticles() {
  return (
    <Particles
      className="absolute inset-0 opacity-85"
      id="hero-particles"
      init={initHeroParticles}
      options={heroParticleOptions}
    />
  );
}
