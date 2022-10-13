import { EventEmitter } from '@moona-backend/common/domain';
import {
  CreateUserPayload,
  UserProps,
  UserRepositoryPort,
  UserAlreadyExistsException,
  User,
  UserCreatedEvent,
} from '@moona-backend/user-account/domain';
import { ISignUpUseCase } from './sign-up.interfaces';

export class SignUpUseCase implements ISignUpUseCase {
  constructor(private readonly userRepository: UserRepositoryPort, private readonly event: EventEmitter) {}

  async execute(payload: CreateUserPayload): Promise<UserProps> {
    const doesEmailExist = await this.userRepository.countByEmail(payload.email);
    if (doesEmailExist) throw new UserAlreadyExistsException('email', payload.email);

    const doesUsernameExist = await this.userRepository.countByUsername(payload.username);
    if (doesUsernameExist) throw new UserAlreadyExistsException('username', payload.username);

    const user = await User.create(payload);

    await this.userRepository.create(user);

    this.event.dispatch(new UserCreatedEvent(user.toProps()));

    return user.toProps();
  }
}
