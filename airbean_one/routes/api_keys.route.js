import { Router } from "express";
import * as apiKeyController from "../controllers/api_keys.controller.js";

const router = Router();

router.get("/", apiKeyController.getApiKeys);

export default router;
