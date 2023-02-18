import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  renderAddLink,
  addLink,
  renderLinks,
  deleteLink,
  editLink,
  renderEditLink,
} from "../controllers/links.controller.js";

const router = Router();

// Authorization
router.use(isLoggedIn);

// Routes
router.get("/add", renderAddLink);
router.post("/add", addLink);
router.get("/", isLoggedIn, renderLinks);
router.get("/delete/:id", deleteLink);
router.get("/edit/:id", renderEditLink);
router.post("/edit/:id", editLink);

export default router;
