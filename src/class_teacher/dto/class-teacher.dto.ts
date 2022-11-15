import { Teacher } from "../../teacher/schema/teacher.schema";
import { Classname } from "../../classname/schema/classname.schema";

export class ClassTeacherDto {
  readonly teacher_id: Teacher;
  readonly class_id: Classname;
  readonly year: string;
}