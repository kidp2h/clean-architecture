import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/application/di/app.module';

describe('[E2E] AppController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/checkhealth')
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual({ message: 'Check health', status: 200 });
      });
  });
  afterAll((done) => {
    done();
  });
});
