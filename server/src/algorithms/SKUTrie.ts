class SKUTrieNode {
  children: Map<string, SKUTrieNode>;
  isEnd: boolean;
  locations: string[];

  constructor() {
    this.children = new Map();
    this.isEnd = false;
    this.locations = [];
  }
}

export class SKUTrie {
  private root = new SKUTrieNode();

  private _getAllSKUs(node: SKUTrieNode, prefix: string): string[] {
    let results: string[] = [];
    
    if (node.isEnd) {
      results = [...results, ...node.locations];
    }

    for (const [char, childNode] of node.children) {
      results = [...results, ...this._getAllSKUs(childNode, prefix + char)];
    }

    return results;
  }


  insert(sku: string, location: string) {
    let node = this.root;
    for (const char of sku) {
      if (!node.children.has(char)) {
        node.children.set(char, new SKUTrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEnd = true;
    node.locations.push(location);
  }

  search(prefix: string): string[] {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return [];
      node = node.children.get(char)!;
    }
    return this._getAllSKUs(node, prefix);
  }
}
