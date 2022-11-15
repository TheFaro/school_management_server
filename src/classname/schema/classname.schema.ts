import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Classname {
  @Prop()
  name: string;
}

export const ClassnameSchema = SchemaFactory.createForClass(Classname);