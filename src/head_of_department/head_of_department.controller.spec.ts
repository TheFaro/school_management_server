import { Test, TestingModule } from '@nestjs/testing';
import { HeadOfDepartmentController } from './head_of_department.controller';

describe('HeadOfDepartmentController', () => {
  let controller: HeadOfDepartmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeadOfDepartmentController],
    }).compile();

    controller = module.get<HeadOfDepartmentController>(HeadOfDepartmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
