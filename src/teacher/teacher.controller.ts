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
import { TeacherService } from './teacher.service';
import { Response } from 'express';
import { TeacherDto } from './dto/teacher.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('register')
  async createTeacher(@Body() body: TeacherDto, @Res() response: Response) {
    if (!body.name || !body.surname || !body.contact) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.teacherService
      .createTeacher(body)
      .then((res) => {
        if (res.success == 0) {
          response.status(400).json(res);
        } else {
          if (!res) {
            response.status(400).json({
              success: 0,
              message: 'Could not register new teacher.',
            });
          } else {
            response.status(200).json({
              success: 1,
              message: 'Successfully registered new teacher.',
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
  async getAllTeachers(@Res() response: Response) {
    this.teacherService
      .viewAllTeachers()
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not retrieve teachers list.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully retrieved teachers list.',
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
  async updateTeacher(
    @Param('id') id: string,
    @Body() body: TeacherDto,
    @Res() response: Response,
  ) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.teacherService
      .updateTeacher(id, body)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not update teacher.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully updated teacher.',
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
  async deleteTeacher(@Param('id') id: string, @Res() response: Response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.teacherService
      .deleteTeacher(id)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not delete teacher.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully deleted teacher.',
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
