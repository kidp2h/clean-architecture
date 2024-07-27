import { UserEntity } from '@/domain/user';
import { UserMapper } from './user.mapper';
import { faker } from '@faker-js/faker';
import { UserModel } from '@/infrastructure/typeorm/models';

describe('UserMapper', () => {
  const mock = {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  };
  const mappers = new UserMapper();

  it('should be defined', () => {
    expect(mappers).toBeDefined();
  });
  it('should be return UserEntity when call toDomain', () => {
    const output = mappers.toEntity(mock);
    expect(output).toBeInstanceOf(UserEntity);
  });
  it('should be return UserModel when call toEntity', () => {
    const output = mappers.toModel(mock);
    expect(output).toBeInstanceOf(UserModel);
  });
});
