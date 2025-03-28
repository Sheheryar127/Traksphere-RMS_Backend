import { Router } from "express";
import controller from "../controllers/auth.controller";

const router = Router()

router.get("/send-otp", controller.sendOtp);
router.post("/signup", controller.signUp);
router.post("/complete-signup", controller.completeSignUp);
router.post("/signin", controller.signIn);
router.post("/forgot-password", controller.forgotPassword);



export default router;
