import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();
    controller = module.get<AppController>(AppController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be ok when check health', () => {
    const output = controller.checkHealth();
    const outputExpected = { message: 'Check health', status: 200 };
    expect(output).toEqual({
      message: outputExpected.message,
      status: outputExpected.status,
    });
  });
});
