export interface StopDto {

    stopName: string;
    latitude: number;
    longitude: number;

};

export interface UpdateStopDto {

    stopName?: string;
    latitude?: number;
    longitude?: number;

};