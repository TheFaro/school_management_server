import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { DepartmentsService } from "./departments.service";
import { DepartmentsDto } from "./dto/departments.dto";
import { Response } from "express";

@Controller("departments")
export class DepartmentsController {
  constructor(private readonly departmentService: DepartmentsService) {
  }

  @Post("create")
  async createDepartment(@Body() body: DepartmentsDto, @Res() response: Response) {
    if (!body.name) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.departmentService.createDepartment(body).then((res) => {
      if (res.success == 0) {
        response.status(400).json(res);
      } else {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: "Could not create new department."
          });
        } else {
          response.status(200).json({
            success: 1,
            message: "Successfully created new department.",
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
  async getAllDepartment(@Res() response: Response) {
    this.departmentService.viewAllDepartments().then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not retrieve departments list."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully retrieved departments list.",
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
  async updateDepartment(@Param("id") id: string, body: DepartmentsDto, @Res() response: Response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.departmentService.updateDepartment(id, body).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not update department."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully updated department.",
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
