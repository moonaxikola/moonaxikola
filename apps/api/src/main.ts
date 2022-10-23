import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { PrismaService } from 'nestjs-prisma';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { CustomExceptionFilter } from './app/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const webClients = [process.env.PUBLIC_WEB_URL];

  console.log('webClients', webClients);

  app.use(cookieParser());
  app.enableCors({ origin: webClients, credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.get(PrismaService).enableShutdownHooks(app);

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
