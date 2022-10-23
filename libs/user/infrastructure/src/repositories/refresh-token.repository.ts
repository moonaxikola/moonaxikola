import assert from 'node:assert';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaRepository } from '@moona/common/infrastructure';
import { User } from '@moona/user/domain';
import bcrypt from 'bcrypt';

import { UserMapper } from '../mappers';

@Injectable()
export class RefreshTokenRepository extends PrismaRepository {
  async setRefreshToken(user: User, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken },
    });
  }

  async removeRefreshToken(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: null },
    });
  }

  async getUserFromRefreshToken(refreshToken: string, userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    assert(user, new UnauthorizedException('Invalid refresh token'));

    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.refreshToken);

    if (isRefreshTokenMatching) {
      return await UserMapper.toDomain(user);
    }
  }
}
