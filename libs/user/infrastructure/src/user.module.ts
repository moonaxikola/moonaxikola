import { Module, Provider, Type } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EventEmitterService } from '@moona/common/infrastructure';
import {
  SignUpUseCase,
  ConfirmEmailUseCase,
  ResendConfirmationEmailUseCase,
  ChangePasswordUseCase,
  ForgotPasswordUseCase,
  ResetPasswordUseCase,
} from '@moona/user/use-cases';

import { UserMailer } from './mailer';
import { AuthService } from './services';
import { UserAccountListener } from './listeners';
import { LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy } from './strategies';
import { UserRepository, RefreshTokenRepository } from './repositories';
import {
  EmailConfirmationController,
  AuthController,
  AccountController,
  ResetPasswordController,
} from './controllers';

const controllers: Type[] = [
  AuthController,
  EmailConfirmationController,
  AccountController,
  ResetPasswordController,
];

const repositories: Provider[] = [UserRepository, RefreshTokenRepository];

const mailers: Provider[] = [UserMailer];

const eventListeners: Provider[] = [UserAccountListener];

const services: Provider[] = [AuthService];

const strategies: Provider[] = [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy];

const useCases: Provider[] = [
  {
    provide: SignUpUseCase,
    inject: [UserRepository, EventEmitterService],
    useFactory: (userRepository, event) => new SignUpUseCase(userRepository, event),
  },
  {
    provide: ForgotPasswordUseCase,
    inject: [UserRepository, EventEmitterService],
    useFactory: (userRepository, event) => new ForgotPasswordUseCase(userRepository, event),
  },
  {
    provide: ResetPasswordUseCase,
    inject: [UserRepository],
    useFactory: userRepository => new ResetPasswordUseCase(userRepository),
  },
  {
    provide: ConfirmEmailUseCase,
    inject: [UserRepository],
    useFactory: userRepository => new ConfirmEmailUseCase(userRepository),
  },
  {
    provide: ChangePasswordUseCase,
    inject: [UserRepository],
    useFactory: userRepository => new ChangePasswordUseCase(userRepository),
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
