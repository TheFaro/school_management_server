import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { SubjectTeacherService } from "./subject_teacher.service";
import { Response } from "express";
import { SubjectTeacherDto } from "./dto/subject-teacher.dto";

@Controller("subject-teacher")
export class SubjectTeacherController {
  constructor(private readonly subjectTeacherService: SubjectTeacherService) {
  }

  @Post("register")
  async register(@Body() body: SubjectTeacherDto, @Res() response: Response) {
    if (body.subjectId.length != 24 && body.teacherId.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.subjectTeacherService.createSubjectTeacher(body).then((res) => {
      if (res.success == 0) {
        response.status(400).json(res);
      } else {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: "Could not register subject teacher."
          });
        } else {
          response.status(200).json({
            success: 1,
            message: "Successfully registered subject teacher.",
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
  async viewAll(@Res() response: Response) {
    this.subjectTeacherService.viewAll().then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not retrieve subject teacher list."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully retrieved subject teacher list.",
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

  @Get("view-one/:id")
  async viewOne(@Param("id") id: string, @Res() response: Response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.subjectTeacherService.viewOne(id).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not retrieve selected subject teacher."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully retrieved selected subject teacher.",
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
  async update(@Param("id") id: string, @Body() body: SubjectTeacherDto, @Res() response: Response) {
    if (id.length != 24 && body.subjectId.length != 24 && body.teacherId.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.subjectTeacherService.update(id, body).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not update subject teacher."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully updated subject teacher.",
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
  async delete(@Param("id") id: string, @Res() response: Response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.subjectTeacherService.delete(id).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not delete subject teacher."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully deleted subject teacher.",
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
