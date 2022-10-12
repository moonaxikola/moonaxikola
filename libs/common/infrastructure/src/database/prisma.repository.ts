import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export abstract class PrismaRepository {
  constructor(protected readonly prisma: PrismaService) {}
}
