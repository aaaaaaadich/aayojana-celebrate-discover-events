
import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Creates a beautiful, glossy, animated infinity sign
function InfinityMesh() {
  const mesh = useRef<THREE.Mesh>(null);

  // Animate rotation
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.38 * delta;
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() / 2) * 0.25;
    }
  });

  // Generate points for ∞ (lemniscate of Bernoulli)
  const INF_POINTS = 160;
  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= INF_POINTS; i++) {
      const t = (i / INF_POINTS) * Math.PI * 2;
      const a = 1.2, b = 0.53;
      const denom = 1 + Math.sin(t) ** 2;
      const x = a * Math.cos(t) / denom;
      const y = b * Math.sin(t) * Math.cos(t) / denom;
      const z = a * Math.sin(t) / denom;
      arr.push(new THREE.Vector3(x * 12, y * 9, z * 10));
    }
    return arr;
  }, []);

  // Tube geometry along the infinity curve
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points, true, "catmullrom", 1.25);
    return new THREE.TubeGeometry(curve, 700, 1.58, 64, true);
  }, [points]);

  // Glossy/glassy/iridescent material
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#56CCF2").lerp(new THREE.Color("#F4A261"), 0.12),
        roughness: 0.09,
        metalness: 0.65,
        transmission: 0.89,
        thickness: 2.2,
        clearcoat: 0.78,
        clearcoatRoughness: 0.13,
        reflectivity: 0.87,
        ior: 1.48,
        iridescence: 0.21,
        iridescenceIOR: 1.28,
        sheen: 0.32,
        sheenColor: new THREE.Color("#f4a261").lerp(new THREE.Color("#fff"), 0.62),
        envMapIntensity: 1.53,
      }),
    []
  );

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      material={material}
      castShadow
      receiveShadow
      scale={1.47}
    />
  );
}

// 3D Infinity Sign Canvas
const Infinity3D = () => (
  <Canvas
    camera={{
      position: [0, 3.5, 19],
      fov: 32,
    }}
    dpr={[1, 1.5]}
    shadows
    style={{
      width: "100%",
      height: "100%",
      borderRadius: "2.2rem",
      background: "radial-gradient(ellipse at center, #202654cc 2%, #f4a26114 84%, #fff0 100%)",
      boxShadow: "0 8px 48px 0 rgba(80,170,210,0.16), 0 1.5px 8px #56ccf285",
    }}
  >
    {/* Lights */}
    <ambientLight intensity={0.76} />
    <directionalLight
      position={[-8, 14, 12]}
      intensity={0.81}
      color="#f4a261"
      castShadow
    />
    <directionalLight
      position={[9, -13, 22]}
      intensity={0.53}
      color="#56ccf2"
    />
    <pointLight
      position={[1, 15, 8]}
      intensity={0.22}
      color="#fff"
    />

    {/* Environment lighting and the main mesh */}
    <Suspense fallback={null}>
      <InfinityMesh />
      <Environment preset="sunset" blur={0.9} />
    </Suspense>
    {/* Orbit controls for subtle autoRotate */}
    <OrbitControls
      autoRotate
      autoRotateSpeed={0.59}
      enablePan={false}
      enableZoom={false}
      enableRotate={false}
    />
  </Canvas>
);

export default Infinity3D;
