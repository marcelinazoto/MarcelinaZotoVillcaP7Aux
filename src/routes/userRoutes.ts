import { Router } from "express";
import { userControlllers } from "../controllers/userControllers";
import { authToken } from "../libs/authToken";

const router = Router();

router.get("/", userControlllers.readUsers);
router.post("/logln", userControlllers.logln);
router.post("/add", userControlllers.addUser);
router.put("/update/:id", userControlllers.updateUser);
router.delete("/delete/:id", userControlllers.deleteUser);

router.put("/postTouser/:idU", userControlllers.postTouser);
router.get("/profile/:id/:iduser", authToken, userControlllers.getProfile);

export default router;
