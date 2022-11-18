import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { UserRolesModule } from "./user_roles/user_roles.module";
import { MongooseModule } from "@nestjs/mongoose";
import { SchoolInfoModule } from './school_info/school_info.module';
import { StudentsModule } from './students/students.module';
import { ClassnameModule } from './classname/classname.module';
import { TeacherModule } from './teacher/teacher.module';
import { ClassTeacherModule } from './class_teacher/class_teacher.module';
import { DepartmentsModule } from './departments/departments.module';
import { HeadOfDepartmentModule } from './head_of_department/head_of_department.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [UserModule, MongooseModule.forRoot("mongodb://localhost/school_management_server"), UserRolesModule, SchoolInfoModule, StudentsModule, ClassnameModule, TeacherModule, ClassTeacherModule, DepartmentsModule, HeadOfDepartmentModule, SubjectsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
