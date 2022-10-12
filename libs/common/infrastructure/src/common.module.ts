import { Module, Global } from '@nestjs/common';
import { DatabaseModule } from './database';

@Global()
@Module({
  imports: [DatabaseModule],
})
export class CommonModule {}
