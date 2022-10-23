import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Exception } from '@moona/common/domain';
import { prismaHttpStatusMapping } from '@moona/common/infrastructure';
import { Prisma } from '@prisma/client';

type IException = Exception<unknown> | HttpException | Prisma.PrismaClientKnownRequestError;

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: IException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(this.getStatusCode(exception)).json(this.getResponseBody(exception));
  }

  private getResponseBody(exception: IException): {
    code: string;
    message: string;
    field?: string;
    data?: unknown;
  } {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: exception.code,
        message: exception.message,
      };
    }

    if (exception instanceof Exception) {
      return {
        code: exception.code,
        field: exception.field,
        message: exception.message,
        data: exception.data,
      };
    }

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      return {
        code: `I${exception.getStatus()}`,
        message: typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse['message'],
      };
    }

    return {
      code: `I${HttpStatus.INTERNAL_SERVER_ERROR}`,
      message: 'Internal server error',
    };
  }

  getStatusCode(exception: IException) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return prismaHttpStatusMapping[exception.code] || HttpStatus.INTERNAL_SERVER_ERROR;
    }

    if (exception instanceof Exception) {
      return exception.httpStatusCode;
    }

    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
