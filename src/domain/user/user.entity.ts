import { Entity } from '@/core/entity';
import { Exclude } from 'class-transformer';

export class UserEntity extends Entity {
  @Exclude()
  public password: string;
  constructor(
    public id: string,
    public username: string,
    password: string,

    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date,
  ) {
    super();

    this.password = password;
  }
}
