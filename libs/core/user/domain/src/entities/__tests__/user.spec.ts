import { v4 as uuid, validate as validateUuid } from 'uuid';
import { EntityValidationException } from '@moona-backend/core/common/domain';
import { UserFactoryPayload, CreateUserPayload } from '../../@types';
import { User } from '../user.entity';

describe('User', () => {
  describe('instanciate', () => {
    it('should instanciate a user with valid payload', async () => {
      const currentDate = new Date();

      const payload: UserFactoryPayload = {
        id: uuid(),
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: '123456',
        username: 'john.doe',
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      const user = await User.factory(payload);

      expect(user.id).toBe(payload.id);
      expect(user.email).toBe(payload.email);
      expect(user.firstName).toBe(payload.firstName);
      expect(user.lastName).toBe(payload.lastName);
      expect(user.createdAt).toBe(currentDate);
      expect(user.updatedAt).toBe(currentDate);
      expect(user.fullName).toBe('John Doe');
    });

    it('should throw an entity validation error with invalid payload', () => {
      const payload: UserFactoryPayload = { id: uuid() } as UserFactoryPayload;

      expect(User.factory(payload)).rejects.toThrowError(EntityValidationException);
    });
  });

  describe('create', () => {
    it('should create a user with valid payload', async () => {
      const payload: CreateUserPayload = {
        email: 'john.doe@example.com',
        username: 'john.doe',
        firstName: 'John',
        lastName: 'Doe',
        password: '123456',
      };

      const user = await User.create(payload);

      expect(validateUuid(user.id)).toBe(true);
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
      expect(user.email).toBe(payload.email);
      expect(user.firstName).toBe(payload.firstName);
      expect(user.lastName).toBe(payload.lastName);
      expect(user.fullName).toBe('John Doe');
    });
  });

  describe('comparePassword', () => {
    it('should return true if the password is correct', async () => {
      const payload: CreateUserPayload = {
        email: 'john.doe@example.com',
        username: 'john.doe',
        firstName: 'John',
        lastName: 'Doe',
        password: '123456',
      };

      const user = await User.create(payload);

      await expect(user.comparePassword('123456')).resolves.toBe(true);
    });

    it('should return false if the password is incorrect', async () => {
      const payload: CreateUserPayload = {
        email: 'john.doe@example.com',
        username: 'john.doe',
        firstName: 'John',
        lastName: 'Doe',
        password: '123456',
      };

      const user = await User.create(payload);

      await expect(user.comparePassword('secret')).resolves.toBe(false);
    });
  });

  describe('changePassword', () => {
    it('should change the password', async () => {
      const payload: CreateUserPayload = {
        email: 'john.doe@example.com',
        username: 'john.doe',
        firstName: 'John',
        lastName: 'Doe',
        password: '123456',
      };

      const user = await User.create(payload);

      expect(user.comparePassword('123456')).resolves.toBe(true);
      expect(user.comparePassword('secret')).resolves.toBe(false);

      await user.changePassword('secret');

      expect(user.comparePassword('123456')).resolves.toBe(false);
      expect(user.comparePassword('secret')).resolves.toBe(true);
    });
  });
});
