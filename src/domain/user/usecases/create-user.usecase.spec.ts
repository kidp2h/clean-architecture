import { Repository } from '@/core';
import { UserEntity, UserRepository, UserUsecase } from '@/domain/user';
import { CreateUserUsecase } from '@/domain/user/usecases';
import { Test } from '@nestjs/testing';
import _ from 'lodash';

import { faker } from '@faker-js/faker';
const mockUser = {
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

const mockExistUser = {
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

describe('CreateUserUsecase', () => {
  let usecase: UserUsecase;
  let repository: UserRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserUsecase,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();
    usecase = module.get<UserUsecase>(CreateUserUsecase);
    repository = module.get<Repository<UserEntity>>(UserRepository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should create user', async () => {
    jest.spyOn(repository, 'create').mockResolvedValueOnce({
      id: mockUser.id,
      username: mockUser.username,
    });
    const output = await usecase.execute(mockUser);
    expect(output).toEqual({
      id: mockUser.id,
      username: mockUser.username,
    });
  });

  it("shouldn't create user when empty", async () => {
    jest.spyOn(repository, 'create').mockResolvedValueOnce(null);
    const output = await usecase.execute({});

    expect(output).toBeNull();
  });
  it("shouldn't create user when already exist", async () => {
    jest.spyOn(repository, 'create').mockImplementation(() => {
      return Promise.reject(new Error('User already exist'));
    });
    await expect(async () => {
      await usecase.execute(mockExistUser);
    }).rejects.toThrow('User already exist');
  });
});
