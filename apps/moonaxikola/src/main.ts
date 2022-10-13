import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { CustomExceptionFilter } from './app/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter());

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
