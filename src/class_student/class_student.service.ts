import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ClassStudent } from "./schema/class-student.schema";
import { Model } from "mongoose";
import { ClassStudentDto } from "./dto/class-student.dto";

@Injectable()
export class ClassStudentService {
  constructor(@InjectModel(ClassStudent.name) private readonly classStudentModel: Model<ClassStudent>) {
  }

  async create(body: ClassStudentDto): Promise<any> {
    const checking = await this.classStudentModel.find({
      class_id: body.classId,
      student_id: body.classId,
      year: body.year
    }).exec();

    if (checking.length > 0) {
      return {
        success: 0,
        message: "Student has already been added to class."
      };
    }

    return this.classStudentModel.create(body);
  }

  async viewAll(): Promise<any> {
    return this.classStudentModel.find().exec();
  }

  async viewByYear(year: string): Promise<any> {
    return this.classStudentModel.find({ year: year }).exec();
  }

  async viewByClassAndYear(classId: string, year: string) {
    return this.classStudentModel.find({ class_id: classId, year: year }).exec();
  }

  async update(id: string, body: ClassStudentDto): Promise<any> {
    return this.classStudentModel.findByIdAndUpdate(id, body).exec();
  }

  async delete(id: string): Promise<any> {
    return this.classStudentModel.findByIdAndDelete(id).exec();
  }
}
