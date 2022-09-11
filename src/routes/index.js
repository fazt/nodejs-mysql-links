import { Router } from "express";
import auth from "./auth.routes.js";
import index from "./index.routes.js";
import links from "./links.routes.js";
import user from "./user.routes.js";

const router = Router();

router.use(index);
router.use(auth);
router.use(user);
router.use("/links", links);

export default router;
