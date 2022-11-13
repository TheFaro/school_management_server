import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User, UserSchema } from "./schemas/user.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRoles, UserRolesSchema } from "../user_roles/schema/user-roles.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, {
    name: UserRoles.name,
    schema: UserRolesSchema
  }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {
}
