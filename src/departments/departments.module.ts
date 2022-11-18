import { Module } from "@nestjs/common";
import { DepartmentsService } from "./departments.service";
import { DepartmentsController } from "./departments.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Departments, DepartmentsSchema } from "./schema/departments.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Departments.name, schema: DepartmentsSchema }])],
  providers: [DepartmentsService],
  controllers: [DepartmentsController]
})
export class DepartmentsModule {
}
