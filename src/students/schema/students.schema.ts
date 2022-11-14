import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Students {

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  year_of_admission?: string;

  @Prop()
  student_contact: string;
}

export const StudentsSchema = SchemaFactory.createForClass(Students);