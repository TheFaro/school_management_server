import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { UserRolesModule } from "./user_roles/user_roles.module";
import { MongooseModule } from "@nestjs/mongoose";
import { SchoolInfoModule } from './school_info/school_info.module';

@Module({
  imports: [UserModule, MongooseModule.forRoot("mongodb://localhost/school_management_server"), UserRolesModule, SchoolInfoModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
