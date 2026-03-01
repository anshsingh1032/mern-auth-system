import { Router } from "express";
import { logout, registerUser,verifyEmail,login, forgotPassword ,resetPassword, checkAuth} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/check-auth").get(verifyToken,checkAuth)
router.route("/register").post(registerUser)
router.route("/verify-email").post(verifyEmail);
router.route("/logout").post(logout);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

export default router