import { Injectable } from "@nestjs/common";
import { Classname } from "./schema/classname.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ClassnameDto } from "./dto/classname.dto";

@Injectable()
export class ClassnameService {
  constructor(@InjectModel(Classname.name) private readonly classnameModel: Model<Classname>) {
  }

  // function to add new class name
  async addNewClass(body: ClassnameDto): Promise<any> {
    const checking = await this.classnameModel.find({ name: body.name });

    if (checking.length > 0) {
      return {
        success: 0,
        message: "Class already exists."
      };
    }

    return this.classnameModel.create(body);
  }

  // function to get all classes
  async viewAllClassnames(): Promise<any> {
    return this.classnameModel.find().exec();
  }

  // function to update classes
  async updateClassname(id: string, body: ClassnameDto): Promise<any> {
    return this.classnameModel.findByIdAndUpdate(id, body, { new: true }).exec();
  }

  // function to delete classes
  async deleteClassname(id: string): Promise<any> {
    return this.classnameModel.findByIdAndDelete(id).exec();
  }
}
