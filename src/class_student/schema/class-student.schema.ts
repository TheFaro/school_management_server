import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Classname } from "../../classname/schema/classname.schema";
import mongoose from "mongoose";
import { Students } from "../../students/schema/students.schema";

@Schema()
export class ClassStudent {
  @Prop({ type: mongoose.Schema.Types.ObjectId, name: Classname.name })
  class_id: Classname;

  @Prop({ type: mongoose.Schema.Types.ObjectId, name: Students.name })
  student_id: Students;

  @Prop()
  year: string;
}

export const ClassStudentSchema = SchemaFactory.createForClass(ClassStudent);