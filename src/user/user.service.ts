import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import { UserRoles } from '../user_roles/schema/user-roles.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(UserRoles.name)
    private readonly userRoleModel: Model<UserRoles>,
  ) {}

  // function to create user
  async create(user: UserDto): Promise<any> {
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // check if user has been created before
    const checkUser = await this.userModel.find({ email: user.email }).exec();
    if (checkUser.length > 0) {
      return {
        success: 0,
        message: 'User already exists. Please choose another email or login.',
      };
    }

    return await this.userModel.create(user);
  }

  // function to find one user by email : login
  async findOne(email: string): Promise<any> {
    return this.userModel.findOne({ email: email }).exec();
  }

  // function to get all users
  async viewAllUsers(): Promise<any> {
    return this.userModel.find().exec();
  }

  // function to get one user
  async viewOneUser(id: string): Promise<any> {
    return this.userModel.findById(id);
  }

  // function to update user
  async updateUser(id: string, user: UserDto): Promise<any> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  // function to delete user
  async deleteUser(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id);
  }

  // function to get users based on user role
  async viewUsersOnUserRole(id: string): Promise<any> {
    return this.userRoleModel.findById(id).exec();
  }
}
