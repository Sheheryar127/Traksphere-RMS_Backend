import { Router } from "express";
import controller from "../controllers/admin.controller";
import authMiddleware from "../middelware/auth.middleware";
import adminMiddleware from "../middelware/admin.middleware";

const router = Router()
    .use(authMiddleware)
    .use(adminMiddleware)
    .get("/get-users", controller.getAllUsers)
    .put("/update-user", controller.updateUserById)
    .delete("/delete-user", controller.deleteUserById)
    .post("/add-driver", controller.addDriver)
    .get("/get-drivers", controller.getAllDrivers)
    .put("/update-driver", controller.updateDriverById)
    .delete("/delete-driver", controller.deleteDriverById)
    .post("/add-stop", controller.addStop)
    .get("/get-stops", controller.getAllStops)
    .put("/update-stop", controller.updateStopById)
    .delete("/delete-stop", controller.deleteStopById)
    .post("/add-route", controller.addNewRoute)
    .get("/get-routes", controller.getAllRoutes)
    .delete("/delete-route", controller.deleteRouteById)
    .put("/update-route", controller.updateRouteById)
    .get("/get-counts", controller.getAllCounts)
export default router;
