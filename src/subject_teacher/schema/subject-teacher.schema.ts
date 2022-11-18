import { Prop, Schema } from "@nestjs/mongoose";
import { Subjects } from "../../subjects/schema/subjects.schema";
import mongoose from "mongoose";
import { Teacher } from "../../teacher/schema/teacher.schema";

@Schema()
export class SubjectTeacher {
  @Prop({ type: mongoose.Schema.Types.ObjectId, name: Subjects.name })
  subject_id: Subjects;

  @Prop({ type: mongoose.Schema.Types.ObjectId, name: Teacher.name })
  teacher_id: Teacher;

}