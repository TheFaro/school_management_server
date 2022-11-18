import { Module } from "@nestjs/common";
import { HeadOfDepartmentService } from "./head_of_department.service";
import { HeadOfDepartmentController } from "./head_of_department.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Hod, HodSchema } from "./schema/hod.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Hod.name, schema: HodSchema }])],
  providers: [HeadOfDepartmentService],
  controllers: [HeadOfDepartmentController]
})
export class HeadOfDepartmentModule {
}
