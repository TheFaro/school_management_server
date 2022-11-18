import { Module } from "@nestjs/common";
import { SubjectsService } from "./subjects.service";
import { SubjectsController } from "./subjects.controller";
import { Subjects, SubjectsSchema } from "./schema/subjects.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: Subjects.name, schema: SubjectsSchema }])],
  providers: [SubjectsService],
  controllers: [SubjectsController]
})
export class SubjectsModule {
}
