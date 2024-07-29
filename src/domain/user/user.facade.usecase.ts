import { CreateUserUsecase, GetUserUsecase } from '@/domain/user/usecases';
import { UserEntity } from '@/domain/user';
import { Inject, Injectable } from '@nestjs/common';
import { UserUsecase } from './user.usecase';

@Injectable()
export class UserFacadeUsecase {
  constructor(
    @Inject(GetUserUsecase) private readonly getUserUsecase: UserUsecase,
    @Inject(CreateUserUsecase) private readonly createUserUsecase: UserUsecase,
  ) {}

  createUser(data: Partial<UserEntity>) {
    return this.createUserUsecase.execute(data);
  }

  getUser(id: string) {
    return this.getUserUsecase.execute(id);
  }
}
