import { SignUpUseCase } from '@moona-backend/user-account/use-cases';
import { Module, Provider } from '@nestjs/common';

import { UserRepository } from './repositories';
import { UserMailer } from './mailer';

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
  providers: [...repositories, ...mailers, ...useCases],
})
export class UserAccountModule {}
