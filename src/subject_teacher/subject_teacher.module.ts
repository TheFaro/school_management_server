import { Module } from '@nestjs/common';
import { SubjectTeacherController } from './subject_teacher.controller';
import { SubjectTeacherService } from './subject_teacher.service';

@Module({
  controllers: [SubjectTeacherController],
  providers: [SubjectTeacherService]
})
export class SubjectTeacherModule {}
