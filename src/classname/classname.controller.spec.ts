import { Test, TestingModule } from '@nestjs/testing';
import { ClassnameController } from './classname.controller';

describe('ClassnameController', () => {
  let controller: ClassnameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassnameController],
    }).compile();

    controller = module.get<ClassnameController>(ClassnameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
