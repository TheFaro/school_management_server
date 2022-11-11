import { Module } from '@nestjs/common';
import { SchoolInfoService } from './school_info.service';
import { SchoolInfoController } from './school_info.controller';

@Module({
  providers: [SchoolInfoService],
  controllers: [SchoolInfoController]
})
export class SchoolInfoModule {}
