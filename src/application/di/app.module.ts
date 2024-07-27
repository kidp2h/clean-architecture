import { Module } from '@nestjs/common';
import { PresentationModule, PrismaModule } from '@/application/di';
import { UserModel } from '@/infrastructure/typeorm/models';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AppController } from '@/presentation/controllers';
import { TypeOrmModule } from './typeorm.module';

export const typeormModule = TypeOrmModule.forRoot({
  entities: [UserModel],
});
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: +process.env.REDIS_PORT || 6379,
          },
        }),
      }),
    }),
    typeormModule,

    PresentationModule,
  ],
  controllers: [AppController],

  exports: [],
})
export class AppModule {}
