import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsDto } from './dto/students.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('register')
  async createStudent(@Body() body: StudentsDto, @Res() response) {
    if ((!body.name && !body.surname) || !body.student_contact) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.studentsService
      .createStudent(body)
      .then((res) => {
        if (res.success == 0) {
          response.status(400).json(res);
        } else {
          if (!res) {
            response.status(400).json({
              success: 0,
              message: 'Could not register new student.',
            });
          } else {
            response.status(200).json({
              success: 1,
              message: 'Successfully registered new student.',
              data: res,
            });
          }
        }
      })
      .catch((err) => {
        response.status(500).json({
          success: 0,
          message: 'Internal server error.',
          error: err,
        });
      });
  }

  @Get('view-all')
  async getStudents(@Res() response) {
    this.studentsService
      .viewAllStudents()
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not retrieve students list.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully retrived students list.',
            data: res,
          });
        }
      })
      .catch((err) => {
        response.status(500).json({
          success: 0,
          message: 'Internal server error.',
          error: err,
        });
      });
  }

  @Get('view-one/:id')
  async getOneStudent(@Param('id') id: string, @Res() response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.studentsService
      .viewStudentById(id)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not retrieve student',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully retrieved student.',
            data: res,
          });
        }
      })
      .catch((err) => {
        response.status(500).json({
          success: 0,
          message: 'Internal server error.',
          error: err,
        });
      });
  }

  @Put('update/:id')
  async updateStudent(
    @Param('id') id: string,
    @Body() student: StudentsDto,
    @Res() response,
  ) {
    if (
      id.length != 24 ||
      !student.name ||
      !student.surname ||
      !student.student_contact ||
      !student.year_of_admission
    ) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.studentsService
      .updateStudent(id, student)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not update student information.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully updated student information.',
            data: res,
          });
        }
      })
      .catch((err) => {
        response.status(500).json({
          success: 0,
          message: 'Internal server error.1',
          error: err,
        });
      });
  }

  @Delete('delete/:id')
  async deleteStudent(@Param('id') id: string, @Res() response) {
    if (id.length != 24) {
      response.status(400).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.studentsService
      .deleteStudent(id)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not delete selected student.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully deleted selected student.',
            data: res,
          });
        }
      })
      .catch((err) => {
        response.status(500).json({
          success: 0,
          message: 'Internal server error.',
          error: err,
        });
      });
  }
}
