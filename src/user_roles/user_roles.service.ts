import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { UserRoles } from "./schema/user-roles.schema";
import { InjectModel } from "@nestjs/mongoose";
import { UserRoleDto } from "./dto/user-role.dto";

@Injectable()
export class UserRolesService {
  constructor(@InjectModel(UserRoles.name) private readonly userRoleModel: Model<UserRoles>) {
  }

  // function to create a new user Role
  async createUserRole(userRoleDto: UserRoleDto): Promise<any> {

    // first check user role in database
    const checkRole = await this.userRoleModel.find({ name: userRoleDto.name }).exec();

    if (checkRole.length > 1) {
      return {
        success: 0,
        message: "User role already exists."
      };
    }
    return await this.userRoleModel.create(userRoleDto);
  }

  // function to view all user roles
  async findAll(): Promise<any> {
    return await this.userRoleModel.find().exec();
  }

  // function to view user role by ID
  async findOne(id: string): Promise<any> {
    return await this.userRoleModel.findById(id).exec();
  }

  // function to update a user role
  async updateOne(id: string, userRoleDto: UserRoleDto): Promise<any> {
    return this.userRoleModel.findByIdAndUpdate(id, userRoleDto, { new: true });
  }

  // function to delete user role
  async deleteOne(id: string): Promise<any> {
    return await this.userRoleModel.deleteOne({ _id: id }).exec();
  }

}
