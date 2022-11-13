import { Test, TestingModule } from '@nestjs/testing';
import { SchoolInfoController } from './school_info.controller';

describe('SchoolInfoController', () => {
  let controller: SchoolInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolInfoController],
    }).compile();

    controller = module.get<SchoolInfoController>(SchoolInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
