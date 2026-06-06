import { Router } from "express";
import * as cartController from "../controllers/cart.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import { validateCartPatch } from "../middlewares/validateCartPatch.middleware.js";

const router = Router();

router.use(authMiddleware.authenticateKey);

router.get("/", cartController.getCarts);

// GET cart by cartId
router.get(
  "/:cartId",
  authMiddleware.authenticateParams,
  cartController.getCartById,
);

router.patch("/", validateCartPatch, cartController.patchCart);

export default router;
