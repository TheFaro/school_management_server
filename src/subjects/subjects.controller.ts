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
import { SubjectsService } from './subjects.service';
import { Response } from 'express';
import { SubjectsArrayDto, SubjectsDto } from './dto/subjects.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post('register')
  async createSubject(@Body() body: SubjectsDto, @Res() response: Response) {
    if (!body.name || !body.departmentId || !body.level) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.subjectsService
      .createSubject(body)
      .then((res) => {
        if (res.success == 0) {
          response.status(400).json(res);
        } else {
          if (!res) {
            response.status(400).json({
              success: 0,
              message: 'Could not create new subject.',
            });
          } else {
            response.status(200).json({
              success: 1,
              message: 'Successfully created new subject.',
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

  @Post('register-array')
  async createSubjectArray(
    @Body() body: SubjectsArrayDto,
    @Res() response: Response,
  ) {
    if (body.subjects.length <= 0) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.subjectsService
      .createSubjectsArray(body.subjects)
      .then((res) => {
        if (res.success == 0) {
          response.status(400).json(res);
        } else {
          response.status(200).json(res);
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
  async viewAllSubject(@Res() response: Response) {
    this.subjectsService
      .viewAllSubjects()
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not retrieve subjects list.',
          });
        } else {
          response.status(200).json({
            success: 0,
            message: 'Successfully retrieved all subjects.',
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
  async viewOneSubject(@Param('id') id: string, @Res() response: Response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.subjectsService
      .viewOneSubject(id)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not retrieve selected subject.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully retrieved selected subject.',
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
  async updateSubject(
    @Param('id') id: string,
    @Body() body: SubjectsDto,
    @Res() response: Response,
  ) {
    if (
      id.length != 24 ||
      body.departmentId.length != 24 ||
      (!body.level && !body.name)
    ) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.subjectsService
      .updateSubject(id, body)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not updated subject',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully updated subject.',
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
  async deleteSubject(@Param('id') id: string, @Res() response: Response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.subjectsService
      .deleteSubject(id)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not delete subject.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully deleted selected subject.',
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
