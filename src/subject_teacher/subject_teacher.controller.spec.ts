import { Test, TestingModule } from '@nestjs/testing';
import { SubjectTeacherController } from './subject_teacher.controller';

describe('SubjectTeacherController', () => {
  let controller: SubjectTeacherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectTeacherController],
    }).compile();

    controller = module.get<SubjectTeacherController>(SubjectTeacherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
