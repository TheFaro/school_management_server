import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { HeadOfDepartmentService } from "./head_of_department.service";
import { Response } from "express";
import { HodDto } from "./dto/hod.dto";

@Controller("head-of-department")
export class HeadOfDepartmentController {
  constructor(private readonly hodService: HeadOfDepartmentService) {
  }

  @Post("register")
  async createHod(@Body() body: HodDto, @Res() response: Response) {
    if (body.teacherId.length != 24 && body.departmentId.length != 24 && body.year.length != 4) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.hodService.registerHod(body).then((res) => {
      if (res.success == 0) {
        response.status(400).json(res);
      } else {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: "Could not register new Head of Department."
          });
        } else {
          response.status(200).json({
            success: 1,
            message: "Successfully registered new Head of Department.",
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
  async viewAllHods(@Res() response: Response) {
    this.hodService.viewAllHod().then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not retrieve all Head of Departments."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully retrieved all Head of Departments.",
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
  async viewOneHod(@Param("id") id: string, @Res() response: Response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.hodService.viewOneHod(id).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not retrieve specified Head of Department"
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully retrieved Head of Department.",
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
  async updateHod(@Param("id") id: string, @Body() body: HodDto, @Res() response: Response) {
    if (id.length != 24 && !body) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.hodService.updateHod(id, body).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not update Head of Department."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully updated Head of Department.",
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
  async deleteHod(@Param("id") id: string, @Res() response: Response) {
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
    }

    this.hodService.deleteHod(id).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not delete Head of Department."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully deleted Head of Department.",
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
