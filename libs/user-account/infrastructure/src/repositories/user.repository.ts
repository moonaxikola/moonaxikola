import { PrismaRepository } from '@moona-backend/common/infrastructure';
import { User, UserRepositoryPort } from '@moona-backend/user-account/domain';
import { Injectable } from '@nestjs/common/decorators';

import { UserMapper } from '../mappers';

@Injectable()
export class UserRepository extends PrismaRepository implements UserRepositoryPort {
  async getOneById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return UserMapper.toDomain(user);
  }

  async getManyByIds(ids: string[]): Promise<User[]> {
    const users = await this.prisma.user.findMany({ where: { id: { in: ids } } });
    return Promise.all(users.map(async user => await UserMapper.toDomain(user)));
  }

  async countByEmail(email: string): Promise<number> {
    return this.prisma.user.count({
      where: { email },
    });
  }

  async countByUsername(username: string): Promise<number> {
    return this.prisma.user.count({
      where: { username },
    });
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: UserMapper.toOrm(user),
    });
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: UserMapper.toOrm(user),
    });
  }
}
