import { Module, Provider, Type } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EventEmitterService } from '@moona-backend/common/infrastructure';
import {
  SignUpUseCase,
  ConfirmEmailUseCase,
  ResendConfirmationEmailUseCase,
} from '@moona-backend/user/use-cases';

import { UserRepository } from './repositories';
import { UserMailer } from './mailer';
import { EmailVerificationController, AuthController } from './controllers';
import { UserAccountListener } from './listeners';
import { AuthService } from './services';
import { LocalStrategy, JwtStrategy } from './strategies';

const controllers: Type[] = [AuthController, EmailVerificationController];

const repositories: Provider[] = [UserRepository];

const mailers: Provider[] = [UserMailer];

const eventListeners: Provider[] = [UserAccountListener];

const services: Provider[] = [AuthService];

const strategies: Provider[] = [LocalStrategy, JwtStrategy];

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
  imports: [PassportModule, JwtModule],
  providers: [...repositories, ...mailers, ...useCases, ...services, ...eventListeners, ...strategies],
})
export class UserModule {}
