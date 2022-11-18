import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Departments } from "../../departments/schema/departments.schema";

@Schema()
export class Subjects {
  @Prop()
  name: string;

  @Prop({ types: mongoose.Schema.Types.ObjectId, name: Departments.name })
  department_id: Departments;

  @Prop()
  level: string;  // Secondary or High School
}