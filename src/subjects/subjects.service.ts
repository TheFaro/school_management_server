import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Subjects } from "./schema/subjects.schema";
import { Model } from "mongoose";
import { SubjectsDto } from "./dto/subjects.dto";

@Injectable()
export class SubjectsService {
  constructor(@InjectModel(Subjects.name) private readonly subjectsModel: Model<Subjects>) {
  }

  async createSubject(body: SubjectsDto): Promise<any> {
    const checking = await this.subjectsModel.find({
      name: body.name,
      department_id: body.departmentId,
      level: body.level
    }).exec();

    if (checking.length > 0) {
      return {
        success: 0,
        message: "Subject already created."
      };
    }

    return this.subjectsModel.create(body);
  }

  async viewAllSubjects(): Promise<any> {
    return this.subjectsModel.find().exec();
  }

  async viewOneSubject(id: string): Promise<any> {
    return this.subjectsModel.findById(id).exec();
  }

  async updateSubject(id: string, body: SubjectsDto): Promise<any> {
    return this.subjectsModel.findByIdAndUpdate(id, body).exec();
  }

  async deleteSubject(id: string): Promise<any> {
    return this.subjectsModel.findByIdAndDelete(id).exec();
  }
}
