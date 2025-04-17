import express from "express";
import Aisle from "../models/Aisle";
import Bin from "../models/Bin";

const warehouseRouter = express.Router();

warehouseRouter.post("/aisles", async (req, res) => {
  try {
    const aisle = await Aisle.create(req.body);
    res.status(201).json(aisle);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : error });
  }
});

warehouseRouter.post("/aisles/:aisleId/bins", async (req, res) => {
  try {
    const bin = await Bin.create({ ...req.body, aisle: req.params.aisleId });
    await Aisle.findByIdAndUpdate(req.params.aisleId, { $push: { bins: bin._id } });
    res.status(201).json(bin);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : error });
  }
});

warehouseRouter.get("/layout", async (_req, res) => {
  try {
    const layout = await Aisle.find().populate({
      path: "bins",
      select: "code capacity currentItems location",
    });
    res.json(layout);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : error });
  }
});

export default warehouseRouter;
