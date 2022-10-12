import { Module } from '@nestjs/common';

import { UserRepository } from './repositories';

@Module({
  controllers: [],
  providers: [UserRepository],
})
export class UserAccountModule {}
