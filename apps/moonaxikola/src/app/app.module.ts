import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@moona-backend/common/infrastructure';
import { UserAccountModule } from '@moona-backend/user-account/infrastructure';

import { configModuleOptions } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), CommonModule, UserAccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
