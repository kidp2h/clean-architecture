import { Inject, Injectable } from '@nestjs/common';
import { AuthorizeUsecase } from './usecases';
import { AuthorizeDto } from '@/application/dtos/auth/authorize.dto';

@Injectable()
export class AuthFacadeUsecase {
  constructor(
    @Inject(AuthorizeUsecase)
    private readonly authorizeUsecase: AuthorizeUsecase,
  ) {}

  authorize(payload: AuthorizeDto) {
    return this.authorizeUsecase.execute(payload);
  }
}
