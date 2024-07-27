import { Usecase } from '@/core/usecase';
import { UserEntity } from '@/domain/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UserUsecase extends Usecase<UserEntity> {}
