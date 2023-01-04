import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Departments } from '../../departments/schema/departments.schema';

@Schema({ timestamps: true })
export class Subjects {
  @Prop()
  name: string;

  @Prop({ types: mongoose.Schema.Types.ObjectId, name: Departments.name })
  department_id: Departments;

  @Prop()
  level: string; // secondary or high_school
}

export const SubjectsSchema = SchemaFactory.createForClass(Subjects);
