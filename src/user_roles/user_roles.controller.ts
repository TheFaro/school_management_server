import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { UserRoleDto } from "./dto/user-role.dto";
import { UserRolesService } from "./user_roles.service";

@Controller("user-roles")
export class UserRolesController {
  constructor(private readonly userRoleService: UserRolesService) {
  }

  @Post("create")
  async newUserRole(@Body() body: UserRoleDto, @Res() response) {
    if (!body.name) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });

      return;
    }

    const role = this.userRoleService.createUserRole(body);

    role.then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not create new user role. Please try again."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully created new user role.",
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

  @Get("view-all")
  async viewAllUserRoles(@Res() response) {
    const roles = this.userRoleService.findAll();

    roles.then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not retrieve user roles."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully retrieved user roles.",
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
  async viewOneUserRole(@Param("id") id: string, @Res() response) {
    // check if id is valid
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });

      return;
    }

    const role = this.userRoleService.findOne(id);

    role.then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not find specified user role."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully retrieved user role.",
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
  async updateUserRole(@Param("id") id: string, @Body() newRole: UserRoleDto, @Res() response) {
    // check id
    if (id.length != 24) {
      response.status(400).json({
        success: 0,
        message: "Required fields missing"
      });

      return;
    }

    const updatedRole = this.userRoleService.updateOne(id, newRole);

    updatedRole.then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not updated user role."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully updated user role.",
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
  async deleteUserRole(@Param("id") id: string, @Res() response) {
    // check id
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    const deletedRole = this.userRoleService.deleteOne(id);

    deletedRole.then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not delete specified user role."
        });
      } else {
        if (res.deletedCount === 0) {
          response.status(400).json({
            success: 0,
            message: "Could not delete specified user role."
          });
        } else {
          response.status(200).json({
            success: 1,
            message: "Successfully deleted user role.",
            data: res
          });
        }
      }
    });
  }
}
