import db from "../db";
import { Repository, In } from "typeorm";
import { User } from "../entities/user.entity";
import { Driver } from "../entities/driver.entity";
import { BusStop } from "../entities/stop.entity";
import { HttpError } from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import { StopDto } from "../dto/stop.dto";
import { DriverDto } from "../dto/driver.dto";
import { RouteDto, UpdateRouteDto } from "../dto/route.dto";
import { Route } from "../entities/route.entity";
import { UpdateUserDto } from "../dto/user.dto";

export class AdminService {
    private userRepository: Repository<User>;
    private driverRepository: Repository<Driver>
    private busStopRepository: Repository<BusStop>
    private routeRepository: Repository<Route>

    constructor() {
        this.userRepository = db.user;
        this.driverRepository = db.driver
        this.busStopRepository = db.busStop
        this.routeRepository = db.route
    }

    async findAllUser(): Promise<User[]> {

        const users = await this.userRepository.find({
            select: [
                "id",
                "fullName",
                "departmentName",
                "registrationNumber",
                "email",
                "phoneNumber",
                "routeNumber",
                "gender",
                "stopArea",
                "isSuperUser",
            ],
            where: { isSuperUser: false },
        });
        return users

    }

    async updateUserById(id: string, userData: UpdateUserDto): Promise<User> {
        const { email, fullName, registrationNumber, departmentName, phoneNumber, routeNumber, gender, stopArea } = userData;


        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new HttpError('User not found.', StatusCodes.NOT_FOUND);
        }

        if (email) user.email = email;
        if (fullName) user.fullName = fullName;
        if (registrationNumber) user.registrationNumber = registrationNumber;
        if (departmentName) user.departmentName = departmentName;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (routeNumber) user.routeNumber = routeNumber;
        if (gender) user.gender = gender;
        if (stopArea) user.stopArea = stopArea;

        try {
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            throw new HttpError('Failed to update user.', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteUserById(id: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new HttpError("User not found", StatusCodes.NOT_FOUND);
        }

        await this.userRepository.delete(id);
        return user;
    }


    async addNewDriver(driverData: Partial<Driver>): Promise<Driver> {
        const { cnicNumber } = driverData;

        const existingDriver = await this.driverRepository.findOne({
            where: { cnicNumber },
        });

        if (existingDriver) {
            throw new HttpError("Driver with this CNIC number already exists", StatusCodes.CONFLICT);
        }

        const newDriver = this.driverRepository.create(driverData);
        return await this.driverRepository.save(newDriver);
    }


    async deleteDriverById(id: string): Promise<Driver> {
        const driver = await this.driverRepository.findOneBy({ id });

        if (!driver) {
            throw new HttpError("Driver not found", StatusCodes.NOT_FOUND);
        }

        await this.driverRepository.delete(id);
        return driver;
    }

    async findAllDriver(): Promise<Driver[]> {

        const drivers = await this.driverRepository.find({
            select: [
                "id",
                "fullName",
                "phoneNumber",
                "cnicNumber",

            ],

        });
        return drivers

    }

    async updateDriverById(id: string, driverData: DriverDto): Promise<Driver> {
        const driver = await this.driverRepository.findOneBy({ id });

        if (!driver) {
            throw new HttpError("Driver not found", StatusCodes.NOT_FOUND);
        }

        driver.fullName = driverData.fullName || driver.fullName;
        driver.phoneNumber = driverData.phoneNumber || driver.phoneNumber;
        driver.cnicNumber = driverData.cnicNumber || driver.cnicNumber;

        await this.driverRepository.save(driver);
        return driver;
    }

    async addStop(stopData: StopDto): Promise<BusStop> {
        const { stopName, latitude, longitude } = stopData;

        if (!stopName || !latitude || !longitude) {
            throw new HttpError("Stop name, latitude, and longitude are required", StatusCodes.BAD_REQUEST);
        }

        const existingStop = await this.busStopRepository.findOne({
            where: { stopName },
        });

        if (existingStop) {
            throw new HttpError("Stop with this name already exists", StatusCodes.CONFLICT);
        }

        const newStop = this.busStopRepository.create(stopData);
        return await this.busStopRepository.save(newStop);
    }

    async updateStopById(id: string, stopData: StopDto): Promise<BusStop> {
        const stop = await this.busStopRepository.findOneBy({ id });

        if (!stop) {
            throw new HttpError("Stop not found", StatusCodes.NOT_FOUND);
        }

        stop.stopName = stopData.stopName || stop.stopName;
        stop.latitude = stopData.latitude || stop.latitude;
        stop.longitude = stopData.longitude || stop.longitude;

        await this.busStopRepository.save(stop);
        return stop;
    }

    async getAllStops(): Promise<BusStop[]> {
        try {
            const stops = await this.busStopRepository.find({
                select: ["id", "stopName", "latitude", "longitude"],
            });
            return stops;
        } catch (error) {
            throw new HttpError("Error fetching stops", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteStopById(id: string): Promise<BusStop> {
        const stop = await this.busStopRepository.findOneBy({ id });

        if (!stop) {
            throw new HttpError("Stop not found", StatusCodes.NOT_FOUND);
        }

        await this.busStopRepository.delete(id);
        return stop;
    }

    async addRoute(RouteData: RouteDto) {
        const { vehicleNumber, routeName, routeNumber, driverId, busStopIds } = RouteData;

        const existingRoute = await this.routeRepository.findOne({
            where: { vehicleNumber },
        });
        if (existingRoute) {
            throw new HttpError(
                "A route with this vehicle number already exists.",
                StatusCodes.BAD_REQUEST
            );
        }

        const driver = await this.driverRepository.findOne({ where: { id: driverId } });
        if (!driver) {
            throw new HttpError(
                "Driver with the specified ID not found.",
                StatusCodes.NOT_FOUND
            );
        }

        const foundStops = await this.busStopRepository.findBy({ id: In(busStopIds) });
        if (foundStops.length !== busStopIds.length) {
            throw new HttpError(
                "Bus Stop Not Found.",
                StatusCodes.BAD_REQUEST
            );
        }

        const newRoute = this.routeRepository.create({
            vehicleNumber,
            routeName,
            routeNumber,
            driver,
            busStops: foundStops,
        });

        await this.routeRepository.save(newRoute);
        return newRoute
    }
    async getAllRoutes(): Promise<Route[]> {
        try {

            const routes = await this.routeRepository.find({
                relations: ["driver", "busStops"],
            });

            if (!routes || routes.length === 0) {
                throw new HttpError("No routes found.", StatusCodes.NOT_FOUND);
            }

            return routes;
        } catch (error) {
            throw new HttpError("An error occurred while fetching routes.", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteRouteById(id: string): Promise<Route> {
        const route = await this.routeRepository.findOneBy({ id });

        if (!route) {
            throw new HttpError("Route not found", StatusCodes.NOT_FOUND);
        }

        await this.routeRepository.delete(id);
        return route;
    }

    async updateRoute(
        id: string,
        RouteData: UpdateRouteDto
    ): Promise<Route> {
        const { vehicleNumber, routeName, routeNumber, driverId, busStopIds } = RouteData;

        const route = await this.routeRepository.findOne({
            where: { id },
            relations: ["driver", "busStops"],
        });
        if (!route) {
            throw new HttpError("Route not found.", StatusCodes.NOT_FOUND);
        }

        if (vehicleNumber && vehicleNumber !== route.vehicleNumber) {
            const existingRoute = await this.routeRepository.findOne({
                where: { vehicleNumber },
            });
            if (existingRoute) {
                throw new HttpError("A route with this vehicle number already exists.", StatusCodes.BAD_REQUEST);
            }
            route.vehicleNumber = vehicleNumber;
        }


        if (driverId) {
            const driver = await this.driverRepository.findOne({ where: { id: driverId } });
            if (!driver) {
                throw new HttpError("Driver with the specified ID not found.", StatusCodes.NOT_FOUND);
            }
            route.driver = driver;
        }
        if (routeName) route.routeName = routeName;
        if (routeNumber) route.routeNumber = routeNumber;

        if (busStopIds) {
            const busStops = await this.busStopRepository.findBy({ id: In(busStopIds) });
            if (busStops.length !== busStopIds.length) {
                throw new HttpError("Bus stops not found.", StatusCodes.BAD_REQUEST);
            }
            route.busStops = busStops;
        }

        return await this.routeRepository.save(route);
    }


    async getCounts() {
        try {
            const userCount = await this.userRepository.count({
                where: { isSuperUser: false }
            });
            const busStopCount = await this.busStopRepository.count();
            const routeCount = await this.routeRepository.count();
            const driverCount = await this.driverRepository.count();

            return {
                totalUsers: userCount,
                totalBusStops: busStopCount,
                totalRoutes: routeCount,
                totalDrivers: driverCount
            };
        } catch (error) {
            throw new HttpError("Error fetching counts.", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }


}



export default new AdminService();
