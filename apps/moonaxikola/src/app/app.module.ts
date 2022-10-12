import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@moona-backend/common/infrastructure';

import { configModuleOptions } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
