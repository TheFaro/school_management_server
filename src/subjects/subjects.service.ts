import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subjects } from './schema/subjects.schema';
import { Model } from 'mongoose';
import { SubjectsDto } from './dto/subjects.dto';
import { Departments } from 'src/departments/schema/departments.schema';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subjects.name) private readonly subjectsModel: Model<Subjects>,
    @InjectModel(Departments.name)
    private readonly departmentsModel: Model<Departments>,
  ) {}

  async createSubject(body: SubjectsDto): Promise<any> {
    const checking = await this.subjectsModel
      .find({
        name: body.name,
        department_id: body.departmentId,
        level: body.level,
      })
      .exec();

    if (checking.length > 0) {
      return {
        success: 0,
        message: 'Subject already created.',
      };
    }

    return this.subjectsModel.create(body);
  }

  async createSubjectsArray(subjects: [SubjectsDto]): Promise<any> {
    let created = false;

    for (let i = 0; i < subjects.length; i++) {
      await this.subjectsModel
        .create(subjects[i])
        .then(() => {
          if (created == false) created = true;
        })
        .catch((err) => {
          return {
            success: 0,
            message: `Error occurred while adding subject ${subjects[i].name}.`,
            error: err,
          };
        });
    }

    // get created subjects
    const subs = await this.subjectsModel
      .find({})
      .populate('department_id', '', this.departmentsModel)
      .exec();

    if (!subs.length || subs.length == 0) {
      return {
        success: 0,
        message: 'Could not register subjects.',
      };
    } else {
      return {
        success: 1,
        message: 'Successsfully registered subjects.',
        data: subs,
      };
    }
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
