import { UserAlreadyExistsException, UserRepositoryPort, UserMailerPort } from '@moona-backend/user/domain';
import { ENTITY_EXCEPTION_CODE } from '@moona-backend/common/domain';

import { SignUpUseCasePayload } from '../sign-up.interfaces';
import { SignUpUseCase } from '../sign-up.use-case';

const mockSignUpUseCasePayload: SignUpUseCasePayload = {
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  password: '123456',
  username: 'john.doe',
};

describe('SignUpUseCase', () => {
  const userRepository = {} as UserRepositoryPort;
  const userMailer = {} as UserMailerPort;

  beforeEach(() => {
    userRepository.countByEmail = jest.fn().mockResolvedValue(0);
    userRepository.create = jest.fn().mockResolvedValue(undefined);
    userMailer.sendWelcomeEmail = jest.fn().mockResolvedValue(undefined);
    userMailer.sendVerificationEmail = jest.fn().mockResolvedValue(undefined);
  });

  describe('execute', () => {
    it('should create a new user with valid payload', async () => {
      jest.spyOn(userRepository, 'countByEmail').mockResolvedValue(0);

      const payload: SignUpUseCasePayload = { ...mockSignUpUseCasePayload };
      const useCase = new SignUpUseCase(userRepository, userMailer);
      const user = await useCase.execute(payload);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toEqual(payload.email);
      expect(user.firstName).toEqual(payload.firstName);
      expect(user.lastName).toEqual(payload.lastName);
      expect(user.emailVerifiedAt).toBeUndefined();
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });

    it('should throw "Entity Already Exists" error if email is already taken', async () => {
      jest.spyOn(userRepository, 'countByEmail').mockResolvedValue(1);

      const useCase = new SignUpUseCase(userRepository, userMailer);

      try {
        await useCase.execute({ ...mockSignUpUseCasePayload });
      } catch (e) {
        expect(e).toBeInstanceOf(UserAlreadyExistsException);
        expect(e.code).toBe(ENTITY_EXCEPTION_CODE.ALREADY_EXISTS);
      }
    });
  });
});
