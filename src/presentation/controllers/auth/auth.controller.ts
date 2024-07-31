import { AuthorizeDto } from '@/application/dtos/auth/authorize.dto';
import { AuthFacadeUsecase } from '@/domain/auth';
import { ResponseMessage } from '@/presentation/commons/decorators';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authFacadeUsecase: AuthFacadeUsecase) {}

  @Post('/authorize')
  @ResponseMessage('Authorize successfully')
  async authorize(@Body() payload: AuthorizeDto) {
    const result = await this.authFacadeUsecase.authorize(payload);
    if (result == null) {
      throw new UnauthorizedException('Unauthorized');
    }
    return result;
  }
}
