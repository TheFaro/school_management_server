import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Hod } from "./schema/hod.schema";
import { Model } from "mongoose";
import { HodDto } from "./dto/hod.dto";

@Injectable()
export class HeadOfDepartmentService {
  constructor(@InjectModel(Hod.name) private readonly hodModel: Model<Hod>) {
  }

  async registerHod(body: HodDto): Promise<any> {
    const checking = await this.hodModel.find({
      teacher_id: body.teacherId,
      department_id: body.departmentId,
      year: body.year
    }).exec();

    if (checking.length > 0) {
      return {
        success: 0,
        message: "Teacher has already been registered as a Head of Department."
      };
    }

    return this.hodModel.create(body);
  }

  async viewAllHod(): Promise<any> {
    return this.hodModel.find().exec();
  }

  async viewOneHod(id: string): Promise<any> {
    return this.hodModel.findById(id).exec();
  }

  async updateHod(id: string, body: HodDto): Promise<any> {
    return this.hodModel.findByIdAndUpdate(id, body).exec();
  }

  async deleteHod(id): Promise<any> {
    return this.hodModel.findByIdAndDelete(id).exec();
  }
}
