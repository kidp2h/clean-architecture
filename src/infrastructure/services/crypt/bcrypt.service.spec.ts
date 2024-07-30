import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';
import { ICryptService } from '@/domain/adapters';
import { faker } from '@faker-js/faker';

describe('BcryptService', () => {
  let service: ICryptService;
  const password = faker.internet.password();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();
    service = module.get<ICryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be hashed', async () => {
    const hash = await service.hash(password);
    expect(hash).toBeDefined();
  });

  it('should be compared and correct', async () => {
    const hash = await service.hash(password);
    const compare = await service.compare(password, hash);
    expect(compare).toBe(true);
  });
});
