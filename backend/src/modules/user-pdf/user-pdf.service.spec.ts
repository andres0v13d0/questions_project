import { Test, TestingModule } from '@nestjs/testing';
import { UserPdfService } from './user-pdf.service';

describe('UserPdfService', () => {
  let service: UserPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPdfService],
    }).compile();

    service = module.get<UserPdfService>(UserPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
