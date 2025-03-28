import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import userService from "../services/user.service";
import bcrypt from "bcryptjs";
import { UpdateProfileDto } from '../dto/user.dto';
import { HttpError } from "../utils/errorHandler";
import adminService from "../services/admin.service";



const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new HttpError("Current password and new password are required.", StatusCodes.BAD_REQUEST);
    }

    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      throw new HttpError("Current password is incorrect.", StatusCodes.UNAUTHORIZED);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const isUpdated = await userService.update(user.id, { password: hashedNewPassword });
    if (!isUpdated) {
      throw new HttpError("Password not updated.", StatusCodes.BAD_REQUEST);
    }

    res.status(StatusCodes.OK).json({ message: "Password updated successfully." });
  } catch (error) {
    next(error);
  }
};


const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const data = await userService.fetchUserDetails(user.id);
    res.status(StatusCodes.OK).json({ ...data });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const profileData: UpdateProfileDto = req.body;
    const isUpdated = await userService.update(user.id, profileData);

    if (!isUpdated) {
      throw new HttpError("Profile not updated. Please try again.", StatusCodes.BAD_REQUEST);
    }

    res.status(StatusCodes.OK).json({ message: "Profile updated successfully." });

  } catch (error) {
    next(error);
  }
};

const userRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const data = await userService.userRole(user.id);
    res.status(StatusCodes.OK).json({ ...data });
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
export default {

  changePassword,
  getProfile,
  updateProfile,
  getAllRoutes,
  userRole,

};
