import { ConfigModuleOptions, registerAs } from '@nestjs/config';
import joi from 'joi';
import { NestConfigExtension, databaseEnvConfig, novuEnvConfig } from '@moona-backend/common/infrastructure';

export interface AppConfig {
  isDev: boolean;
}

export const appEnvConfig: NestConfigExtension = {
  variables: registerAs<AppConfig>('app', () => ({
    isDev: process.env.NODE_ENV !== 'production',
  })),

  validationSchema: {
    DATABASE_URL: joi.string().uri().required(),
  },
};

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: ['.env', '.env.dev'],
  cache: process.env.NODE_ENV === 'production',
  load: [appEnvConfig.variables, databaseEnvConfig.variables, novuEnvConfig.variables],
  validationSchema: joi.object({
    ...appEnvConfig.validationSchema,
    ...databaseEnvConfig.validationSchema,
    ...novuEnvConfig.validationSchema,
  }),
};
