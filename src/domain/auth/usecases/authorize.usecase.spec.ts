import { Test } from '@nestjs/testing';
import { AuthUsecase } from '../auth.usecase';
import { AuthorizeUsecase } from './authorize.usecase';
import { UserEntity, UserRepository } from '@/domain/user';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const mockPayload = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
};
const mockUser = {
  id: faker.string.uuid(),
  username: mockPayload.username,
  password: bcrypt.hashSync(mockPayload.password, 10),
  createdAt: new Date(),
  deletedAt: null,
  updatedAt: new Date(),
};

describe('AuthorizeUsecase', () => {
  let usecase: AuthUsecase;
  let repository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthorizeUsecase,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();
    usecase = module.get<AuthUsecase>(AuthorizeUsecase);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
    expect(repository).toBeDefined();
  });
  it('should return null if user not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    expect(
      await usecase.execute({ username: 'username', password: 'password' }),
    ).toBeNull();
  });

  it('should return user if user found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser);
    const result = (await usecase.execute(mockPayload)) as UserEntity;
    expect(result.id).toEqual(mockUser.id);
  });
  it('should return null if password is invalid', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser);
    const result = (await usecase.execute({
      username: 'test',
      password: 'wrong password',
    })) as UserEntity;
    expect(result).toEqual(null);
  });
});
