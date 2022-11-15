import { Module } from "@nestjs/common";
import { ClassTeacherService } from "./class_teacher.service";
import { ClassTeacherController } from "./class_teacher.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ClassTeacher, ClassTeacherSchema } from "./schema/class-teacher.schema";
import { Teacher, TeacherSchema } from "../teacher/schema/teacher.schema";
import { Classname, ClassnameSchema } from "../classname/schema/classname.schema";

@Module({
  imports: [MongooseModule.forFeature([
    { name: ClassTeacher.name, schema: ClassTeacherSchema },
    { name: Teacher.name, schema: TeacherSchema },
    { name: Classname.name, schema: ClassnameSchema }
  ])],
  providers: [ClassTeacherService],
  controllers: [ClassTeacherController]
})
export class ClassTeacherModule {
}
