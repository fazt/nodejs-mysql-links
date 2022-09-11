import { Router } from "express";
const router = Router();

import { renderIndex, ping } from "../controllers/index.controller.js";

router.get("/", renderIndex);

router.get('/ping', ping);

export default router;
