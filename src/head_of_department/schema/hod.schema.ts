import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Teacher } from "../../teacher/schema/teacher.schema";
import { Departments } from "../../departments/schema/departments.schema";

@Schema()
export class HodSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, name: Teacher.name })
  teacher_id: Teacher;

  @Prop({ type: mongoose.Schema.Types.ObjectId, name: Departments.name })
  department_id: Departments;
}