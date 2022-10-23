import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { prismaModuleOptions } from './database.config';
import { PrismaTransactionWrapper } from './prisma-transaction.service';

@Module({
  imports: [PrismaModule.forRootAsync(prismaModuleOptions)],
  providers: [PrismaTransactionWrapper],
  exports: [PrismaTransactionWrapper],
})
export class DatabaseModule {}
