import { Router } from "express";
import * as ordersController from "../controllers/orders.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware.authenticateKey);

// GET all orders
router.get("/", ordersController.getOrders);

// GET order by userId
router.get(
  "/:userId",
  authMiddleware.authenticateParams,
  ordersController.getOrderById,
);

// POST create order
router.post("/", authMiddleware.authenticateBody, ordersController.createOrder);

export default router;
