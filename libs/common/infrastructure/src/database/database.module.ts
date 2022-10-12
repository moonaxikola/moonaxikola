import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { prismaModuleOptions } from './database.config';

@Module({
  imports: [PrismaModule.forRootAsync(prismaModuleOptions)],
})
export class DatabaseModule {}
