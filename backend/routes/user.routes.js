import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
console.log("registerUser type:", typeof registerUser);

const router = Router()

router.route("/register").post(registerUser)

export default router