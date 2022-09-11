import { Router } from "express";
import { isLoggedIn } from "../lib/auth.js";
import { renderUserProfile } from "../controllers/user.controller.js";

const router = Router();

router.get("/profile", isLoggedIn, renderUserProfile);

export default router;
