import { Test, TestingModule } from '@nestjs/testing';
import { ClassStudentController } from './class_student.controller';

describe('ClassStudentController', () => {
  let controller: ClassStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassStudentController],
    }).compile();

    controller = module.get<ClassStudentController>(ClassStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
