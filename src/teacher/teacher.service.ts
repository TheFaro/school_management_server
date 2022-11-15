import { Injectable } from "@nestjs/common";
import { Teacher } from "./schema/teacher.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TeacherDto } from "./dto/teacher.dto";

@Injectable()
export class TeacherService {
  constructor(@InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>) {
  }

  async createTeacher(body: TeacherDto): Promise<any> {
    const checking = await this.teacherModel.find({ name: body.name, surname: body.surname, contact: body.contact });

    if (checking.length > 0) {
      return {
        success: 0,
        message: "Teacher has already been registered."
      };
    }

    return this.teacherModel.create(body);
  }

  async viewAllTeachers(): Promise<any> {
    return this.teacherModel.find().exec();
  }

  async updateTeacher(id: string, body: TeacherDto): Promise<any> {
    return this.teacherModel.findByIdAndUpdate(id, body, { new: true }).exec();
  }

  async deleteTeacher(id: string): Promise<any> {
    return this.teacherModel.findByIdAndDelete(id).exec();
  }
}
