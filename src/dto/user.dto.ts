export interface UserDto {
    id: string,
    email: string,
    fullName: string,
    registrationNumber: string,
    departmentName: string,
    phoneNumber: string,
    routeNumber: string,
    gender: string,
    stopArea: string;
    isSuperUser: boolean;
};

export interface SignUpDto {
    email: string,
    password: string,
    code?: string,
};

export interface completeSignUpDto {
    email: string,
    fullName: string,
    registrationNumber: string,
    departmentName: string,
    phoneNumber: string,
    routeNumber: string,
    gender: string,
    stopArea: string;
    isSuperUser: boolean;
};

export interface UpdateProfileDto {
    fullName?: string;
    phoneNumber?: string;
    departmentName?: string;
    routeNumber?: string;
    stopArea?: string;
    registrationNumber?: string;

}

export interface UpdateUserDto {
    id: string,
    email?: string,
    fullName?: string,
    registrationNumber?: string,
    departmentName?: string,
    phoneNumber?: string,
    routeNumber?: string,
    gender?: string,
    stopArea?: string;

};