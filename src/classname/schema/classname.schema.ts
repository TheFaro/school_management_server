import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Classname {
  @Prop()
  name: string;
}

export const ClassnameSchema = SchemaFactory.createForClass(Classname);
