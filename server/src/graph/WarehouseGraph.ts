type Node = {
  id: string;
  neighbors: string[];
  type: "aisle" | "storage" | "charging";
  x: number;
  y: number;
};

export class WarehouseGraph {
  private adjacencyList = new Map<string, string[]>();
  private nodes = new Map<string, Node>();

  private _reconstructPath(visited: Map<string, string>, endId: string): string[] {
    const path = [endId];
    let current = endId;

    while (visited.has(current)) {
      current = visited.get(current)!;
      path.unshift(current);
    }

    return path;
  }

  addNode(node: Node) {
    this.nodes.set(node.id, node);
    this.adjacencyList.set(node.id, []);
  }

  findShortestPath(startId: string, endId: string): string[] {
    const queue = [startId];
    const visited = new Map<string, string>();

    while (queue.length > 0) {
      const current = queue.shift()!;

      if (current === endId) {
        return this._reconstructPath(visited, endId);
      }

      for (const neighbor of this.adjacencyList.get(current)!) {
        if (!visited.has(neighbor)) {
          visited.set(neighbor, current);
          queue.push(neighbor);
        }
      }
    }
    return [];
  }
}
