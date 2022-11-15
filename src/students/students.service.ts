import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Students } from "./schema/students.schema";
import { InjectModel } from "@nestjs/mongoose";
import { StudentsDto } from "./dto/students.dto";

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Students.name) private readonly studentsModel: Model<Students>) {
  }

  // function to add new student
  async createStudent(student: StudentsDto): Promise<any> {
    // check if student created yet
    const checking = await this.studentsModel.find({
      name: student.name,
      surname: student.surname,
      student_contact: student.student_contact
    }).exec();

    if (checking.length > 0) {
      return {
        success: 0,
        message: "Student has already been registered."
      };
    }

    return this.studentsModel.create(student);
  }

  // function to view all students
  async viewAllStudents(): Promise<any> {
    return this.studentsModel.find().exec();
  }

  // function to view student by id
  async viewStudentById(id: string): Promise<any> {
    return this.studentsModel.find({ _id: id }).exec();
  }

  // function to update student
  async updateStudent(id: string, body: StudentsDto): Promise<any> {
    return this.studentsModel.findByIdAndUpdate(id, body).exec();
  }

  // function to delete student
  async deleteStudent(id: string): Promise<any> {
    return this.studentsModel.deleteOne({ _id: id }).exec();
  }
}
