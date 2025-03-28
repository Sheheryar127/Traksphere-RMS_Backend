import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { AppDataSource } from "./data-source";
import { User } from "../entities/user.entity";
import { Driver } from "../entities/driver.entity";
import { BusStop } from "../entities/stop.entity";
import { Route } from "../entities/route.entity";
const getRepository = <T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> => {
    return AppDataSource.getRepository(entity);
}

export default {
    user: getRepository(User),
    driver: getRepository(Driver),
    busStop: getRepository(BusStop),
    route: getRepository(Route),
};
