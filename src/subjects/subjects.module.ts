import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { Subjects, SubjectsSchema } from './schema/subjects.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Departments,
  DepartmentsSchema,
} from 'src/departments/schema/departments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subjects.name, schema: SubjectsSchema },
      { name: Departments.name, schema: DepartmentsSchema },
    ]),
  ],
  providers: [SubjectsService],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
