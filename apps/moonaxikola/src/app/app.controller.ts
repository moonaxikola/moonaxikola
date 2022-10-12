import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getData() {
    return this.prisma.user.findMany();
  }
}
