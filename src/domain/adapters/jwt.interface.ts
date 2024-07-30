import { UserEntity } from '@/domain/user';

export interface IJwtService {
  encode(
    payload: IJwtPayload,
    secret?: string,
    expiresIn?: string,
  ): Promise<string>;
  decode(token: string, secret?: string): Promise<any>;
}

export interface IJwtPayload extends Partial<UserEntity> {}
