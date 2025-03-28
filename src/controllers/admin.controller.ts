import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { validate as isUUID } from "uuid";
import adminService from "../services/admin.service";
import { HttpError } from "../utils/errorHandler";
import { StopDto } from "../dto/stop.dto";
import { UpdateRouteDto, RouteDto } from "../dto/route.dto";
import { UpdateUserDto } from "../dto/user.dto";



const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await adminService.findAllUser();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;

        if (!isUUID(id)) {
            throw new HttpError("Invalid user ID format", StatusCodes.BAD_REQUEST);
        }

        const { email, fullName, registrationNumber, departmentName, phoneNumber, routeNumber, gender, stopArea } = req.body;


        if (!email && !fullName && !registrationNumber && !departmentName && !phoneNumber && !routeNumber && !gender && !stopArea) {
            throw new HttpError("At least one field is required for update", StatusCodes.BAD_REQUEST);
        }

        // const existingUserByRegNo = await authService.findByRegistrationNumber(registrationNumber);
        // if (existingUserByRegNo) {
        //     throw new HttpError("Registration number already in use.", StatusCodes.BAD_REQUEST);
        // }

        const userData: UpdateUserDto = {
            id: id as string,
            email,
            fullName,
            registrationNumber,
            departmentName,
            phoneNumber,
            routeNumber,
            gender,
            stopArea,

        };

        // const updatedUser = 
        await adminService.updateUserById(id as string, userData);
        res.status(StatusCodes.OK).json({
            message: "User updated successfully",
            // updatedUser,
        });
    } catch (error) {

        next(error);
    }
};

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;


        if (!isUUID(id)) {
            throw new HttpError("Invalid user ID format", StatusCodes.BAD_REQUEST);
        }

        await adminService.deleteUserById(id as string);
        res.status(StatusCodes.OK).json({
            message: "User deleted successfully",

        });
    } catch (error) {
        next(error);
    }
};


const addDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fullName, phoneNumber, cnicNumber } = req.body;

        if (!fullName || !phoneNumber || !cnicNumber) {
            throw new HttpError("All fields are required", StatusCodes.BAD_REQUEST);
        }

        await adminService.addNewDriver({
            fullName,
            phoneNumber,
            cnicNumber,
        });

        res.status(StatusCodes.CREATED).json({
            message: "Driver created successfully"
        });
    } catch (error) {
        next(error);
    }
};


const deleteDriverById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;


        if (!isUUID(id)) {
            throw new HttpError("Invalid user ID format", StatusCodes.BAD_REQUEST);
        }

        await adminService.deleteDriverById(id as string);
        res.status(StatusCodes.OK).json({
            message: "User deleted successfully",

        });
    } catch (error) {
        next(error);
    }
};

const getAllDrivers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await adminService.findAllDriver();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        next(error);
    }
};


const updateDriverById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;

        if (!isUUID(id)) {
            throw new HttpError("Invalid driver ID format", StatusCodes.BAD_REQUEST);
        }

        const { fullName, phoneNumber, cnicNumber } = req.body;
        if (!fullName && !phoneNumber && !cnicNumber) {
            throw new HttpError("At least one field (fullName, phoneNumber, cnicNumber) is required", StatusCodes.BAD_REQUEST);
        }

        // const updatedDriver = 
        await adminService.updateDriverById(id as string, {
            fullName,
            phoneNumber,
            cnicNumber,
        });

        res.status(StatusCodes.OK).json({
            message: "Driver updated successfully",
            // updatedDriver,
        });
    } catch (error) {
        next(error);
    }
};

const addStop = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { stopName, latitude, longitude } = req.body;

        if (!stopName || !latitude || !longitude) {
            throw new HttpError("stopName, latitude, and longitude are required", StatusCodes.BAD_REQUEST);
        }

        const stopData: StopDto = { stopName, latitude, longitude };

        await adminService.addStop(stopData);

        res.status(StatusCodes.CREATED).json({
            message: "Stop created successfully",
        });
    } catch (error) {
        next(error);
    }
};

const updateStopById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;

        if (!isUUID(id)) {
            throw new HttpError("Invalid stop ID format", StatusCodes.BAD_REQUEST);
        }

        const { stopName, latitude, longitude } = req.body;

        if (!stopName && !latitude && !longitude) {
            throw new HttpError("At least one field (stopName, latitude, longitude) is required", StatusCodes.BAD_REQUEST);
        }

        // const updatedStop = 
        await adminService.updateStopById(id as string, {
            stopName,
            latitude,
            longitude,
        });

        res.status(StatusCodes.OK).json({
            message: "Stop updated successfully",
            //updatedStop,
        });
    } catch (error) {
        next(error);
    }
};


const getAllStops = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stops = await adminService.getAllStops();
        res.status(StatusCodes.OK).json(stops);
    } catch (error) {
        next(error);
    }
};

const deleteStopById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;

        if (!isUUID(id)) {
            throw new HttpError("Invalid Stop ID format", StatusCodes.BAD_REQUEST);
        }

        await adminService.deleteStopById(id as string);
        res.status(StatusCodes.OK).json({
            message: "Stop deleted successfully",

        });
    } catch (error) {
        next(error);
    }
};

const addNewRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vehicleNumber, routeName, routeNumber, driverId, busStopIds } = req.body;
        if (!vehicleNumber || !routeName || !routeNumber || !driverId) {
            throw new HttpError(
                "vehicleNumber, routeName, routeNumber, busStopIds, and driverId are required",
                StatusCodes.BAD_REQUEST
            );
        }
        const RouteDto: RouteDto = {
            vehicleNumber,
            routeName,
            routeNumber,
            driverId,
            busStopIds
        };
        //const newRoute = 
        await adminService.addRoute(RouteDto);
        res.status(StatusCodes.CREATED).json({
            message: "New Route Created successfully",
            //newRoute,
        });

    } catch (error) {
        next(error);
    };
}

const deleteRouteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;

        if (!isUUID(id)) {
            throw new HttpError("Invalid Stop ID format", StatusCodes.BAD_REQUEST);
        }

        await adminService.deleteRouteById(id as string);
        res.status(StatusCodes.OK).json({
            message: "Route deleted successfully",

        });
    } catch (error) {
        next(error);
    }
};

const getAllRoutes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const routes = await adminService.getAllRoutes();
        res.status(StatusCodes.OK).json(routes);
    } catch (error) {
        next(error);
    }
};

const updateRouteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;

        if (!isUUID(id as string)) {
            throw new HttpError("Invalid route ID format", StatusCodes.BAD_REQUEST);
        }

        const { vehicleNumber, routeName, routeNumber, driverId, busStopIds } = req.body;
        if (!vehicleNumber || !routeName || !routeNumber || !driverId || !busStopIds) {
            throw new HttpError(
                "At least one field (vehicleNumber, routeName, routeNumber, driverId, busStopIds) is required",
                StatusCodes.BAD_REQUEST
            );
        }
        const updateRouteDto: UpdateRouteDto = {
            vehicleNumber,
            routeName,
            routeNumber,
            driverId,
            busStopIds,
        };
        // const updatedRoute =
        await adminService.updateRoute(id as string, updateRouteDto);
        res.status(StatusCodes.OK).json({
            message: "Route updated successfully",
            // updatedRoute,
        });
    } catch (error) {
        next(error);
    }

};

const getAllCounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const counts = await adminService.getCounts();
        res.status(StatusCodes.OK).json(counts);
    } catch (error) {
        next(error);
    }
};


export default {
    getAllUsers,
    updateUserById,
    deleteUserById,
    addDriver,
    deleteDriverById,
    getAllDrivers,
    updateDriverById,
    addStop,
    updateStopById,
    getAllStops,
    deleteStopById,
    addNewRoute,
    getAllRoutes,
    deleteRouteById,
    updateRouteById,
    getAllCounts,

};
