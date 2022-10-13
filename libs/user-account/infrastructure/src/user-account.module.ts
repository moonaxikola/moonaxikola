import { SignUpUseCase } from '@moona-backend/user-account/use-cases';
import { Module, Provider, Type } from '@nestjs/common';

import { UserRepository } from './repositories';
import { UserMailer } from './mailer';
import { UserAccountController } from './controllers';

const controllers: Type[] = [UserAccountController];

const repositories: Provider[] = [UserRepository];

const mailers: Provider[] = [UserMailer];

const useCases: Provider[] = [
  {
    provide: SignUpUseCase,
    inject: [UserRepository, UserMailer],
    useFactory: (userRepository, userMailer) => new SignUpUseCase(userRepository, userMailer),
  },
];

@Module({
  controllers,
  providers: [...repositories, ...mailers, ...useCases],
})
export class UserAccountModule {}
