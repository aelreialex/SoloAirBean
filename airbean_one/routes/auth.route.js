import { Router } from "express";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const router = Router();

router.use(authMiddleware.authenticateKey);
router.use(authMiddleware.authenticateBody);

// POST register user
router.post("/register", registerUser);

// POST login user
router.post("/login", loginUser);

export default router;
