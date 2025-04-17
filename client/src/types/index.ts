export interface Node {
    id: string;
    neighbors: string[];
    type: 'aisle' | 'storage' | 'charging';
    x: number;
    y: number;
  }
  
  export class WarehouseGraph {
    constructor() {}
    findShortestPath(start: string, end: string): string[] {
      return [];
    }
  }