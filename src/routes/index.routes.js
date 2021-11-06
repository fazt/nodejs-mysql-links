import { Router } from "express";
const router = Router();

import { renderIndex } from "../controllers/index.controller";

router.get("/", renderIndex);

export default router;
