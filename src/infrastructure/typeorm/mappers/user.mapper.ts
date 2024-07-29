import { Mapper } from '@/core/mapper';
import { UserEntity } from '@/domain/user';
import { UserModel } from '@/infrastructure/typeorm/models';

export class UserMapper extends Mapper<UserEntity, UserModel> {
  toEntity(data: UserModel) {
    if (data)
      return new UserEntity(
        data.id,
        data.username,
        data.password,
        data.createdAt,
        data.updatedAt,
        data.deletedAt,
      );
  }
  toModel(data: Partial<UserEntity>) {
    if (data) {
      const user = new UserModel();
      user.id = data.id;
      user.username = data.username;
      user.password = data.password;
      user.createdAt = data.createdAt;
      user.updatedAt = data.updatedAt;
      user.deletedAt = data.deletedAt;
      return user;
    }
  }
}
