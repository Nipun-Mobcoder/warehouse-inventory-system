import express from "express";
import { WarehouseGraph } from "../graph/WarehouseGraph";
import { skuTrie } from "@src/services/SKUTrieService";

const router = express.Router();
const warehouseGraph = new WarehouseGraph();

router.post("/process-order", (req, res) => {
  const { items } = req.body;

  const locations = items.map((sku: string) => skuTrie.search(sku)[0]);

  const path = warehouseGraph.findShortestPath("start", locations);

  res.json({ path });
});
