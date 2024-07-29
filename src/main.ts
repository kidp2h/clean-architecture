import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@/application/di/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from '@/presentation/commons/interceptors';
import {
  HttpExceptionFilter,
  validationExceptionFactory,
} from '@/presentation/exceptions';
import { TransformInterceptor } from './presentation/commons/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationExceptionFactory,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ResponseInterceptor(app.get(Reflector)),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
