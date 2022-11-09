import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { UserRolesModule } from "./user_roles/user_roles.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [UserModule, MongooseModule.forRoot("mongodb://localhost/school_management_server"), UserRolesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
