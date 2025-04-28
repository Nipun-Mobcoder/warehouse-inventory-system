import express from "express";
import orderRouter from "./orderRoutes";
import warehouseRouter from "./warehouseRoute";
import inventoryRouter from "./inventoryRoutes";

const router = express.Router();

router.use("/order", orderRouter);
router.use("/warehouse", warehouseRouter);
router.use("/inventory", inventoryRouter);

export default router;
