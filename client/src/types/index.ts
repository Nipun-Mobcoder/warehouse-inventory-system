import * as THREE from "three";

export interface WarehouseNode {
  id: string;
  neighbors: string[];
  type: "aisle" | "storage" | "charging";
  x: number;
  y: number;
  z?: number; // Added for 3D visualization
  status?: "available" | "occupied" | "maintenance";
}

export interface ShortestPathResult {
  path: string[];
  distance: number;
  warnings: string[];
}

export class WarehouseGraph {
  private adjacencyList: Map<string, string[]>;
  private nodes: Map<string, WarehouseNode>;

  constructor() {
    this.adjacencyList = new Map();
    this.nodes = new Map();
  }

  addNode(node: WarehouseNode): void {
    this.nodes.set(node.id, node);
    this.adjacencyList.set(node.id, []);
  }

  addEdge(sourceId: string, destinationId: string): void {
    if (this.adjacencyList.has(sourceId)) {
      this.adjacencyList.get(sourceId)?.push(destinationId);
    }
  }

  findShortestPath(startId: string, endId: string): ShortestPathResult {
    console.log(startId, endId);
    return {
      path: [],
      distance: 0,
      warnings: ["Frontend pathfinding not implemented"],
    };
  }

  getNode(id: string): WarehouseNode | undefined {
    return this.nodes.get(id);
  }

  getAllNodes(): WarehouseNode[] {
    return Array.from(this.nodes.values());
  }
}

// Additional types for visualization
export interface WarehouseLayout {
  aisles: WarehouseNode[];
  storageUnits: WarehouseNode[];
  chargingStations: WarehouseNode[];
  connections: string[][];
}

export interface PathVisualization {
  pathNodes: string[];
  markers: THREE.Vector3[];
  arrows: THREE.Vector3[];
}
