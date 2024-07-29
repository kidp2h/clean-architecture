import { UserFacadeUsecase, UserRepository } from '@/domain/user';
import { CreateUserUsecase, GetUserUsecase } from '@/domain/user/usecases';
import { CacheService } from '@/infrastructure/redis/cache';
import { UserController } from '@/presentation/controllers/user';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '@/infrastructure/typeorm/models';
import { UserEntity } from '@/domain/user';
import { UserRepositoryImpl } from '@/infrastructure/typeorm/repositories';

import { Mapper } from '@/core';
import { UserMapper } from '@/infrastructure/typeorm/mappers';

@Module({})
export class UserFacadeModule {
  static register() {
    return {
      module: UserFacadeModule,

      imports: [TypeOrmModule.forFeature([UserModel])],
      providers: [
        UserFacadeUsecase,
        CreateUserUsecase,
        GetUserUsecase,

        {
          provide: UserRepository,
          useClass: UserRepositoryImpl,
        },

        {
          provide: Mapper<UserEntity, UserModel>,
          useClass: UserMapper,
        },
      ],
      exports: [UserFacadeUsecase, CreateUserUsecase, GetUserUsecase],
    };
  }
}

@Module({
  imports: [UserFacadeModule.register()],
  controllers: [UserController],
  providers: [
    CacheService,
    {
      provide: Mapper<UserEntity, UserModel>,
      useClass: UserMapper,
    },
  ],
  exports: [],
})
export class UserModule {}
