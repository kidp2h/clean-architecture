import { UserEntity, UserRepository, UserUsecase } from '@/domain/user';
import { Test } from '@nestjs/testing';
import { GetUserUsecase } from '@/domain/user/usecases/get-user.usecase';
import { faker } from '@faker-js/faker';
import { Repository } from '@/core';

const mockUser = {
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

describe('GetUserUsecase', () => {
  let usecase: UserUsecase;
  let repository: Repository<UserEntity>;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetUserUsecase,
        {
          provide: UserRepository,
          useValue: {
            findUnique: jest.fn(),
          },
        },
      ],
    }).compile();
    usecase = module.get<UserUsecase>(GetUserUsecase);
    repository = module.get<Repository<UserEntity>>(UserRepository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should be defined', async () => {
    expect(usecase).toBeDefined();
  });
  it('should get user', async () => {
    jest.spyOn(repository, 'findUnique').mockResolvedValueOnce(mockUser);
    const output = await usecase.execute(mockUser.id);
    expect(output).toEqual(mockUser);
  });

  it("shouldn't get user", async () => {
    jest.spyOn(repository, 'findUnique').mockResolvedValueOnce(null);
    const output = await usecase.execute('123');
    expect(output).toEqual(null);
  });
});
