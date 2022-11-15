import { Module } from "@nestjs/common";
import { ClassnameController } from "./classname.controller";
import { ClassnameService } from "./classname.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Classname, ClassnameSchema } from "./schema/classname.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Classname.name, schema: ClassnameSchema }])],
  controllers: [ClassnameController],
  providers: [ClassnameService]
})
export class ClassnameModule {
}
