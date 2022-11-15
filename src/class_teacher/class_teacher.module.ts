import { Module } from '@nestjs/common';
import { ClassTeacherService } from './class_teacher.service';
import { ClassTeacherController } from './class_teacher.controller';

@Module({
  providers: [ClassTeacherService],
  controllers: [ClassTeacherController]
})
export class ClassTeacherModule {}
