import { Test, TestingModule } from '@nestjs/testing';
import { SchoolInfoService } from './school_info.service';

describe('SchoolInfoService', () => {
  let service: SchoolInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolInfoService],
    }).compile();

    service = module.get<SchoolInfoService>(SchoolInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
