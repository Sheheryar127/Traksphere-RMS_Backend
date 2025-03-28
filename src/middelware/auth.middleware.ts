import jwt from 'jsonwebtoken';
import config from '../config';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import userService from '../services/user.service';
import { StatusCodes } from 'http-status-codes';


const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied. No token provided.' });
        return
    }

    try {
        jwt.verify(token,
            config.jwt.secret,
            async (err, decoded) => {
                if (err) {
                    res.status(StatusCodes.UNAUTHORIZED).send({
                        message: "Invalid or expired token!",
                    });
                    return
                }
                if (typeof decoded !== 'string' && decoded !== undefined) {
                    const user = await userService.findById(decoded.id);
                    if (!user) {
                        res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
                        return;
                    }
                    (req as any).user = user;
                    next();
                } else {
                    res.status(StatusCodes.FORBIDDEN).send('Invalid token payload');
                }
            });
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid or expired token!' });
        return
    }
};

export default authMiddleware;
