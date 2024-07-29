import { Mapper, Repository } from '@/core';
import { UserEntity, UserRepository } from '@/domain/user';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepositoryImpl } from './user.repository.impl';
import { QueryFailedError, Repository as TypeormRepository } from 'typeorm';
import { UserModel } from '@/infrastructure/typeorm/models';
import * as _ from 'lodash';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const mockUser = {
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

describe('UserRepository', () => {
  let repository: Repository<UserEntity>;
  let userRepository: TypeormRepository<Partial<UserModel>>;
  let mapper: Mapper<UserEntity, UserModel>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: Repository<UserEntity>,
          useClass: UserRepositoryImpl,
        },
        {
          provide: getRepositoryToken(UserModel),
          useClass: TypeormRepository,
        },
        {
          provide: Mapper,
          useValue: {
            toEntity: jest.fn().mockReturnValue(mockUser),
            toModel: jest.fn().mockReturnValue(mockUser),
          },
        },
      ],
    }).compile();
    userRepository = module.get<TypeormRepository<UserModel>>(
      getRepositoryToken(UserModel),
    );
    mapper = module.get<Mapper<UserEntity, UserModel>>(Mapper);
    repository = module.get<Repository<UserEntity>>(Repository);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
  it('should return user', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce(mapper.toEntity(mockUser));
    const output = await repository.findUnique(mockUser.id);

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockUser.id },
    });

    expect(mapper.toEntity).toHaveBeenCalledTimes(2);
    expect(output).toEqual(mockUser);
  });
  it('should not return user when invalid id', async () => {
    mockUser.id = '123';

    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce(mapper.toEntity(mockUser));

    const output = await repository.findUnique('123');

    expect(userRepository.findOne).toHaveBeenCalledTimes(0);

    expect(mapper.toEntity).toHaveBeenCalledTimes(1);
    expect(output).toEqual(null);
  });
  it('should create user', async () => {
    const model = mapper.toModel(mockUser);
    const entity = mapper.toEntity(mockUser);
    jest.spyOn(userRepository, 'save').mockResolvedValueOnce(model);

    const output = await repository.create(entity);

    expect(userRepository.save).toHaveBeenCalledWith(model);
    expect(userRepository.save).toHaveBeenCalledTimes(1);

    expect(mapper.toModel).toHaveBeenCalledTimes(2);
    expect(mapper.toEntity).toHaveBeenCalledTimes(2);

    expect(output).toEqual(mockUser);
  });
  it('should not create user when exist', async () => {
    const model = mapper.toModel(mockUser);
    const entity = mapper.toEntity(mockUser);
    jest
      .spyOn(userRepository, 'save')
      .mockImplementation(() =>
        Promise.reject(
          new QueryFailedError('error', [], new Error('User already exist')),
        ),
      );

    await expect(async () => {
      await repository.create(entity);
    }).rejects.toThrow('User already exist');

    expect(userRepository.save).toHaveBeenCalledWith(model);
    expect(userRepository.save).toHaveBeenCalledTimes(1);

    expect(mapper.toEntity).toHaveBeenCalledTimes(1);
  });

  it('should be able to update user', async () => {
    const password = '123';
    mockUser.id = faker.string.uuid();
    mockUser.password = bcrypt.hashSync(password, 10);
    jest.spyOn(userRepository, 'save').mockImplementation(() => {
      return Promise.resolve(mockUser);
    });
    const result = await repository.update(mockUser.id, {
      password,
    });

    expect(bcrypt.compareSync(password, result.password)).toEqual(true);
  });

  it('should be able to update user', async () => {
    const password = '123';
    mockUser.id = faker.string.uuid();
    mockUser.password = bcrypt.hashSync(password, 10);

    jest.spyOn(userRepository, 'save').mockImplementation(() => {
      return Promise.resolve(mockUser);
    });
    const result = await repository.update(mockUser.id, {
      password,
    });

    expect(bcrypt.compareSync(password, result.password)).toEqual(true);
  });

  it('should delete user', async () => {
    jest.spyOn(userRepository, 'save').mockImplementation(() => {
      return Promise.resolve(mockUser);
    });
    const result = await repository.delete(mockUser.id);
    expect(result.id).toEqual(mockUser.id);
  });

  it('should find many users', async () => {
    const users = [mockUser, mockUser];
    jest
      .spyOn(userRepository, 'find')
      .mockImplementation(() => Promise.resolve(users));
    const result = await repository.findMany({});
    expect(result).toEqual(users);
  });
  it('should return only one user', async () => {
    const user = mockUser;
    jest
      .spyOn(userRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(user));
    const result = await repository.findOne({ username: user.username });
    expect(result).toEqual(user);
  });
});
