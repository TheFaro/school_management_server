import { Injectable } from '@nestjs/common';
import { Classname } from './schema/classname.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ClassnameDto } from './dto/classname.dto';
// import { stringify } from 'querystring';

@Injectable()
export class ClassnameService {
  constructor(
    @InjectModel(Classname.name)
    private readonly classnameModel: Model<Classname>,
  ) {}

  // function to add new class name
  async addNewClass(body: ClassnameDto): Promise<any> {
    const checking = await this.classnameModel.find({ name: body.name });

    if (checking.length > 0) {
      return {
        success: 0,
        message: 'Class already exists.',
      };
    }

    return this.classnameModel.create(body);
  }

  // function to add class names from array
  async addClassArray(classes: [ClassnameDto]): Promise<any> {
    let created = false;
    for (let i = 0; i < classes.length; i++) {
      // console.info(`${typeof classes[i]}`);
      this.classnameModel.create(classes[i]);
      if (created == false) created = true;
    }

    if (created) {
      return {
        success: 1,
        message: 'Successfully registered class names.',
      };
    } else {
      return {
        success: 0,
        message: 'Could not register class names.',
      };
    }
  }

  // function to get all classes
  async viewAllClassnames(): Promise<any> {
    return this.classnameModel.find().exec();
  }

  // function to update classes
  async updateClassname(id: string, body: ClassnameDto): Promise<any> {
    return this.classnameModel
      .findByIdAndUpdate(id, body, { new: true })
      .exec();
  }

  // function to delete classes
  async deleteClassname(id: string): Promise<any> {
    return this.classnameModel.findByIdAndDelete(id).exec();
  }
}
