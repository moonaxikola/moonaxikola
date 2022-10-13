import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { Exception } from '@moona-backend/common/domain';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: Exception<unknown> | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException ? exception.getStatus() : exception.httpStatusCode;
    const code = isHttpException ? status : exception.code;

    const getMessage = () => {
      if (isHttpException) {
        const exceptionResponse = exception.getResponse();
        return typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse['message'];
      }

      return exception.message;
    };

    response.status(status).json({ code, message: getMessage() });
  }
}
