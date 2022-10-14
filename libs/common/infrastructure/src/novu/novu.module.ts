import { Module } from '@nestjs/common';
import { NovuService, novuServiceProvider } from './novu.service';

@Module({
  providers: [novuServiceProvider],
  exports: [NovuService],
})
export class NovuModule {}
