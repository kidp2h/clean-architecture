import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@/application/di/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from '@/presentation/commons/interceptors';
import {
  HttpExceptionFilter,
  validationExceptionFactory,
} from '@/presentation/exceptions';
import { TransformInterceptor } from './presentation/commons/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationExceptionFactory,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  if (process.env.NODE_ENV !== 'production') {
    logger.log(`Running on ${process.env.NODE_ENV} mode`);
  }
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ResponseInterceptor(app.get(Reflector)),
  );

  logger.log(`Listening on port ${process.env.PORT}`);
  await app.listen(process.env.PORT);
}
bootstrap();
