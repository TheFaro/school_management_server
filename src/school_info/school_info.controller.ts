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
import { SchoolInfoService } from './school_info.service';
import { SchoolInfoDto } from './dto/school-info.dto';

@Controller('school-info')
export class SchoolInfoController {
  constructor(private readonly schoolService: SchoolInfoService) {}

  @Post('create')
  async createSchoolProfile(@Body() body: SchoolInfoDto, @Res() response) {
    if (!body.name || !body.email || !body.region) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.schoolService
      .createNewSchool(body)
      .then((res) => {
        if (res.success == 0) {
          response.status(400).json(res);
        } else {
          if (!res) {
            response.status(400).json({
              success: 0,
              message: 'Could not create new school profile.',
            });
          } else {
            response.status(200).json({
              success: 1,
              message: 'Successfully created new school profile.',
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

  @Get('view-profile/:id')
  async viewSchoolProfile(@Param('id') id: string, @Res() response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.schoolService
      .viewSchoolProfile(id)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not retrieve school profile.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully retrieved school profile.',
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
  async updateSchoolProfile(
    @Param('id') id: string,
    @Body() body: SchoolInfoDto,
    @Res() response,
  ) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.schoolService.updateSchoolProfile(id, body).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: 'Could not update school profile.',
        });
      } else {
        response.status(200).json({
          success: 1,
          message: 'Successfully updated school profile.',
          data: res,
        });
      }
    });
  }

  @Delete('delete/:id')
  async deleteSchoolProfile(@Param('id') id: string, @Res() response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });
      return;
    }

    this.schoolService
      .deleteSchool(id)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not delete school profile.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully deleted school profile.',
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

  @Get('get-admin/:id')
  async getAdministrators(@Param('id') id: string, @Res() response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: 'Required fields missing.',
      });

      return;
    }

    this.schoolService
      .getSchoolAdminstrators(id)
      .then((res) => {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: 'Could not retrieve school administrators list.',
          });
        } else {
          response.status(200).json({
            success: 1,
            message: 'Successfully retrieved school administrators.',
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
