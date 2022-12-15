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
import { Response } from 'express';
import { ClassnameService } from './classname.service';
import { ClassnameArrayDto } from './dto/classname-array.dto';
import { ClassnameDto } from './dto/classname.dto';

@Controller('classname')
export class ClassnameController {
  constructor(private readonly classnameService: ClassnameService) {}

  @Post('register')
  async createClassname(@Body() body: ClassnameDto, @Res() response: Response) {
    if (!body.name) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.classnameService
      .addNewClass(body)
      .then((res) => {
        if (res.success == 0) {
          response.status(400).json(res);
        } else {
          if (!res) {
            response.status(400).json({
              success: 0,
              message: 'Could not register new class.',
            });
          } else {
            response.status(200).json({
              success: 1,
              message: 'Successfully registered new class.',
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
  async registerWithArray(
    @Body() body: ClassnameArrayDto,
    @Res() response: Response,
  ) {
    // console.log(`Somewhere here: ${body.names.length}`);
    if (body.names.length <= 0) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.classnameService
      .addClassArray(body.names)
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
  async viewAllClasses(@Res() response) {
    this.classnameService
      .viewAllClassnames()
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not retrieve classes list.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully retrieved classes list.',
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
  async updateClassname(
    @Param('id') id: string,
    @Body() body: ClassnameDto,
    @Res() response,
  ) {
    if (id.length != 24 || !body.name) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.classnameService
      .updateClassname(id, body)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not updated class.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully updated class.',
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
  async deleteClass(@Param('id') id: string, @Res() response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.classnameService
      .deleteClassname(id)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not delete class.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully deleted class.',
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
