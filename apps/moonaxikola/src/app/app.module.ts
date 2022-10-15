import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaggedRedisModule } from '@moona-backend/common/nest-tagged-redis';
import { CommonModule } from '@moona-backend/common/infrastructure';
import { UserAccountModule } from '@moona-backend/user-account/infrastructure';

import { configModuleOptions } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    CommonModule,
    TaggedRedisModule.forRoot({
      readyLog: true,
      config: { host: 'localhost', port: 6379 },
    }),
    UserAccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
