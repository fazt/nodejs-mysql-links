import { Router } from "express";
import { isLoggedIn } from "../lib/auth";
import { renderUserProfile } from "../controllers/user.controller";

const router = Router();

router.get("/profile", isLoggedIn, renderUserProfile);

export default router;
