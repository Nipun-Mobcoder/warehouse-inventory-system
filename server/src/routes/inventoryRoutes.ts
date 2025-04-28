import express from "express";
import Item from "../models/Item";
import { skuTrie } from "@src/services/SKUTrieService";
import Bin from "@src/models/Bin";
import Aisle from "@src/models/Aisle";

const inventoryRouter = express.Router();

export interface PopulatedBin {
  code: string;
}

inventoryRouter.post("/bins", async (req, res) => {
  try {
    const bin = await Bin.create({
      code: req.body.code,
      capacity: req.body.capacity,
      location: req.body.location,
    });
    res.status(201).json(bin);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : error });
  }
});

inventoryRouter.post("/aisles", async (req, res) => {
  try {
    const aisle = await Aisle.create({
      name: req.body.name,
      coordinates: req.body.coordinates,
      bins: [],
    });
    res.status(201).json(aisle);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : error });
  }
});

inventoryRouter.get("/location-mapping", async (_req, res) => {
  try {
    const bins = await Bin.find().select("code location");
    const mapping = bins.reduce(
      (acc, bin) => ({
        ...acc,
        [bin.code]: bin.location,
      }),
      {},
    );
    res.json(mapping);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : error });
  }
});

inventoryRouter.put("/items/:sku/location", async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate({ sku: req.params.sku }, { bin: req.body.binId }, { new: true }).populate<{
      bin: PopulatedBin;
    }>("bin");

    if (!item) {
      res.status(404).json({
        error: "Item not found.",
      });
      return;
    }

    skuTrie.insert(item.sku, item.bin.code);

    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : error });
  }
});

export default inventoryRouter;
