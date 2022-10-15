import { Module, Provider, Type } from '@nestjs/common';
import { EventEmitterService } from '@moona-backend/common/infrastructure';
import {
  SignUpUseCase,
  ConfirmEmailUseCase,
  ResendConfirmationEmailUseCase,
} from '@moona-backend/user-account/use-cases';

import { UserRepository } from './repositories';
import { UserMailer } from './mailer';
import { SignUpController, EmailVerificationController } from './controllers';
import { UserAccountListener } from './listeners';

const controllers: Type[] = [SignUpController, EmailVerificationController];

const repositories: Provider[] = [UserRepository];

const mailers: Provider[] = [UserMailer];

const eventListeners: Provider[] = [UserAccountListener];

const useCases: Provider[] = [
  {
    provide: SignUpUseCase,
    inject: [UserRepository, EventEmitterService],
    useFactory: (userRepository, eventEmitter) => new SignUpUseCase(userRepository, eventEmitter),
  },
  {
    provide: ConfirmEmailUseCase,
    inject: [UserRepository],
    useFactory: userRepository => new ConfirmEmailUseCase(userRepository),
  },
  {
    provide: ResendConfirmationEmailUseCase,
    inject: [UserRepository, EventEmitterService],
    useFactory: (userRepository, eventEmitter) =>
      new ResendConfirmationEmailUseCase(userRepository, eventEmitter),
  },
];

@Module({
  controllers,
  providers: [...repositories, ...mailers, ...useCases, ...eventListeners],
})
export class UserAccountModule {}
