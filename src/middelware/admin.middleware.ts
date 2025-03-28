import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const adminMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    if ((req as any).user.isSuperUser) {
        next();
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User has not permission to access this!' });
        return
    }
};

export default adminMiddleware;
