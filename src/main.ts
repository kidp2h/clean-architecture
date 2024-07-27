import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@/application/di/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from '@/presentation/commons/interceptors';
import {
  HttpExceptionFilter,
  validationExceptionFactory,
} from '@/presentation/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationExceptionFactory,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
