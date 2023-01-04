import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserRoles {
  @Prop()
  name: string;

  @Prop()
  access_level: number;
}

export const UserRolesSchema = SchemaFactory.createForClass(UserRoles);
