import { Test, TestingModule } from '@nestjs/testing';
import { ClassTeacherController } from './class_teacher.controller';

describe('ClassTeacherController', () => {
  let controller: ClassTeacherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassTeacherController],
    }).compile();

    controller = module.get<ClassTeacherController>(ClassTeacherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
