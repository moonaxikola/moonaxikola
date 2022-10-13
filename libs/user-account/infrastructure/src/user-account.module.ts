import { SignUpUseCase } from '@moona-backend/user-account/use-cases';
import { EventEmitterService } from '@moona-backend/common/infrastructure';
import { Module, Provider, Type } from '@nestjs/common';

import { UserRepository } from './repositories';
import { UserMailer } from './mailer';
import { UserAccountController } from './controllers';
import { UserAccountListener } from './listeners';

const controllers: Type[] = [UserAccountController];

const repositories: Provider[] = [UserRepository];

const mailers: Provider[] = [UserMailer];

const eventListeners: Provider[] = [UserAccountListener];

const useCases: Provider[] = [
  {
    provide: SignUpUseCase,
    inject: [UserRepository, EventEmitterService],
    useFactory: (userRepository, eventEmitter) => new SignUpUseCase(userRepository, eventEmitter),
  },
];

@Module({
  controllers,
  providers: [...repositories, ...mailers, ...useCases, ...eventListeners],
})
export class UserAccountModule {}
