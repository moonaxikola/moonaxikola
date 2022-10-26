import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { Exception } from '@moona/common/domain';
import { RequestError } from '@moona/common/contracts';
import { prismaHttpStatusMapping } from '@moona/common/infrastructure';
import { getValueOrUndefined } from '@moona/common/utils';

type IException = Exception<unknown> | HttpException | Prisma.PrismaClientKnownRequestError;

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: IException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(this.getStatusCode(exception)).json(this.getResponseBody(exception));
  }

  private getResponseBody(exception: IException): RequestError {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: exception.code,
        message: exception.message,
      };
    }

    if (exception instanceof Exception) {
      return {
        code: exception.code,
        message: exception.message,
        errors: getValueOrUndefined()
          .condition(!!exception.field)
          .value([{ [exception.field]: [exception.message] }]),
      };
    }

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      console.log(exceptionResponse);
      return {
        code: `I${exception.getStatus()}`,
        message: typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse['message'],
        errors: getValueOrUndefined()
          .condition(typeof exceptionResponse === 'object')
          .condition(typeof exceptionResponse['message'] === 'object')
          .value(exceptionResponse['message']),
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
