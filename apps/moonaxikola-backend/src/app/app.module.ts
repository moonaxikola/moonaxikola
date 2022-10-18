import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaggedRedisModule } from '@moona-backend/nest-tagged-redis';
import { CommonModule } from '@moona-backend/core/common/infrastructure';
import { UserModule } from '@moona-backend/core/user/infrastructure';

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
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
