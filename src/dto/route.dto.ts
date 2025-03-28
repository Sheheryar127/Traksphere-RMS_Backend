export interface RouteDto {
    routeName: string;
    routeNumber: string;
    vehicleNumber: string;
    driverId: string;
    busStopIds: string[];
}
export interface UpdateRouteDto {
    routeName?: string;
    routeNumber?: string;
    vehicleNumber?: string;
    driverId?: string;
    busStopIds?: string[];
}
