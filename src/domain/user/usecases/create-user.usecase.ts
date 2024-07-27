import { Injectable } from '@nestjs/common';
import { UserRepository, UserEntity } from '@/domain/user';
import { UserUsecase } from '@/domain/user/user.usecase';

@Injectable()
export class CreateUserUsecase extends UserUsecase {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async execute(data: Partial<UserEntity>) {
    return this.userRepository.create(data);
  }
}
