import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ClassTeacher } from "./schema/class-teacher.schema";
import { Model } from "mongoose";
import { Teacher } from "../teacher/schema/teacher.schema";
import { Classname } from "../classname/schema/classname.schema";
import { ClassTeacherDto } from "./dto/class-teacher.dto";

@Injectable()
export class ClassTeacherService {
  constructor(@InjectModel(ClassTeacher.name) private readonly classTeacherModel: Model<ClassTeacher>,
              @InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>,
              @InjectModel(Classname.name) private readonly classnameModel: Model<Classname>) {
  }

  // function add class teachers
  async createClassTeacher(body: ClassTeacherDto): Promise<any> {
    const checking = await this.classTeacherModel.find(body).exec();

    if (checking.length > 0) {
      return {
        success: 0,
        message: "Class teacher has already been registered."
      };
    }

    return this.classTeacherModel.create(body);
  }

  // function to view all class teacher information
  async viewAllClassTeachers(): Promise<any> {
    return this.classTeacherModel.find().exec();
  }

  // function to view class teachers based on year
  async viewByYear(year: string): Promise<any> {
    return this.classTeacherModel.find({
      year: year
    }).exec();
  }

  // function to view class teachers based on class
  async viewByClassId(classId: string): Promise<any> {
    return this.classTeacherModel.find({
      class_id: classId
    }).exec();
  }

  // function to update class teacher information
  async updateClassTeacher(id: string, body: ClassTeacherDto): Promise<any> {
    return this.classTeacherModel.findByIdAndUpdate(id, body, { new: true }).exec();
  }

  // function to delete class teacher information
  async deleteClassTeacher(id: string): Promise<any> {
    return this.classTeacherModel.findByIdAndDelete(id).exec();
  }
}
