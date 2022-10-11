import { v4 as uuid } from 'uuid';
import { EntityValidationException } from '@moona-backend/common/domain';
import * as bcrypt from 'bcrypt';
import { UserFactoryPayload } from '../../@types';
import { User } from '../user.entity';

const passwordHash = bcrypt.hashSync('123456', 10);

describe('User', () => {
  describe('factory', () => {
    it('should instanciate a user with valid payload', async () => {
      const currentDate = new Date();

      const payload: UserFactoryPayload = {
        id: uuid(),
        email: 'john.doe@example.com',
        password: '123456',
        emailVerifiedAt: currentDate,
      };

      const user = await User.factory(payload);

      expect(user.id).toBe(payload.id);
      expect(user.email).toBe(payload.email);
      expect(user.isEmailVerified()).toBe(true);
    });

    it('should throw an entity validation error with invalid payload', () => {
      const payload: UserFactoryPayload = { id: uuid() } as UserFactoryPayload;

      expect(User.factory(payload)).rejects.toThrowError(EntityValidationException);
    });
  });

  describe('comparePassword', () => {
    it('should return true if the password is correct', async () => {
      const currentDate = new Date();

      const payload: UserFactoryPayload = {
        id: uuid(),
        email: 'john.doe@example.com',
        password: passwordHash,
        emailVerifiedAt: currentDate,
      };

      const user = await User.factory(payload);

      await expect(user.comparePassword('123456')).resolves.toBe(true);
    });

    it('should return false if the password is incorrect', async () => {
      const currentDate = new Date();

      const payload: UserFactoryPayload = {
        id: uuid(),
        email: 'john.doe@example.com',
        password: passwordHash,
        emailVerifiedAt: currentDate,
      };

      const user = await User.factory(payload);

      await expect(user.comparePassword('secret')).resolves.toBe(false);
    });
  });
});
