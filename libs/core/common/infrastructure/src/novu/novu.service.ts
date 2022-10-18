import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Novu } from '@novu/node';

export class NovuService extends Novu {}

export const novuServiceProvider: Provider = {
  provide: NovuService,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return new Novu(config.get('novu.apiKey'), {
      backendUrl: config.get('novu.backendUrl'),
    });
  },
};
