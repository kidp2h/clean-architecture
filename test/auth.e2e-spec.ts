import { AppModule, TypeOrmModule } from '@/application/di';
import { typeormModule } from '@/application/di/app.module';
import { UserModel } from '@/infrastructure/typeorm/models';
import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import request from 'supertest';

describe('[E2E] AuthController', () => {
  let app: INestApplication;
  let httpServer: any;
  beforeEach(async () => {
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

  it('POST /auth/authorize (should created and authorized)', async () => {
    const payload = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const responseCreate = await request(httpServer)
      .post(`/user/create`)
      .send(payload)
      .expect(201);
    expect(responseCreate.body.id).toBeDefined();

    const responseAuthorize = await request(httpServer)
      .post(`/auth/authorize`)
      .send(payload)
      .expect(201);
    expect(responseAuthorize.body.id).toBeDefined();
  });

  it('POST /auth/authorize (should not authorized)', async () => {
    const responseAuthorize = await request(httpServer)
      .post(`/auth/authorize`)
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password(),
      })
      .expect(401);
    expect(responseAuthorize.body.id).toBeUndefined();
  });
});
