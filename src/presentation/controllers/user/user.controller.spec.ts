import { Test } from '@nestjs/testing';
import { UserController } from '@/presentation/controllers/user';
import { UserFacadeUsecase } from '@/domain/user';
import { CacheService } from '@/infrastructure/redis/cache';
import _ from 'lodash';

import { faker } from '@faker-js/faker';
const mockUser = {
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

const mockCachedUser = {
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

const mockExistUser = {
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

describe('UserController', () => {
  let controller: UserController;
  let userFaceUsecase: Partial<UserFacadeUsecase> = {
    getUser: jest.fn(),
    createUser: jest.fn(),
  };

  let cacheService: Partial<CacheService> = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserFacadeUsecase,
          useValue: userFaceUsecase,
        },
        {
          provide: CacheService,
          useValue: cacheService,
        },
      ],
    }).compile();
    controller = module.get<UserController>(UserController);
    userFaceUsecase = module.get<UserFacadeUsecase>(UserFacadeUsecase);
    cacheService = module.get<CacheService>(CacheService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  it('[createUser] should create user', async () => {
    jest.spyOn(userFaceUsecase, 'createUser').mockResolvedValueOnce(mockUser);
    const expectedOutput = await controller.createUser(mockUser);

    expect(expectedOutput.username).toEqual(mockUser.username);
  });

  it('[createUser] should not create user when empty', async () => {
    const expectedOutput = await controller.createUser({} as any);
    expect(expectedOutput).toEqual(null);
  });

  it('[createUser] should not create user when already exist', async () => {
    const expectedOutput = await controller.createUser(mockExistUser);
    expect(expectedOutput).toEqual(undefined);
  });

  it('[getUser] expect correct output when cached', async () => {
    jest.spyOn(cacheService, 'get').mockResolvedValueOnce(mockUser);
    const expectedOutput = await controller.getUser(mockUser.id);

    expect(expectedOutput).toEqual(mockUser);
  });

  it('[getUser] expect correct output when have not cache yet', async () => {
    jest.spyOn(cacheService, 'get').mockResolvedValueOnce(null);
    jest.spyOn(userFaceUsecase, 'getUser').mockResolvedValueOnce(mockUser);
    const expectedOutput = await controller.getUser(mockUser.id);

    expect(expectedOutput).toEqual(mockUser);
  });

  it('[getUser] expect null when invalid id', async () => {
    const wrongId = '123';
    const expectedOutput = await controller.getUser(wrongId);

    expect(expectedOutput).toEqual(null);
  });
});
