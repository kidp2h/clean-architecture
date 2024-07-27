import { UserFacadeUsecase, UserRepository } from '@/domain/user';
import { CreateUserUsecase, GetUserUsecase } from '@/domain/user/usecases';
import { CacheService } from '@/infrastructure/redis/cache';
import { UserController } from '@/presentation/controllers/user';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel as TypeormUserModel } from '@/infrastructure/typeorm/models';
import { UserEntity } from '@/domain/user';
import { UserRepositoryImpl as RepoTypeorm } from '@/infrastructure/typeorm/repositories';

import { Mapper } from '@/core';
import { UserMapper as TypeormUserMapper } from '@/infrastructure/typeorm/mappers';

@Module({})
export class UserFacadeModule {
  static register() {
    return {
      module: UserFacadeModule,

      imports: [TypeOrmModule.forFeature([TypeormUserModel])],
      providers: [
        UserFacadeUsecase,
        CreateUserUsecase,
        GetUserUsecase,

        {
          provide: UserRepository,
          useClass: RepoTypeorm,
        },

        {
          provide: Mapper<UserEntity, TypeormUserModel>,
          useClass: TypeormUserMapper,
        },
      ],
      exports: [UserFacadeUsecase, CreateUserUsecase, GetUserUsecase],
    };
  }
}

@Module({
  imports: [UserFacadeModule.register()],
  controllers: [UserController],
  providers: [CacheService],
  exports: [],
})
export class UserModule {}
