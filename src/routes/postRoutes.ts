import { Router } from "express";
import { postControlllers } from "../controllers/postControllers";

const router = Router();

router.get("/", postControlllers.readPosts);
router.post("/add", postControlllers.addPost);
router.put("/update/:id", postControlllers.updatePost);
router.delete("/delete/:id", postControlllers.deletePost);

export default router;
