import { AuthorizeDto } from '@/application/dtos/auth/authorize.dto';
import { AuthUsecase } from '@/domain/auth';
import { UserRepository } from '@/domain/user';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthorizeUsecase extends AuthUsecase {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async execute(payload: AuthorizeDto): Promise<Partial<any>> {
    const { username, password } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) return null;
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) return null;
    return user;
  }
}
