import { Module } from '@nestjs/common';
import { ClassStudentService } from './class_student.service';
import { ClassStudentController } from './class_student.controller';

@Module({
  providers: [ClassStudentService],
  controllers: [ClassStudentController]
})
export class ClassStudentModule {}
