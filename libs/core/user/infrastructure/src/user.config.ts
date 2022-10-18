import { NestConfigExtension } from '@moona-backend/core/common/infrastructure';
import { registerAs } from '@nestjs/config';
import joi from 'joi';

interface AuthConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: number;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: number;
}

export const authEnvConfig: NestConfigExtension = {
  variables: registerAs<AuthConfig>('auth', () => ({
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN),
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN),
  })),

  validationSchema: {
    ACCESS_TOKEN_SECRET: joi.string().required(),
    ACCESS_TOKEN_EXPIRES_IN: joi.number().required(),
    REFRESH_TOKEN_SECRET: joi.string().required(),
    REFRESH_TOKEN_EXPIRES_IN: joi.number().required(),
  },
};
