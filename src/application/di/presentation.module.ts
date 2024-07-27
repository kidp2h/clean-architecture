import { Module } from '@nestjs/common';
import { UserFacadeUsecase } from '@/domain/user';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class PresentationModule {}
