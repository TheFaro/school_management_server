import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Teacher {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  contact: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
