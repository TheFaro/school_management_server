import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Departments } from './schema/departments.schema';
import { Model } from 'mongoose';
import { DepartmentsDto } from './dto/departments.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Departments.name)
    private readonly departmentsModel: Model<Departments>,
  ) {}

  async createDepartment(body: DepartmentsDto): Promise<any> {
    const checking = await this.departmentsModel
      .find({ name: body.name })
      .exec();

    if (checking.length > 0) {
      return {
        success: 0,
        message: 'Department already exists.',
      };
    }

    return this.departmentsModel.create(body);
  }

  // function to add departments from array
  async addDepartmentsArray(departments: [DepartmentsDto]): Promise<any> {
    let created = false;

    for (let i = 0; i < departments.length; i++) {
      // console.info(`${typeof departments[i]}`);
      await this.departmentsModel.create(departments[i]);
      if (created == false) created = true;
    }

    // if created get all departments
    const depts = await this.departmentsModel.find({}).exec();
    console.log(depts);
    if (created) {
      return {
        success: 1,
        message: 'Successfully registered departments.',
        data: depts,
      };
    } else {
      return {
        success: 0,
        message: 'Could not register departments.',
      };
    }
  }

  async viewAllDepartments(): Promise<any> {
    return this.departmentsModel.find();
  }

  async updateDepartment(id: string, body: DepartmentsDto): Promise<any> {
    return this.departmentsModel.findByIdAndUpdate(id, body).exec();
  }

  async deleteDepartment(id: string): Promise<any> {
    return this.departmentsModel.findByIdAndDelete(id).exec();
  }
}
