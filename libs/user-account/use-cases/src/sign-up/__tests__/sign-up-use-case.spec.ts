import { UserRepositoryMock, UserMailerMock } from '@moona-backend/user-account/domain';
import { SignUpUseCasePayload } from '../sign-up.interfaces';
import { SignUpUseCase } from '../sign-up.use-case';

describe('Sign Up use case', () => {
  it('should create a new user with valid payload', async () => {
    const payload: SignUpUseCasePayload = {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123456',
    };

    const useCase = new SignUpUseCase(new UserRepositoryMock(), new UserMailerMock());

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
});
