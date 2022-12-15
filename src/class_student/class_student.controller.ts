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
import { ClassStudentService } from './class_student.service';
import { ClassStudentDto } from './dto/class-student.dto';
import { Response } from 'express';

@Controller('class-student')
export class ClassStudentController {
  constructor(private readonly classStudentService: ClassStudentService) {}

  @Post('register')
  async create(@Body() body: ClassStudentDto, @Res() response: Response) {
    if (
      body.classId.length != 24 ||
      body.studentId.length != 24 ||
      !body.year
    ) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.classStudentService
      .create(body)
      .then((res) => {
        if (res.success == 0) response.status(400).json(res);
        else if (!res)
          response.status(400).json({
            success: 0,
            message: 'Could not register student in class.',
          });
        else
          response.status(200).json({
            success: 1,
            message: 'Successfully registered student in class.',
            data: res,
          });
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
  async viewAll(@Res() response: Response) {
    this.classStudentService
      .viewAll()
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not retrieve students list.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully retrieved students list.',
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

  @Get('view-year/:year')
  async viewByYear(@Param('year') year: string, @Res() response: Response) {
    if (!year) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.classStudentService
      .viewByYear(year)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not retrieve students by year.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully retrieved students by year.',
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

  @Get('view-class-year/:class/:year')
  async viewByClassYear(
    @Param('class') classId: string,
    @Param('year') year: string,
    @Res() response: Response,
  ) {
    if (classId.length != 24 || !year) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.classStudentService
      .viewByClassAndYear(classId, year)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not retrieve students by class and year.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully retrieved students by class and year.',
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
  async update(
    @Param('id') id: string,
    @Body() body: ClassStudentDto,
    @Res() response: Response,
  ) {
    if (
      id.length != 24 ||
      body.classId.length != 24 ||
      body.studentId.length != 24 ||
      body.year.length != 4
    ) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.classStudentService
      .update(id, body)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not update class student.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully updated class student.',
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

  @Delete('delete/:id')
  async delete(@Param('id') id: string, @Res() response: Response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.classStudentService
      .delete(id)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not delete class student.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully deleted class student.',
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
