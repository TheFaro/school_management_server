import { Test, TestingModule } from '@nestjs/testing';
import { ClassnameService } from './classname.service';

describe('ClassnameService', () => {
  let service: ClassnameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassnameService],
    }).compile();

    service = module.get<ClassnameService>(ClassnameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
