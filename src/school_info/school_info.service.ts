import { Injectable } from "@nestjs/common";
import { SchoolInfo } from "./schema/school-info.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../user/schemas/user.schema";
import { SchoolInfoDto } from "./dto/school-info.dto";

@Injectable()
export class SchoolInfoService {
  constructor(@InjectModel(SchoolInfo.name) private readonly schoolInfoModel: Model<SchoolInfo>,
              @InjectModel(User.name) private readonly userModel: Model<User>) {
  }

  // function to create new school info document
  async createNewSchool(school: SchoolInfoDto): Promise<any> {
    // check if school is registered
    const checking = await this.schoolInfoModel.find({ email: school.email }).exec();

    if (checking.length > 0) {
      return {
        success: 0,
        message: "School has already been registered. Log in instead."
      };
    }

    return this.schoolInfoModel.create(school);
  }

  // function to get school info data
  async viewSchoolProfile(id: string): Promise<any> {
    return this.schoolInfoModel.findById(id).exec();
  }

  // function to update school info
  async updateSchoolProfile(id: string, body: SchoolInfoDto): Promise<any> {
    return this.schoolInfoModel.findByIdAndUpdate(id, body, { new: true }).exec();
  }

  // function to delete school info
  async deleteSchool(id: string): Promise<any> {
    return this.schoolInfoModel.findByIdAndDelete(id).exec();
  }

  // get school administrators administrator of the school
  async getSchoolAdminstrators(schoolId: string): Promise<any> {
    return this.schoolInfoModel.findById(schoolId).populate({
      path: "administrator", populate: [
        { path: "user" }
      ]
    });

  }

}
