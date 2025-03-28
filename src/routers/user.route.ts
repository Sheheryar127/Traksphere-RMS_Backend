import { Router } from "express";
import controller from "../controllers/user.controller";
import authMiddleware from "../middelware/auth.middleware";


const router = Router()
    .use(authMiddleware)
    .get("/get-profile", controller.getProfile)
    .post("/update-profile", controller.updateProfile)
    .post("/change-password", controller.changePassword)
    .get("/user-role", controller.userRole)
    .get("/get-routes", controller.getAllRoutes)


export default router;
