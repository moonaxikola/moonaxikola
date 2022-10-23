import { registerAs } from '@nestjs/config';
import joi from 'joi';

import { NestConfigExtension } from '../interfaces';

interface NovuConfig {
  apiKey: string;
  backendUrl: string;
}

export const novuEnvConfig: NestConfigExtension = {
  variables: registerAs<NovuConfig>('novu', () => ({
    apiKey: process.env.NOVU_API_KEY,
    backendUrl: process.env.NOVU_API_ROOT_URL,
  })),

  validationSchema: {
    NOVU_API_KEY: joi.string().required(),
    NOVU_API_ROOT_URL: joi.string().uri().required(),
  },
};
