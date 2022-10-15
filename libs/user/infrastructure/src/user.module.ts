import { Module, Provider, Type } from '@nestjs/common';
import { EventEmitterService } from '@moona-backend/common/infrastructure';
import {
  SignUpUseCase,
  ConfirmEmailUseCase,
  ResendConfirmationEmailUseCase,
} from '@moona-backend/user/use-cases';

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
    useFactory: (userRepository, event) => new SignUpUseCase(userRepository, event),
  },
  {
    provide: ConfirmEmailUseCase,
    inject: [UserRepository],
    useFactory: userRepository => new ConfirmEmailUseCase(userRepository),
  },
  {
    provide: ResendConfirmationEmailUseCase,
    inject: [UserRepository, EventEmitterService],
    useFactory: (userRepository, event) => new ResendConfirmationEmailUseCase(userRepository, event),
  },
];

@Module({
  controllers,
  providers: [...repositories, ...mailers, ...useCases, ...eventListeners],
})
export class UserModule {}
