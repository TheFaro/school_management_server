import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { ClassStudent } from "../../class_student/schema/class-student.schema";
import { SubjectTeacher } from "../../subject_teacher/schema/subject-teacher.schema";

export type MarkDocument = Mark & Document;

@Schema()
export class Mark {
  @Prop({ type: mongoose.Schema.Types.ObjectId, name: ClassStudent.name })
  class_student_id: ClassStudent;

  @Prop()
  mark: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, name: SubjectTeacher.name })
  subject_teacher_id: SubjectTeacher;

  @Prop()
  month: string;

  @Prop()
  year: string;
}

export const MarkSchema = SchemaFactory.createForClass(Mark);