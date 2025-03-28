import db from "../db";
import { Repository } from "typeorm";
import { SignUpDto } from "../dto/user.dto";
import config from "../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
import { HttpError } from "../utils/errorHandler";
import { StatusCodes } from 'http-status-codes';

export class authService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = db.user;
    }

    async signUp(userData: SignUpDto) {
        const { email, password } = userData;

        const userExist = await this.userRepository.findOneBy({ email });
        const hashedPassword = await bcrypt.hash(password, 10);

        if (userExist) {
            if (!userExist.registrationNumber) {
                await this.userRepository.update(userExist.id, { password: hashedPassword });
                return userExist
            }
            throw new HttpError("User already exists", StatusCodes.BAD_REQUEST);
        }

        const newUser = this.userRepository.create({ email, password: hashedPassword });
        await this.userRepository.save(newUser);
        return newUser;
    }

    async findByRegistrationNumber(registrationNumber: string): Promise<User | null> {
        try {

            const user = await this.userRepository.findOne({ where: { registrationNumber } });
            return user;
        } catch (error) {
            throw new Error('There was an error while checking the registration number.');
        }
    }


    async signIn(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new HttpError("User not found", StatusCodes.NOT_FOUND);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new HttpError("Invalid password", StatusCodes.UNAUTHORIZED);
        }

        const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, { expiresIn: config.jwt.exp });

        const { password: _, ...userData } = user;
        return { token };
        // return { token, user: userData };
    }



}

export default new authService();
