import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserRoles } from "../../user_roles/schema/user-roles.schema";

@Schema()
export class User {

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  contact: string;

  @Prop()
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "UserRoles" })
  user_role: UserRoles;
}