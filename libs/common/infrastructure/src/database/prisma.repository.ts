import { InjectRedis, TaggedRedis } from '@moona-backend/common/nest-tagged-redis';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export abstract class PrismaRepository {
  constructor(
    protected readonly prisma: PrismaService,
    @InjectRedis() protected readonly redis: TaggedRedis,
  ) {}
}
