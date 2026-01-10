import { Router } from "express";

import { loginController, logoutController, meController } from "../controllers/auth.controller.js";
import { rateLimitLogin } from "../middlewares/rateLimitLogin.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema } from "../validations/auth.schema.js";

const router = Router();

router.post("/auth/login", rateLimitLogin, validate(loginSchema), loginController);
router.get("/auth/me", meController);
router.post("/auth/logout", logoutController);

export default router;
