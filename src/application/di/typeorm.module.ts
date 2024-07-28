import { UserModel } from '@/infrastructure/typeorm/models';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';

type TypeOrmConfig = {
  entities: any[];
  database?: string;
  url?: string;
};
@Module({})
export class TypeOrmModule {
  static forRoot({ entities, database, url }: TypeOrmConfig): DynamicModule {
    return {
      module: TypeOrmModule,
      imports: [
        NestTypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DATABASE_HOST || 'localhost',
          port: +process.env.DATABASE_PORT || 5432,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          entities,
          database: database || 'demo',
          synchronize: true,
        }),
      ],
    };
  }
  static forTest({ entities, url }): DynamicModule {
    return {
      module: TypeOrmModule,
      imports: [
        NestTypeOrmModule.forRoot({
          type: 'postgres',
          url,
          entities: entities,
          database: 'demo',
          synchronize: true,
        }),
      ],
    };
  }
}
