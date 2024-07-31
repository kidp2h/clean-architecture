import { AuthorizeDto } from '@/application/dtos/auth/authorize.dto';
import { IJwtService } from '@/domain/adapters';
import { AuthUsecase } from '@/domain/auth';
import { UserRepository } from '@/domain/user';
import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

export type AuthorizeToken = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthorizeUsecase extends AuthUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('JWT_SERVICE') private readonly jwtService: IJwtService,
  ) {
    super();
  }

  async execute(payload: AuthorizeDto): Promise<Partial<AuthorizeToken>> {
    const { username, password } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) return null;
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) return null;

    const accessToken = await this.jwtService.encode(user, null, '1h');
    const refreshToken = await this.jwtService.encode(user, null, '7d');
    /* const [accessToken, ] = await Promise.all([
      this.jwtService.encode(user, null, '7d'),
    ]); */
    if (accessToken === null || refreshToken === null) return null;

    return {
      accessToken,
      refreshToken,
    };
  }
}
