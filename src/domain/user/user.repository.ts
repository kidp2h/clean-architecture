import { Repository } from '@/core/repository';
import { UserEntity } from '@/domain/user';

export abstract class UserRepository extends Repository<UserEntity> {}
