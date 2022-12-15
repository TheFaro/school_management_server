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
import { MarksService } from './marks.service';
import { Response } from 'express';
import { MarksDto } from './dto/marks.dto';

@Controller('marks')
export class MarksController {
  constructor(private readonly markService: MarksService) {}

  @Post('add')
  async create(@Body() body: MarksDto, @Res() response: Response) {
    if (
      body.year.length != 4 ||
      !body.month ||
      !body.mark ||
      body.subjectTeacherId.length != 24 ||
      body.classStudentId.length != 24
    ) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.markService
      .create(body)
      .then((res) => {
        if (res.success == 0) {
          response.status(400).json(res);
        } else {
          if (!res) {
            response.status(400).json({
              success: 0,
              message: 'Could not add mark.',
            });
          } else {
            response.status(200).json({
              success: 1,
              message: 'Successfully added mark.',
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

  @Get('view/:class/:year')
  async viewClassYear(
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

    this.markService
      .viewByClassYear(classId, year)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: `Could not retrieve class marks for the year ${year}.`,
          });
        } else {
          response.status(200).json({
            success: 1,
            message: `Successfully retrieved class marks for ${year}.`,
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
    @Body() body: MarksDto,
    @Res() response: Response,
  ) {
    if (
      id.length != 24 ||
      (!body.mark && !body.year) ||
      (!body.month && body.classStudentId.length != 24) ||
      body.subjectTeacherId.length != 24
    ) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.markService
      .update(id, body)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not updated learner mark',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully updated learner mark.',
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

    this.markService
      .delete(id)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not delete mark.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully deleted mark.',
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
