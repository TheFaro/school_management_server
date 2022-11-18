import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Teacher } from "../../teacher/schema/teacher.schema";
import { Departments } from "../../departments/schema/departments.schema";

@Schema()
export class Hod {
  @Prop({ type: mongoose.Schema.Types.ObjectId, name: Teacher.name })
  teacher_id: Teacher;

  @Prop({ type: mongoose.Schema.Types.ObjectId, name: Departments.name })
  department_id: Departments;

  @Prop()
  year: string;
}

export const HodSchema = SchemaFactory.createForClass(Hod);