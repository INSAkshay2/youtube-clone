import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // if you have one that populates req.user

const router = Router();

router.route("/signup").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/signin").post(loginUser);

// new routes
router.route("/refresh").post(refreshAccessToken);
router.route("/logout").post(authMiddleware, logoutUser);
router.route("/me").get(authMiddleware, getCurrentUser);

export default router;