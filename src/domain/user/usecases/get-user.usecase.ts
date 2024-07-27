import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/domain/user';
import { UserUsecase } from '@/domain/user/user.usecase';

@Injectable()
export class GetUserUsecase extends UserUsecase {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  execute(id: string) {
    return this.userRepository.findUnique(id);
  }
}
