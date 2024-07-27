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
          url: url || process.env.DATABASE_URL,
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
