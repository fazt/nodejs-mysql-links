import { Router } from "express";
const router = Router();

import { renderIndex } from "../controllers/index.conroller";

router.get("/", renderIndex);

export default router;
