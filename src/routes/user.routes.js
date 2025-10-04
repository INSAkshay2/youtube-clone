import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import multer from "multer";

const upload = multer()
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default router;
