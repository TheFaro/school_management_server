import { Module } from "@nestjs/common";
import { UserRolesService } from "./user_roles.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRoles, UserRolesSchema } from "./schema/user-roles.schema";
import { UserRolesController } from './user_roles.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserRoles.name, schema: UserRolesSchema }])
  ],
  providers: [UserRolesService],
  controllers: [UserRolesController]
})
export class UserRolesModule {
}
