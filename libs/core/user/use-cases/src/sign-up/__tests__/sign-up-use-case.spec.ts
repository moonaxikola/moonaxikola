import { UserAlreadyExistsException, IUserRepository } from '@moona/core/user/domain';
import { ENTITY_EXCEPTION_CODE, EventEmitter } from '@moona/core/common/domain';

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
  const userRepository = {} as IUserRepository;
  const eventEmitter = {} as EventEmitter;

  beforeEach(() => {
    userRepository.countByEmail = jest.fn().mockResolvedValue(0);
    eventEmitter.dispatch = jest.fn().mockResolvedValue(undefined);
  });

  describe('execute', () => {
    it('should create a new user with valid payload', async () => {
      jest.spyOn(userRepository, 'countByEmail').mockResolvedValue(0);

      const payload: SignUpUseCasePayload = { ...mockSignUpUseCasePayload };
      const useCase = new SignUpUseCase(userRepository, eventEmitter);

      await expect(useCase.execute(payload)).resolves.not.toThrow();
    });

    it('should throw "Entity Already Exists" error if email is already taken', async () => {
      jest.spyOn(userRepository, 'countByEmail').mockResolvedValue(1);

      const useCase = new SignUpUseCase(userRepository, eventEmitter);

      try {
        await useCase.execute({ ...mockSignUpUseCasePayload });
      } catch (e) {
        expect(e).toBeInstanceOf(UserAlreadyExistsException);
        expect(e.code).toBe(ENTITY_EXCEPTION_CODE.ALREADY_EXISTS);
      }
    });
  });
});
