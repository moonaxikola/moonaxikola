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
    const doesEmailExist = await this.userRepository.countByEmail(payload.email);
    if (doesEmailExist) throw new UserAlreadyExistsException('email', payload.email);

    const doesUsernameExist = await this.userRepository.countByUsername(payload.username);
    if (doesUsernameExist) throw new UserAlreadyExistsException('username', payload.username);

    const user = await User.create(payload);

    await this.userRepository.create(user);

    await this.userMailer.sendVerificationEmail(user);
    await this.userMailer.sendWelcomeEmail(user);

    return user.toProps();
  }
}
