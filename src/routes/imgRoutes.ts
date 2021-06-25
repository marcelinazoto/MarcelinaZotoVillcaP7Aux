import { Router } from "express";
import { imageControllers } from "../controllers/imgControllers";

const router = Router();

router.get("/:filename", imageControllers.getImg);
router.post("/newImg", imageControllers.newImg);

export default router;
