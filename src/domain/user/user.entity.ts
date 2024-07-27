import { Entity } from '@/core/entity';

export class UserEntity extends Entity {
  constructor(
    public id: string,
    public username: string,

    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date,

    public password?: string,
  ) {
    super();
  }
}
