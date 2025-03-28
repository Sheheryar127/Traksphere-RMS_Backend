import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export class HttpError extends Error {
    status: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.status = statusCode;
        this.name = this.constructor.name;
    }
}

export const errorHandler = (err: unknown) => {
    if (err instanceof HttpError) {
        return { error: err.message, status: err.status };
    } else {
        console.error(err);
        return { error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR), status: StatusCodes.INTERNAL_SERVER_ERROR }
    }
}
