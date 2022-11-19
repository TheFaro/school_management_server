import { Injectable } from "@nestjs/common";
import { SubjectTeacher } from "./schema/subject-teacher.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SubjectTeacherDto } from "./dto/subject-teacher.dto";

@Injectable()
export class SubjectTeacherService {
  constructor(@InjectModel(SubjectTeacher.name) private readonly subjectTeacherModel: Model<SubjectTeacher>) {
  }

  async createSubjectTeacher(body: SubjectTeacherDto): Promise<any> {
    const checking = await this.subjectTeacherModel.find({
      teacher_id: body.teacherId,
      subject_id: body.subjectId
    }).exec();

    if (checking.length > 0) {
      return {
        success: 0,
        message: "Subject teacher already added."
      };
    }

    return this.subjectTeacherModel.create(body);
  }

  async viewAll(): Promise<any> {
    return this.subjectTeacherModel.find().exec();
  }

  async viewOne(id: string): Promise<any> {
    return this.subjectTeacherModel.findById(id).exec();
  }

  async update(id: string, body: SubjectTeacherDto): Promise<any> {
    return this.subjectTeacherModel.findByIdAndUpdate(id, body, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.subjectTeacherModel.findByIdAndDelete(id).exec();
  }
}
