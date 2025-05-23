
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { MeshPhysicalMaterial, Color, TubeGeometry, CatmullRomCurve3, Vector3 } from "three";

function InfinityMesh() {
  const mesh = useRef<THREE.Mesh>(null);

  // Animate rotation
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.5 * delta;
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() / 2) * 0.2;
    }
  });

  // Create the infinity geometry using a custom parametric curve
  // Parametric equation for ∞ shape
  const INF_POINTS = 160;
  const points: [number, number, number][] = [];
  for (let i = 0; i <= INF_POINTS; i++) {
    const t = (i / INF_POINTS) * Math.PI * 2;
    // Lemniscate
    const a = 1.3, b = 0.6;
    const denom = 1 + Math.sin(t) ** 2;
    const x = (a * Math.cos(t)) / denom;
    const y = (b * Math.sin(t) * Math.cos(t)) / denom;
    const z = (a * Math.sin(t)) / denom;
    points.push([x * 10, y * 10, z * 10]);
  }

  // Create a tube geometry along the ∞ curve
  const geometry = React.useMemo(() => {
    const curve = new CatmullRomCurve3(
      points.map(([x, y, z]) => new Vector3(x, y, z)),
      true,
      "catmullrom",
      1.25
    );
    return new TubeGeometry(curve, 700, 1.65, 64, true);
  }, [points]);

  // Material: glossy, glassy, iridescent-like shader
  const material = React.useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: new Color("#56CCF2"),
        roughness: 0.05,
        metalness: 0.55,
        transmission: 0.95,
        thickness: 2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
        reflectivity: 0.7,
        ior: 1.55,
        iridescence: 0.15,
        iridescenceIOR: 1.35,
        // Add a slight sheen with white highlight
        sheen: 0.55,
        sheenColor: new Color("#f4a261"),
      }),
    []
  );

  return (
    <mesh ref={mesh} geometry={geometry} material={material} castShadow receiveShadow scale={1.4} />
  );
}

// 3D Infinity sign canvas wrapper
const Infinity3D = () => (
  <Canvas
    camera={{ position: [0, 2, 22], fov: 32 }}
    dpr={[1, 1.5]}
    shadows
    style={{
      width: "100%",
      height: "100%",
      borderRadius: "2.5rem",
      background:
        "radial-gradient(ellipse at center, #202654cc 2%, #f4a26110 75%, #fff0 100%)",
      boxShadow:
        "0 8px 56px 0 rgba(80,170,210,0.15), 0 1.5px 6.5px #56ccf270",
    }}
  >
    <ambientLight intensity={0.8} />
    <directionalLight position={[-8, 16, 12]} intensity={0.85} color="#f4a261" castShadow />
    <directionalLight position={[8, -10, 18]} intensity={0.52} color="#56ccf2" />
    <pointLight position={[0, 12, 6]} intensity={0.32} color="#fff" />
    <Suspense fallback={null}>
      <InfinityMesh />
      <Environment preset="sunset" blur={0.8} />
    </Suspense>
    <OrbitControls autoRotate autoRotateSpeed={1.28} enablePan={false} enableZoom={false} enableRotate={false} />
  </Canvas>
);

export default Infinity3D;
