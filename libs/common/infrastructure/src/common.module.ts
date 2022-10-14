import { Module, Global } from '@nestjs/common';

import { DatabaseModule } from './database';
import { EventEmitterModule } from './event-emitter';
import { NovuModule } from './novu';

@Global()
@Module({
  imports: [DatabaseModule, EventEmitterModule, NovuModule],
  exports: [EventEmitterModule, NovuModule],
})
export class CommonModule {}
