import { Float, Sparkles } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { Group } from 'three';

interface SculptProps {
  reducedMotion: boolean;
}

function Sculpt({ reducedMotion }: SculptProps) {
  const group = useRef<Group>(null);
  const positions = useMemo(
    () => [
      [-1.1, 0.4, -0.2],
      [0.9, -0.7, 0.3],
      [1.25, 1.1, -0.6],
      [-1.4, -1.1, 0.2],
    ],
    [],
  );

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) {
      return;
    }

    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.24) * 0.08;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.6} />
      <directionalLight color="#c8f2ff" intensity={2.4} position={[2, 3, 4]} />
      <directionalLight color="#4f82ff" intensity={0.8} position={[-4, -2, -2]} />
      <Float rotationIntensity={0.35} speed={1.4}>
        <mesh rotation={[0.6, 0.8, 0]}>
          <torusKnotGeometry args={[1.55, 0.28, 160, 24]} />
          <meshPhysicalMaterial
            clearcoat={1}
            clearcoatRoughness={0.1}
            color="#b9c8e5"
            metalness={0.82}
            roughness={0.1}
          />
        </mesh>
      </Float>
      <mesh rotation={[Math.PI / 3, 0, 0]} scale={1.6}>
        <torusGeometry args={[1.45, 0.02, 32, 200]} />
        <meshBasicMaterial color="#9bd8ff" transparent opacity={0.25} />
      </mesh>
      {positions.map((position, index) => (
        <mesh key={position.join('-')} position={position as [number, number, number]}>
          <icosahedronGeometry args={[0.12 + index * 0.03, 0]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? '#d9edff' : '#8ab2ff'}
            emissive={index % 2 === 0 ? '#1b3a55' : '#0a1730'}
            roughness={0.24}
          />
        </mesh>
      ))}
      <Sparkles
        count={16}
        opacity={0.22}
        scale={[5, 4, 4]}
        size={3}
        speed={0.18}
      />
    </group>
  );
}

interface HeroCanvasProps {
  reducedMotion: boolean;
}

export function HeroCanvas({ reducedMotion }: HeroCanvasProps) {
  return (
    <Canvas
      camera={{ fov: 32, position: [0, 0, 5] }}
      className="h-full w-full"
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
    >
      <Sculpt reducedMotion={reducedMotion} />
    </Canvas>
  );
}
