import { Router } from "express";
import * as menuController from "../controllers/menu.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware.authenticateKey);

router.get("/", menuController.getMenu);

router.post("/", authMiddleware.authorizeAdmin, menuController.newProduct);

router.delete("/:prodId", authMiddleware.authorizeAdmin, menuController.deleteProduct);

router.put("/:prodId", authMiddleware.authorizeAdmin, menuController.updateProduct)

export default router;
