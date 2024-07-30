import { Test, TestingModule } from '@nestjs/testing';
import { IJwtPayload, IJwtService } from '@/domain/adapters';
import { faker } from '@faker-js/faker';

import { JwtModule as Jwt, JwtService } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';
import { UserEntity } from '@/domain/user';
import { UserModel } from '@/infrastructure/typeorm/models';

const mockPayload: IJwtPayload = {
  id: faker.string.uuid(),
  username: faker.internet.userName(),
};
describe('JwtService', () => {
  let service: IJwtService;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        Jwt.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        }),
      ],
      providers: [JwtTokenService, JwtService],
    })

      .overrideProvider(JwtService)
      .useValue({
        signAsync: jest.fn(),
        verifyAsync: jest.fn(),
      })
      .compile();
    service = module.get<IJwtService>(JwtTokenService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not decode', async () => {
    jest.spyOn(jwtService, 'verifyAsync').mockImplementation(() => {
      return Promise.reject('failed') as any;
    });
    const hash = await service.decode('invalid token');
    expect(hash).toBeNull();
  });

  it('should not encode', async () => {
    jest
      .spyOn(jwtService, 'signAsync')
      .mockResolvedValue(Promise.resolve(null));
    const hash = await service.encode(null);

    expect(hash).toBeNull();
  });
  it('should be encode with params', async () => {
    const hash = await service.encode(mockPayload, '123', '1h');

    jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockPayload);
    const decode = await service.decode(hash, '123');
    expect(decode.id).toEqual(mockPayload.id);
  });

  it('should be encode without params', async () => {
    const hash = await service.encode(mockPayload);

    jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockPayload);
    const decode = await service.decode(hash);

    expect(decode.id).toEqual(mockPayload.id);
  });

  it('should return null if encode failed', async () => {
    jest.spyOn(jwtService, 'signAsync').mockImplementation(() => {
      return Promise.reject('failed') as any;
    });

    const result = await service.encode(mockPayload);
    expect(result).toBeNull();
  });
});
