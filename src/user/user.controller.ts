import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post("create")
  async createUser(@Body() user: UserDto, @Res() response) {
    // check required fields
    if (!user.name && !user.surname && !user.contact && !user.email && !user.userRole) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    const newUser = this.userService.create(user);

    newUser.then((res) => {
      if (res.surname == 0) {
        response.status(400).json(newUser);
      } else {
        if (!res) {
          response.status(400).json({
            success: 0,
            message: "Could not create new user."
          });
        } else {
          response.status(200).json({
            success: 1,
            message: "Successfully created new user account.",
            data: res
          });
        }
      }
    }).catch((err) => {
      response.status(500).json({
        success: 0,
        message: "Internal server error",
        error: err
      });
    });
  }

  @Get("view-all")
  async viewAllUsers(@Res() response) {
    this.userService.viewAllUsers().then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not retrieve users list."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully retrieved users list.",
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
  async viewOneUser(@Param("id") id: string, @Res() response) {
    // check user
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.userService.viewOneUser(id).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not retrieve specified user."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully retrieved user.",
          data: res
        });
      }
    }).catch((err) => {
      response.status(500).json({
        success: 0,
        message: "Internal server error",
        error: err
      });
    });
  }

  @Put("update/:id")
  async updateUser(@Param("id") id: string, @Body() newUser: UserDto, @Res() response) {
    if (!id && !newUser.name && !newUser.surname && !newUser.contact && !newUser.email && !newUser.userRole) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.userService.updateUser(id, newUser).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not update user."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully updated user profile.",
          data: res
        });
      }
    }).catch((err) => {
      response.status(500).json({
        success: 0,
        message: "Internal server error",
        error: err
      });
    });
  }

  @Delete("delete/:id")
  async deleteUser(@Param("id") id: string, @Res() response) {
    // checking id
    if (id.length != 24) {
      response.status(404).json({
        success: 0,
        message: "Required fields missing."
      });
      return;
    }

    this.userService.deleteUser(id).then((res) => {
      if (!res) {
        response.status(400).json({
          success: 0,
          message: "Could not delete user."
        });
      } else {
        response.status(200).json({
          success: 1,
          message: "Successfully deleted user."
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
