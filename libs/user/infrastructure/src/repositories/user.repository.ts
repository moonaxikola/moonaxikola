import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@moona/common/infrastructure';
import { User, IUserRepository } from '@moona/user/domain';

import { UserMapper } from '../mappers';

@Injectable()
export class UserRepository extends PrismaRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByIds(ids: string[]): Promise<User[]> {
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

  private getEmailConfirmationCodeKey(code: string): string {
    return `email-confirm-code:${code}`;
  }

  private getPasswordResetTokenKey(token: string): string {
    return `password-reset-token:${token}`;
  }

  async getEmailByConfirmationCode(code: string): Promise<string> {
    return <string>await this.redis.get(this.getEmailConfirmationCodeKey(code));
  }

  async getEmailByPasswordResetToken(token: string): Promise<string> {
    return <string>await this.redis.get(this.getPasswordResetTokenKey(token));
  }

  async savePasswordResetToken(email: string, token: string): Promise<void> {
    const TWELVE_HEURES_IN_SECONDS = 60 * 60 * 12;
    await this.redis.set(this.getPasswordResetTokenKey(token), email, { ttl: TWELVE_HEURES_IN_SECONDS });
  }

  async markEmailAsConfirmed(email: string, token: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !!user.emailVerifiedAt) return;

    await this.prisma.user.update({
      where: { email },
      data: { emailVerifiedAt: new Date() },
    });

    await this.deleteEmailConfirmationCode(token);
  }

  async deleteEmailConfirmationCode(code: string): Promise<void> {
    await this.redis.del(this.getEmailConfirmationCodeKey(code));
  }

  async deletePasswordResetToken(token: string): Promise<void> {
    await this.redis.del(this.getPasswordResetTokenKey(token));
  }

  async saveEmailConfirmationCode(email: string, code: string): Promise<void> {
    const TWELVE_HEURES_IN_SECONDS = 60 * 60 * 12;
    await this.redis.set(this.getEmailConfirmationCodeKey(code), email, { ttl: TWELVE_HEURES_IN_SECONDS });
  }
}
