import { registerAs, ConfigService } from '@nestjs/config';
import { PrismaModuleAsyncOptions, loggingMiddleware } from 'nestjs-prisma';
import joi from 'joi';
import { NestConfigExtension } from '../interfaces';

interface DatabaseConfig {
  url: string;
}

export const databaseEnvConfig: NestConfigExtension = {
  variables: registerAs<DatabaseConfig>('database', () => ({
    url: process.env.DATABASE_URL,
  })),

  validationSchema: {
    DATABASE_URL: joi.string().uri().required(),
  },
};

export const prismaModuleOptions: PrismaModuleAsyncOptions = {
  isGlobal: true,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    prismaOptions: {
      datasources: {
        db: {
          url: configService.get('database.url'),
        },
      },
    },
    middlewares: [loggingMiddleware()],
  }),
};
