import { Module } from "@nestjs/common";
import { MarksController } from "./marks.controller";
import { MarksService } from "./marks.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Mark, MarkSchema } from "./schema/marks.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Mark.name, schema: MarkSchema }])],
  controllers: [MarksController],
  providers: [MarksService]
})
export class MarksModule {
}
