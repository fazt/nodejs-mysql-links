import { Router } from "express";
import { renderIndex, ping } from "../controllers/index.controller.js";
import { isNotLoggedIn } from "../middlewares/protectedRoutes.js";

const router = Router();

router.get("/", isNotLoggedIn, renderIndex);
router.get("/ping", ping);

export default router;
