import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
// import { UserRoles } from '../../user_roles/schema/user-roles.schema';
import { User } from '../../user/schemas/user.schema';

@Schema({ _id: false, timestamps: true })
export class Administrators {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;
}

@Schema({ timestamps: true })
export class SchoolInfo {
  @Prop()
  name: string;

  @Prop()
  region: string;

  @Prop()
  administrators: [Administrators];

  @Prop()
  email: string;
}

export const SchoolInfoSchema = SchemaFactory.createForClass(SchoolInfo);
