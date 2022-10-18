import { User as PrismaUser } from '@prisma/client';
import { User } from '@moona/core/user/domain';
import { UserMapper } from '../user.mapper';

describe('User Mapper', () => {
  it('should map a user to a domain entity', async () => {
    const prismaUser: PrismaUser = {
      id: 'b9f1b9f0-5c1a-4b1a-8c1a-5c1a4b1a8c1a',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123456',
      username: 'john.doe',
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerifiedAt: new Date(),
    };

    const user = await UserMapper.toDomain(prismaUser);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
    expect(user.id).toEqual(prismaUser.id);
    expect(user.email).toEqual(prismaUser.email);
    expect(user.firstName).toEqual(prismaUser.firstName);
    expect(user.lastName).toEqual(prismaUser.lastName);
    expect(user.password).toEqual(prismaUser.password);
    expect(user.username).toEqual(prismaUser.username);
    expect(user.createdAt).toEqual(prismaUser.createdAt);
    expect(user.updatedAt).toEqual(prismaUser.updatedAt);
    expect(user.emailVerifiedAt).toEqual(prismaUser.emailVerifiedAt);
  });

  it('should map a user to an orm entity', async () => {
    const user = await User.factory({
      id: 'b9f1b9f0-5c1a-4b1a-8c1a-5c1a4b1a8c1a',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123456',
      username: 'john.doe',
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerifiedAt: new Date(),
    });

    const prismaUser = UserMapper.toOrm(user);

    expect(prismaUser).toBeDefined();
    expect(prismaUser.id).toEqual(user.id);
    expect(prismaUser.email).toEqual(user.email);
    expect(prismaUser.firstName).toEqual(user.firstName);
    expect(prismaUser.lastName).toEqual(user.lastName);
    expect(prismaUser.password).toEqual(user.password);
    expect(prismaUser.username).toEqual(user.username);
    expect(prismaUser.createdAt).toEqual(user.createdAt);
    expect(prismaUser.updatedAt).toEqual(user.updatedAt);
    expect(prismaUser.emailVerifiedAt).toEqual(user.emailVerifiedAt);
  });
});
