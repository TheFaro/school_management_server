import { Module } from "@nestjs/common";
import { SchoolInfoService } from "./school_info.service";
import { SchoolInfoController } from "./school_info.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { SchoolInfo, SchoolInfoSchema } from "./schema/school-info.schema";
import { User, UserSchema } from "../user/schemas/user.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: SchoolInfo.name, schema: SchoolInfoSchema }, {
    name: User.name,
    schema: UserSchema
  }])],
  providers: [SchoolInfoService],
  controllers: [SchoolInfoController]
})
export class SchoolInfoModule {
}
