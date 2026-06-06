import { Router } from "express";
import * as menuController from "../controllers/menu.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware.authenticateKey);

router.get("/", menuController.getMenu);

export default router;
