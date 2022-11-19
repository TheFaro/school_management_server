import { Injectable } from "@nestjs/common";
import { Mark } from "./schema/marks.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MarksDto } from "./dto/marks.dto";

@Injectable()
export class MarksService {
  constructor(@InjectModel(Mark.name) private readonly markModel: Model<Mark>) {
  }

  async create(body: MarksDto): Promise<any> {
    const checking = await this.markModel.find({
      class_student_id: body.classStudentId,
      subject_teacher_id: body.subjectTeacherId,
      month: body.month,
      year: body.year
    }).exec();

    if (checking.length > 0) {
      return {
        success: 0,
        message: "Mark already added. Update instead."
      };
    }

    return this.markModel.create(body);
  }

  async viewByClassYear(classId: string, year: string): Promise<any> {
    return this.markModel.find({ class_student_id: classId, year: year }).exec();
  }

  async update(id: string, body: MarksDto): Promise<any> {
    return this.markModel.findByIdAndUpdate(id, body).exec();
  }

  async delete(id: string): Promise<any> {
    return this.markModel.findByIdAndDelete(id).exec();
  }
}
