import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#b7ff5c";
const GRAY = "#55555c";

type FloaterSpec = {
  kind: "gamepad" | "keyboard" | "text";
  text?: string;
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  parallax: number;
};

const FLOATERS: FloaterSpec[] = [
  { kind: "gamepad", position: [4.6, 1.4, -5], scale: 1.1, color: ACCENT, speed: 0.2, parallax: 1.1 },
  { kind: "keyboard", position: [-4.6, -1.6, -6], scale: 0.95, color: GRAY, speed: 0.14, parallax: 0.8 },
  { kind: "text", text: "C++", position: [-3.6, 2.2, -6], scale: 1, color: ACCENT, speed: 0.5, parallax: 1.5 },
  { kind: "text", text: "TypeScript", position: [3.2, -2.6, -7], scale: 0.8, color: GRAY, speed: 0.35, parallax: 0.9 },
  { kind: "text", text: "{ }", position: [0.4, 3.2, -8], scale: 1.2, color: GRAY, speed: 0.6, parallax: 1.7 },
  { kind: "text", text: "</>", position: [-5.6, 0.8, -9], scale: 1.1, color: GRAY, speed: 0.4, parallax: 0.6 },
  { kind: "text", text: "#include <game>", position: [5.4, -0.6, -9], scale: 0.7, color: GRAY, speed: 0.3, parallax: 1.3 },
  { kind: "text", text: "Python", position: [-2.4, -3.4, -7], scale: 0.75, color: GRAY, speed: 0.45, parallax: 1.0 },
  { kind: "text", text: "UE5", position: [2.2, 2.9, -6.5], scale: 0.9, color: ACCENT, speed: 0.55, parallax: 1.4 },
  { kind: "text", text: "if (win) dance();", position: [-0.8, -4.2, -8], scale: 0.65, color: GRAY, speed: 0.38, parallax: 1.6 },
];

function WireMat({ color, opacity = 0.4 }: { color: string; opacity?: number }) {
  return <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />;
}

function Gamepad({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[2.1, 0.95, 0.35]} />
        <WireMat color={color} />
      </mesh>
      <mesh position={[-1.0, -0.42, 0]} rotation={[0, 0, 0.45]}>
        <boxGeometry args={[0.55, 0.95, 0.35]} />
        <WireMat color={color} />
      </mesh>
      <mesh position={[1.0, -0.42, 0]} rotation={[0, 0, -0.45]}>
        <boxGeometry args={[0.55, 0.95, 0.35]} />
        <WireMat color={color} />
      </mesh>
      {/* d-pad */}
      <mesh position={[-0.55, 0.08, 0.22]}>
        <boxGeometry args={[0.48, 0.15, 0.08]} />
        <WireMat color={color} opacity={0.55} />
      </mesh>
      <mesh position={[-0.55, 0.08, 0.22]}>
        <boxGeometry args={[0.15, 0.48, 0.08]} />
        <WireMat color={color} opacity={0.55} />
      </mesh>
      {/* ABXY buttons */}
      {[
        [0.55, 0.26],
        [0.55, -0.1],
        [0.37, 0.08],
        [0.73, 0.08],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.08, 10]} />
          <WireMat color={color} opacity={0.55} />
        </mesh>
      ))}
      {/* sticks */}
      {[-0.2, 0.2].map((x, i) => (
        <group key={i} position={[x, -0.18, 0.22]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.14, 10]} />
            <WireMat color={color} opacity={0.55} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <sphereGeometry args={[0.09, 8, 6]} />
            <WireMat color={color} opacity={0.55} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Keyboard({ color }: { color: string }) {
  const keys = useMemo(() => {
    const out: [number, number][] = [];
    for (let row = 0; row < 4; row++) {
      const cols = row === 3 ? 6 : 10;
      for (let col = 0; col < cols; col++) {
        const width = row === 3 && col === 2 ? 3 : 1;
        out.push([-1.35 + col * 0.3 + (width > 1 ? 0.3 : 0), -0.45 + row * 0.3]);
      }
    }
    return out;
  }, []);

  return (
    <group rotation={[0.5, 0, 0]}>
      <mesh>
        <boxGeometry args={[3.2, 0.12, 1.4]} />
        <WireMat color={color} />
      </mesh>
      {keys.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.1, z]}>
          <boxGeometry args={[0.22, 0.08, 0.22]} />
          <WireMat color={color} opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Floater({ spec, scroll, mouse }: {
  spec: FloaterSpec;
  scroll: React.RefObject<number>;
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const group = ref.current;
    if (!group) return;

    const t = state.clock.elapsedTime;

    if (spec.kind === "text") {
      // gentle sway so the text stays readable
      group.rotation.y = Math.sin(t * spec.speed) * 0.45;
      group.rotation.x = Math.sin(t * spec.speed * 0.6) * 0.15;
    } else {
      group.rotation.x = t * spec.speed * 0.6;
      group.rotation.y = t * spec.speed;
    }

    const bobbing = Math.sin(t * spec.speed * 1.6 + spec.position[0]) * 0.3;
    const scrollOffset = (scroll.current ?? 0) * spec.parallax * 4;
    group.position.y = spec.position[1] + bobbing + scrollOffset;

    const m = mouse.current ?? { x: 0, y: 0 };
    group.position.x = THREE.MathUtils.lerp(
      group.position.x,
      spec.position[0] + m.x * spec.parallax * 0.4,
      0.05,
    );
  });

  return (
    <group ref={ref} position={spec.position} scale={spec.scale}>
      {spec.kind === "gamepad" && <Gamepad color={spec.color} />}
      {spec.kind === "keyboard" && <Keyboard color={spec.color} />}
      {spec.kind === "text" && (
        <Text
          fontSize={0.6}
          color={spec.color}
          anchorX="center"
          anchorY="middle"
          fillOpacity={spec.color === ACCENT ? 0.55 : 0.4}
        >
          {spec.text}
        </Text>
      )}
    </group>
  );
}

function Particles({ scroll }: { scroll: React.RefObject<number> }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 350;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 2] = -4 - Math.random() * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const points = ref.current;
    if (!points) return;
    points.rotation.y = state.clock.elapsedTime * 0.012;
    points.position.y = (scroll.current ?? 0) * 2.5;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8a8a8e" size={0.02} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Rig({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  useFrame((state) => {
    const m = mouse.current ?? { x: 0, y: 0 };
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, m.x * 0.5, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -m.y * 0.3, 0.04);
    state.camera.lookAt(0, 0, -6);
  });
  return null;
}

export default function Background3D() {
  const scroll = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  // lighter scene on small/touch screens: fewer objects, lower resolution
  const isMobile = useMemo(
    () => window.matchMedia("(max-width: 768px), (pointer: coarse)").matches,
    [],
  );
  const floaters = isMobile ? FLOATERS.slice(0, 5) : FLOATERS;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        // dim + soften so foreground text stays readable
        opacity: 0.55,
        filter: "blur(2.5px)",
      }}
      aria-hidden
    >
      <Canvas
        dpr={isMobile ? [0.75, 1] : [1, 1.5]}
        camera={{ position: [0, 0, 2], fov: 60 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);

          const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            scroll.current = max > 0 ? window.scrollY / max : 0;
          };
          const onMove = (e: PointerEvent) => {
            mouse.current = {
              x: (e.clientX / window.innerWidth) * 2 - 1,
              y: (e.clientY / window.innerHeight) * 2 - 1,
            };
          };
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("pointermove", onMove, { passive: true });
          onScroll();
        }}
      >
        <Rig mouse={mouse} />
        {floaters.map((spec, i) => (
          <Floater key={i} spec={spec} scroll={scroll} mouse={mouse} />
        ))}
        <Particles scroll={scroll} />
      </Canvas>
    </div>
  );
}
