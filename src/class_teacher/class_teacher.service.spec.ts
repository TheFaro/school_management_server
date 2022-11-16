import { Test, TestingModule } from '@nestjs/testing';
import { ClassTeacherService } from './class_teacher.service';

describe('ClassTeacherService', () => {
  let service: ClassTeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassTeacherService],
    }).compile();

    service = module.get<ClassTeacherService>(ClassTeacherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
