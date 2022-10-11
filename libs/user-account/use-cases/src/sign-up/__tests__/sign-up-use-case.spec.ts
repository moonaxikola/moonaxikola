import {
  UserRepositoryMock,
  UserMailerMock,
  UserAlreadyExistsException,
} from '@moona-backend/user-account/domain';
import { ENTITY_EXCEPTION_CODE } from '@moona-backend/common/domain';
import { SignUpUseCasePayload } from '../sign-up.interfaces';
import { SignUpUseCase } from '../sign-up.use-case';

describe('Sign Up use case', () => {
  const userRepository = new UserRepositoryMock();
  const userMailer = new UserMailerMock();

  it('should create a new user with valid payload', async () => {
    const payload: SignUpUseCasePayload = {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123456',
    };

    const useCase = new SignUpUseCase(userRepository, userMailer);

    const user = await useCase.execute(payload);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.email).toEqual(payload.email);
    expect(user.firstName).toEqual(payload.firstName);
    expect(user.lastName).toEqual(payload.lastName);
    expect(user.isEmailVerified).toBe(false);
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });

  it('should throw "Entity Already Exists" error if email is already taken', async () => {
    jest.spyOn(userRepository, 'countByEmail').mockResolvedValue(1);

    const useCase = new SignUpUseCase(userRepository, userMailer);

    try {
      await useCase.execute({
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: '123456',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(UserAlreadyExistsException);
      expect(e.code).toBe(ENTITY_EXCEPTION_CODE.ALREADY_EXISTS);
    }
  });
});
