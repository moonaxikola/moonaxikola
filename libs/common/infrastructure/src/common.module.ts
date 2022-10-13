import { Module, Global } from '@nestjs/common';
import { DatabaseModule } from './database';
import { EventEmitterModule } from './event-emitter';

@Global()
@Module({
  imports: [DatabaseModule, EventEmitterModule],
  exports: [EventEmitterModule],
})
export class CommonModule {}
