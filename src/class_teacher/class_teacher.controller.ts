import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { ClassTeacherService } from "./class_teacher.service";
import { ClassTeacherDto } from "./dto/class-teacher.dto";
import { Response } from "express";

@Controller("class-teacher")
export class ClassTeacherController {
  constructor(private readonly classTeacherService: ClassTeacherService) {
  }

  @Post("register")
  async createClassTeacher(@Body() body: ClassTeacherDto, @Res() response: Response) {
    if (!body.year && body.class_id.length != 24 && body.teacher_id.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.classTeacherService.createClassTeacher(body).then((res) => {
      if (res.success == 0) {
        response.status(400).json(res);
      } else {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: "Could not register new class teacher."
          });
        } else {
          response.status(200).json({
            success: 1,
            message: "Successfully registered new class teacher.",
            data: res
          });
        }
      }
    }).catch((err) => {
      response.status(500).json({
        success: 0,
        message: "Internal server error.",
        error: err
      });
    });
  }

  @Get("view-all")
  async viewAllClassTeacher(@Res() response: Response) {
    this.classTeacherService.viewAllClassTeachers().then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not retrieve all class teachers."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully retrieved all class teachers.",
          data: res
        });
      }
    }).catch((err) => {
      response.status(500).json({
        success: 0,
        message: "Internal server error.",
        error: err
      });
    });
  }

  @Get("view-year/:year")
  async viewClassTeachersByYear(@Param("year") year: string, @Res() response: Response) {
    if (!year && year.length != 4) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.classTeacherService.viewByYear(year).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not retrieve class teachers list."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully retrieved class teacher list.",
          data: res
        });
      }
    }).catch((err) => {
      response.status(500).json({
        success: 0,
        message: "Internal server error.",
        error: err
      });
    });
  }

  @Get("view-class/:classId")
  async viewClassTeacherByClassId(@Param("classId") classId: string, @Res() response: Response) {
    if (classId.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.classTeacherService.viewByClassId(classId).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not retrieve class teacher list."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully retrieved class teachers list.",
          data: res
        });
      }
    }).catch((err) => {
      response.status(500).json({
        success: 0,
        message: "Internal server error.",
        error: err
      });
    });
  }

  @Put("update/:id")
  async updateClassTeacher(@Param("id") id: string, @Body() body: ClassTeacherDto, @Res() response: Response) {
    if (id.length != 24 && body.class_id.length != 24 && body.class_id.length != 24 && body.year.length != 4) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.classTeacherService.updateClassTeacher(id, body).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not update class teacher."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully updated class teacher.",
          data: res
        });
      }
    }).catch((err) => {
      response.status(500).json({
        success: 0,
        message: "Internal server error.",
        error: err
      });
    });
  }

  @Delete("delete/:id")
  async deleteClassTeacher(@Param("id") id: string, @Res() response: Response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.classTeacherService.deleteClassTeacher(id).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not delete class teacher."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully deleted class teacher.",
          data: res
        });
      }
    }).catch((err) => {
      response.status(500).json({
        success: 0,
        message: "Internal server error.",
        error: err
      });
    });
  }
}
