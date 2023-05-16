import { Router } from "express";
import { isLoggedIn } from "../middlewares/protectedRoutes.js";
import { validator } from "../middlewares/validator.middleware.js";
import {
  renderAddLink,
  addLink,
  renderLinks,
  deleteLink,
  editLink,
  renderEditLink,
} from "../controllers/links.controller.js";
import { createLinkSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/", isLoggedIn, renderLinks);
router.get("/add", isLoggedIn, renderAddLink);
router.post("/add", isLoggedIn, validator(createLinkSchema), addLink);
router.get("/delete/:id", isLoggedIn, deleteLink);
router.get("/edit/:id", isLoggedIn, renderEditLink);
router.post("/edit/:id", isLoggedIn, editLink);

export default router;
