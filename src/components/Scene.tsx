import { Canvas } from "@react-three/fiber";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { useMemo } from "react";
import * as THREE from "three";
import GPGPUParticles from "./GPGPUParticles";

interface SceneProps {
  chaos: number;
  noiseStrength: number;
  noiseFrequency: number;
  returnSpeed: number;
  baseSize: number;
  interactionRadius: number;
  mouseStrength: number;
  amberColor: string;
  goldColor: string;
  standoutColor: string;
  resetSignal: number;
  scrollProgress: number;
}

function smoothStep(progress: number) {
  return progress * progress * (3 - 2 * progress);
}

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const startPosition = useMemo(() => new THREE.Vector3(0.16, 0.72, 2.35), []);
  const endPosition = useMemo(() => new THREE.Vector3(-0.82, 2.1, 7.35), []);
  const startTarget = useMemo(() => new THREE.Vector3(0, 0.72, -1.38), []);
  const endTarget = useMemo(() => new THREE.Vector3(0, 0.32, -3.12), []);
  const position = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const revealProgress = smoothStep(Math.min(1, scrollProgress * 1.08));
    const orbit = Math.sin(revealProgress * Math.PI) * 0.34;

    position.lerpVectors(startPosition, endPosition, revealProgress);
    position.x += orbit;
    target.lerpVectors(startTarget, endTarget, revealProgress);

    camera.position.lerp(position, 0.075);
    camera.lookAt(target);
  });

  return null;
}

export default function Scene({
  chaos,
  noiseStrength,
  noiseFrequency,
  returnSpeed,
  baseSize,
  interactionRadius,
  mouseStrength,
  amberColor,
  goldColor,
  standoutColor,
  resetSignal,
  scrollProgress
}: SceneProps) {
  return (
    <div id="canvas-container" className="w-full h-full relative" style={{ background: "#050508" }}>
      <Canvas
        camera={{ position: [0.16, 0.72, 2.35], fov: 48, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          logarithmicDepthBuffer: false,
        }}
      >
        {/* Subtle Ambient Scene environment (mostly pitch black void as requested) */}
        <color attach="background" args={["#030305"]} />
        <ambientLight intensity={0.02} />

        {/* 1. Orchestrated Particle Crowd */}
        <GPGPUParticles
          chaos={chaos}
          noiseStrength={noiseStrength}
          noiseFrequency={noiseFrequency}
          returnSpeed={returnSpeed}
          baseSize={baseSize}
          interactionRadius={interactionRadius}
          mouseStrength={mouseStrength}
          amberColor={amberColor}
          goldColor={goldColor}
          standoutColor={standoutColor}
          resetSignal={resetSignal}
        />

        <CameraRig scrollProgress={scrollProgress} />

        {/* 3. Epic Lusion bloom glow setup */}
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={0.2} // Threshold to ensure background is slate-black
            luminanceSmoothing={0.9}
            intensity={0.75}
          />
          <Noise opacity={0.012} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
