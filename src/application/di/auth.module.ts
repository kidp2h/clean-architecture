import { AuthFacadeUsecase } from '@/domain/auth';
import { AuthorizeUsecase } from '@/domain/auth/usecases';
import { UserRepository } from '@/domain/user';
import { AuthController } from '@/presentation/controllers/auth';

import { UserModel } from '@/infrastructure/typeorm/models';
import { UserEntity } from '@/domain/user';
import { UserRepositoryImpl } from '@/infrastructure/typeorm/repositories';
import { Module } from '@nestjs/common';
import { Mapper } from '@/core';
import { UserMapper } from '@/infrastructure/typeorm/mappers';
import { CacheService } from '@/infrastructure/redis/cache';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtTokenService } from '@/infrastructure/services/jwt';

@Module({})
export class AuthFacadeModule {
  static register() {
    return {
      module: AuthFacadeModule,
      imports: [TypeOrmModule.forFeature([UserModel]), JwtModule],
      providers: [
        AuthFacadeUsecase,
        AuthorizeUsecase,
        {
          provide: 'JWT_SERVICE',
          useClass: JwtTokenService,
        },

        {
          provide: UserRepository,
          useClass: UserRepositoryImpl,
        },

        {
          provide: Mapper<UserEntity, UserModel>,
          useClass: UserMapper,
        },
      ],
      exports: [AuthFacadeUsecase, AuthorizeUsecase],
    };
  }
}

@Module({
  imports: [AuthFacadeModule.register()],
  controllers: [AuthController],
  providers: [CacheService],
  exports: [],
})
export class AuthModule {}
