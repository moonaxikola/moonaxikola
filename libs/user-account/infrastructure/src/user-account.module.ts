import { SignUpUseCase } from '@moona-backend/user-account/use-cases';
import { Module, Provider } from '@nestjs/common';

import { UserRepository } from './repositories';

const repositories: Provider[] = [UserRepository];

const useCases: Provider[] = [
  {
    provide: SignUpUseCase,
    inject: [UserRepository],
    useFactory: userRepository => new SignUpUseCase(userRepository),
  },
];

@Module({
  providers: [...repositories, ...useCases],
})
export class UserAccountModule {}
