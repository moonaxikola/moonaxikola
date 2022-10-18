import { Module } from '@nestjs/common';
import { NovuService, novuServiceProvider } from './novu.service';

// TODO: transform this into a library

@Module({
  providers: [novuServiceProvider],
  exports: [NovuService],
})
export class NovuModule {}
