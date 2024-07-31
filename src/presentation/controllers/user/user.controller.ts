import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserEntity, UserFacadeUsecase } from '@/domain/user';
import { CacheService } from '@/infrastructure/redis/cache';
import { CreateUserDto } from '@/application/dtos/user/create-user.dto';
import * as uuid from 'uuid';
import * as _ from 'lodash';
import { ResponseMessage } from '@/presentation/commons/decorators/ResponseMessage';
import { Mapper } from '@/core';
import { UserModel } from '@/infrastructure/typeorm/models';

@Controller('/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userFacadeUsecase: UserFacadeUsecase,

    private readonly userMapper: Mapper<UserEntity, UserModel>,

    private readonly cacheService: CacheService,
  ) {}

  @Get('/:id')
  @ResponseMessage('Fetch user successfully')
  async getUser(@Param('id', new ParseUUIDPipe()) id: string) {
    this.logger.log('Get User');
    if (!uuid.validate(id)) return null;

    const cached = await this.cacheService.get(id);
    if (cached) return this.userMapper.toEntity(cached);

    const user = await this.userFacadeUsecase.getUser(id);
    if (user) this.cacheService.set(id, user);
    return user;
  }

  @Post('/create')
  @ResponseMessage('Operation successfully')
  async createUser(@Body() createUserDto: CreateUserDto) {
    this.logger.log('Create User');
    if (_.isEmpty(createUserDto)) return null;
    const { username, password } = createUserDto;
    return this.userFacadeUsecase.createUser({
      username,
      password,
    });
  }
}
