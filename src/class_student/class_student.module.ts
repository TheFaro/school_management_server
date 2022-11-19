import { Module } from "@nestjs/common";
import { ClassStudentService } from "./class_student.service";
import { ClassStudentController } from "./class_student.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ClassStudent, ClassStudentSchema } from "./schema/class-student.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: ClassStudent.name, schema: ClassStudentSchema }])],
  providers: [ClassStudentService],
  controllers: [ClassStudentController]
})
export class ClassStudentModule {
}
