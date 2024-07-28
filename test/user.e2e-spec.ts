import { AppModule } from '@/application/di';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { TypeOrmModule } from '@/application/di';
import { UserModel } from '@/infrastructure/typeorm/models';
import { typeormModule } from '@/application/di/app.module';

describe('[E2E] UserController', () => {
  let app: INestApplication;
  let httpServer: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(typeormModule)
      .useModule(
        TypeOrmModule.forTest({
          entities: [UserModel],
          url: process.env.DATABASE_TEST_URL,
        }),
      )
      .compile();

    app = module.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
  });
  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(httpServer).toBeDefined();
  });

  it('POST /user/create', async () => {
    const response = await request(httpServer)
      .post(`/user/create`)
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password(),
      })
      .expect(201);
    expect(response.body.id).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
