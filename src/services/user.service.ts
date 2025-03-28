import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import db from "../db";

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = db.user;
  }


  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // ----------------Update user profile--------------------


  async update(userId: string, userData: Partial<User>): Promise<Boolean> {
    const { affected } = await this.userRepository.update(userId, userData);
    if (affected) {
      return true
    }
    return false
  }



  //----------- Get  a user by ID ----------------------------
  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }


  //--------------------Get User Details ---------------------

  async fetchUserDetails(userId: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'fullName', 'email', 'registrationNumber', 'departmentName', 'routeNumber', 'phoneNumber', 'stopArea'],
    });
  }


  async updateProfile(userId: string, profileData: Partial<User>): Promise<boolean> {
    try {
      const result = await this.userRepository.update(userId, profileData);
      return result && result.affected ? result.affected > 0 : false;
    } catch (error) {
      throw new Error('Error updating user profile.');
    }
  }

  async userRole(userId: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id: userId },
      select: [
        "id",
        "isSuperUser",
      ],
    });

  }

}

export default new UserService();



