import express from "express";
import {
  getAllOrders,
  getAllOrdersForUser,
  getPercentageOfOrderProgress,
  getSalesStatistics,
  updateOrder,
} from "../controllers/OrdersController.js";

const orderRouter = express.Router();

orderRouter.post("/orders/updateOrder", updateOrder);
orderRouter.post("/orders/getAllOrdersForUser", getAllOrdersForUser);
orderRouter.post("/orders/getAllOrders", getAllOrders);
orderRouter.post("/orders/getPercentageOfOrderProgress", getPercentageOfOrderProgress);
orderRouter.post("/orders/getSalesStatistics", getSalesStatistics);

export default orderRouter;
