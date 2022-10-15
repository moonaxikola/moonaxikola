import { ConfigModuleOptions, registerAs } from '@nestjs/config';
import joi from 'joi';
import { NestConfigExtension, databaseEnvConfig, novuEnvConfig } from '@moona-backend/common/infrastructure';
import { authEnvConfig } from '@moona-backend/user/infrastructure';

export interface AppConfig {
  isDev: boolean;
}

export interface FrontendConfig {
  emailVerificationUrl: string;
  passwordResetUrl: string;
}

const appEnvConfig: NestConfigExtension = {
  variables: registerAs<AppConfig>('app', () => ({
    isDev: process.env.NODE_ENV !== 'production',
  })),

  validationSchema: {
    DATABASE_URL: joi.string().uri().required(),
  },
};

const frontendEnvConfig: NestConfigExtension = {
  variables: registerAs<FrontendConfig>('frontend', () => ({
    emailVerificationUrl: process.env.FRONTEND_EMAIL_VERIFICATION_URL,
    passwordResetUrl: process.env.FRONTEND_PASSWORD_RESET_URL,
  })),

  validationSchema: {
    FRONTEND_EMAIL_VERIFICATION_URL: joi.string().uri().required(),
    FRONTEND_PASSWORD_RESET_URL: joi.string().uri().required(),
  },
};

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: ['.env', '.env.dev'],
  cache: process.env.NODE_ENV === 'production',
  load: [
    appEnvConfig.variables,
    databaseEnvConfig.variables,
    novuEnvConfig.variables,
    frontendEnvConfig.variables,
    authEnvConfig.variables,
  ],
  validationSchema: joi.object({
    ...appEnvConfig.validationSchema,
    ...databaseEnvConfig.validationSchema,
    ...novuEnvConfig.validationSchema,
    ...frontendEnvConfig.validationSchema,
    ...authEnvConfig.validationSchema,
  }),
};
