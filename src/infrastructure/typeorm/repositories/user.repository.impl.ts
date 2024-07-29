import { UserEntity, UserRepository } from '@/domain/user';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '@/infrastructure/typeorm/models';
import { Repository } from 'typeorm';
import { Mapper } from '@/core/mapper';

import * as uuid from 'uuid';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  private readonly logger = new Logger(UserRepositoryImpl.name);
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<Partial<UserModel>>,
    private readonly userMapper: Mapper<UserEntity, UserModel>,
  ) {
    super();
  }

  async findOne(filter: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    const userTypeorm = await this.userRepository.findOne({
      where: filter,
    });
    return this.userMapper.toEntity(userTypeorm);
  }

  async findUnique(id: string) {
    this.logger.log('[Typeorm] findUnique', id);
    if (!uuid.validate(id)) return null;
    const userTypeorm = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return this.userMapper.toEntity(userTypeorm);
  }
  async findMany(filter: Partial<UserEntity>) {
    this.logger.log('[Typeorm] findMany');
    const usersTypeorm = await this.userRepository.find({
      where: filter,
    });

    return usersTypeorm.map((user) => this.userMapper.toEntity(user));
  }
  async update(id: string, data: Partial<UserEntity>) {
    this.logger.log('[Typeorm] update');
    const userTypeorm = await this.userRepository.save({
      id,
      ...this.userMapper.toModel(data),
    });
    return this.userMapper.toEntity(userTypeorm);
  }
  async delete(id: string) {
    this.logger.log('[Typeorm] delete');
    const userTypeorm = await this.userRepository.save({
      deletedAt: new Date(),
    });
    return this.userMapper.toEntity(userTypeorm);
  }
  async create(data: UserEntity) {
    this.logger.log('[Typeorm] create');
    const userTypeorm = await this.userRepository.save(
      this.userMapper.toModel({
        ...data,
      }),
    );

    return this.userMapper.toEntity(userTypeorm);
  }
}
