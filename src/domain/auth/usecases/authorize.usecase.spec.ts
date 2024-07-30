import { Test } from '@nestjs/testing';
import { AuthUsecase } from '../auth.usecase';
import { AuthorizeToken, AuthorizeUsecase } from './authorize.usecase';
import { UserEntity, UserRepository } from '@/domain/user';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import { IJwtService } from '@/domain/adapters';

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
  let jwtService: IJwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthorizeUsecase,
        {
          provide: 'JWT_SERVICE',
          useValue: {
            decode: jest.fn(),
            encode: jest.fn(),
          },
        },
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
    jwtService = module.get<IJwtService>('JWT_SERVICE');
  });
  afterEach(() => {
    jest.clearAllMocks();
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

  it('should return token if user found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser);

    jest.spyOn(jwtService, 'encode').mockResolvedValue('token');
    const result = (await usecase.execute(mockPayload)) as AuthorizeToken;
    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
  });
  it('should return null if password is invalid', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser);
    const result = (await usecase.execute({
      username: 'test',
      password: 'wrong password',
    })) as AuthorizeToken;
    expect(result).toEqual(null);
  });

  it('should return null if payload null', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser);
    jest.spyOn(jwtService, 'encode').mockResolvedValue(null);
    const result = (await usecase.execute(mockPayload)) as AuthorizeToken;
    expect(result).toEqual(null);
  });
});
