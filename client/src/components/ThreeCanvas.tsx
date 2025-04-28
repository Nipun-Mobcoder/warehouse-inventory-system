import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

const ThreeCanvas = () => {
  const { warehouse } = useWarehouseContext();
  const [scene] = useState(() => new THREE.Scene());

  useEffect(() => {
    warehouse.graph.nodes.forEach((node) => {
      const geometry = new THREE.BoxGeometry(1, 2, 1);
      const material = new THREE.MeshPhongMaterial({
        color: node.type === "aisle" ? 0xcccccc : 0x00ff88,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(node.x, 0, node.y);
      scene.add(cube);
    });
  }, [scene, warehouse]);

  return (
    <Canvas camera={{ position: [0, 50, 50] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeCanvas;
