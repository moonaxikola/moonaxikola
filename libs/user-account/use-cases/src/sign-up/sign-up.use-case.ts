import {
  CreateUserPayload,
  UserProps,
  UserRepositoryPort,
  UserMailerPort,
  UserAlreadyExistsException,
  User,
} from '@moona-backend/user-account/domain';
import { ISignUpUseCase } from './sign-up.interfaces';

export class SignUpUseCase implements ISignUpUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly userMailer: UserMailerPort,
  ) {}

  async execute(payload: CreateUserPayload): Promise<UserProps> {
    const doesUserExist = await this.userRepository.countByEmail(payload.email);

    if (doesUserExist !== 0) throw new UserAlreadyExistsException('email', payload.email);

    const user = await User.create(payload);

    await this.userRepository.create(user);

    await this.userMailer.sendVerificationEmail(user);
    await this.userMailer.sendWelcomeEmail(user);

    return user.toProps();
  }
}
