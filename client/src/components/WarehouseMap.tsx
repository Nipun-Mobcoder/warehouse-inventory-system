import { WarehouseGraph } from '@/types';
import { useEffect } from 'react';
import * as THREE from 'three';

const WarehouseMap = ({ graph }: { graph: WarehouseGraph }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  useEffect(() => {
    graph.nodes.forEach(node => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: node.type === 'aisle' ? 0x888888 : 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(node.x, 0, node.y);
      scene.add(cube);
    });
  }, [graph, scene]);

  return <canvas id="warehouse-canvas" />;
};