import express from "express";
import { WarehouseGraph } from "../graph/WarehouseGraph";
import { skuTrie } from "@src/services/SKUTrieService";

const orderRouter = express.Router();
const warehouseGraph = new WarehouseGraph();

orderRouter.post("/process-order", (req, res) => {
  const { items } = req.body;

  const locations = items.map((sku: string) => skuTrie.search(sku)[0]);

  const path = warehouseGraph.findShortestPath("start", locations);

  res.json({ path });
});

export default orderRouter;
