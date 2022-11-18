import { Module } from "@nestjs/common";
import { SubjectTeacherController } from "./subject_teacher.controller";
import { SubjectTeacherService } from "./subject_teacher.service";
import { SubjectTeacher, SubjectTeacherSchema } from "./schema/subject-teacher.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: SubjectTeacher.name, schema: SubjectTeacherSchema }])],
  controllers: [SubjectTeacherController],
  providers: [SubjectTeacherService]
})
export class SubjectTeacherModule {
}
