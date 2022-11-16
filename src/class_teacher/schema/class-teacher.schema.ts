import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Teacher } from "../../teacher/schema/teacher.schema";
import mongoose from "mongoose";
import { Classname } from "../../classname/schema/classname.schema";

@Schema({ timestamps: true })
export class ClassTeacher {
  @Prop({ type: mongoose.Schema.Types.ObjectId, name: Teacher.name })
  teacher_id: Teacher;

  @Prop({ type: mongoose.Schema.Types.ObjectId, name: Classname.name })
  class_id: Classname;

  @Prop()
  year: string;
}

export const ClassTeacherSchema = SchemaFactory.createForClass(ClassTeacher);