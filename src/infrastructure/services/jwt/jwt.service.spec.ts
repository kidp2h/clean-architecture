import { Test, TestingModule } from '@nestjs/testing';
import { IJwtPayload, IJwtService } from '@/domain/adapters';
import { faker } from '@faker-js/faker';

import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';

const mockPayload: IJwtPayload = {
  id: faker.string.uuid(),
  username: faker.internet.userName(),
};
describe('JwtService', () => {
  let service: IJwtService;
  const password = faker.internet.password();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        Jwt.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        }),
      ],
      providers: [JwtTokenService],
    }).compile();
    service = module.get<IJwtService>(JwtTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not decode', async () => {
    const hash = await service.decode('invalid token');
    expect(hash).toBeNull();
  });

  it('should be encode with params', async () => {
    const hash = await service.encode(mockPayload, '123', '1h');
    const decode = await service.decode(hash, '123');
    expect(decode.id).toEqual(mockPayload.id);
  });

  it('should be encode without params', async () => {
    const hash = await service.encode(mockPayload);
    const decode = await service.decode(hash);
    expect(decode.id).toEqual(mockPayload.id);
  });
});
