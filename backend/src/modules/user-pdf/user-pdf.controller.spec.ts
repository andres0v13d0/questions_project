import { Test, TestingModule } from '@nestjs/testing';
import { UserPdfController } from './user-pdf.controller';

describe('UserPdfController', () => {
  let controller: UserPdfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPdfController],
    }).compile();

    controller = module.get<UserPdfController>(UserPdfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
