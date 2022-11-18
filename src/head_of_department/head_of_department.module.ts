import { Module } from '@nestjs/common';
import { HeadOfDepartmentService } from './head_of_department.service';
import { HeadOfDepartmentController } from './head_of_department.controller';

@Module({
  providers: [HeadOfDepartmentService],
  controllers: [HeadOfDepartmentController]
})
export class HeadOfDepartmentModule {}
