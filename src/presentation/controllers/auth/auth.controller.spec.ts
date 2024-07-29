import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthFacadeUsecase } from '@/domain/auth';
import { CacheService } from '@/infrastructure/redis/cache';
import { faker } from '@faker-js/faker';

const mockPayload = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

describe('AuthController', () => {
  let controller: AuthController;

  let authFacadeUsecase: Partial<AuthFacadeUsecase> = {
    authorize: jest.fn(),
  };

  let cacheService: Partial<CacheService> = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthFacadeUsecase,
          useValue: authFacadeUsecase,
        },
        {
          provide: CacheService,
          useValue: cacheService,
        },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    authFacadeUsecase = module.get<AuthFacadeUsecase>(AuthFacadeUsecase);
    cacheService = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return access token and refresh token', () => {
    const accessToken = faker.string.alphanumeric(10);
    const refreshToken = faker.string.alphanumeric(10);
    authFacadeUsecase.authorize = jest.fn().mockResolvedValue({
      accessToken,
      refreshToken,
    });

    expect(controller.authorize(mockPayload)).resolves.toEqual({
      accessToken,
      refreshToken,
    });
  });

  it('should not return access token and refresh token', () => {
    authFacadeUsecase.authorize = jest.fn().mockResolvedValue(null);

    expect(controller.authorize(mockPayload)).rejects.toThrow('Unauthorized');
  });
});
