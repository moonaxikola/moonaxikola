import { User as PrismaUser } from '@prisma/client';
import { User } from '@moona-backend/user-account/domain';
import { EntityMapper } from '@moona-backend/common/domain';

export const UserMapper: EntityMapper<User, PrismaUser> = {
  toDomain: async user => {
    return await User.factory({
      id: user.id,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      emailVerifiedAt: user.emailVerifiedAt,
      username: user.username,
    });
  },

  toOrm: user => {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      emailVerifiedAt: user.emailVerifiedAt,
      username: user.username,
    };
  },
};
