import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ValidationException } from './validation.exception';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    this.logger.error(exception.message, exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>() as any;
    let code = 500,
      error = 'Internal Server Error';

    switch (exception.constructor) {
      case QueryFailedError:
        if (exception.code === '23505') {
          code = 400;
          error = `${exception.table} is exist`;
        }

        break;
      case ValidationException:
        code = 400;
        error = {
          ...exception.getResponse(),
        };
        break;
      case HttpException:
        code = exception.getStatus();

        error =
          (exception.getResponse() as any).error || 'Internal Server Error';
        break;
      case BadRequestException:
        code = exception.getStatus();
        error =
          (exception.getResponse() as any).message || 'Internal Server Error';
        break;
    }
    return response.status(code).json({
      code,
      error,
      timestamp: new Date().toISOString(),
    });
  }
}
