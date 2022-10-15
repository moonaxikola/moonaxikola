import assert from 'node:assert';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@moona-backend/user/domain';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '../repositories';
import { JwtTokenPayload } from '../interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  getCookieWithJwtAccessToken(userId: string): string {
    const accessExpiresIn = this.config.get('auth.accessTokenExpiresIn');

    const payload: JwtTokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.config.get('auth.accessTokenSecret'),
      expiresIn: accessExpiresIn,
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${accessExpiresIn}`;
  }

  getCookieWithJwtRefreshToken(userId: string) {
    const refreshExpiresIn = this.config.get('auth.refreshTokenExpiresIn');

    const payload: JwtTokenPayload = { userId };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get('auth.refreshTokenSecret'),
      expiresIn: refreshExpiresIn,
    });
    const refreshTokenCookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${refreshExpiresIn}`;

    return { refreshTokenCookie, refreshToken };
  }

  async getUserFromAccessToken(token: string): Promise<User | null> {
    const payload = this.jwtService.verify<JwtTokenPayload>(token, {
      secret: this.config.get('auth.accessTokenSecret'),
    });

    assert(payload.userId, new UnauthorizedException('Invalid access token'));

    return this.userRepository.findById(payload.userId);
  }

  async getAuthenticatedUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    assert(user, new UnauthorizedException('Invalid credentials'));
    assert(await user.comparePassword(password), new UnauthorizedException('Invalid credentials'));
    assert(user.isEmailVerified(), new UnauthorizedException('Email is not verified'));

    return user;
  }

  getCookiesForLogOut() {
    return ['Authentication=; HttpOnly; Path=/; Max-Age=0', 'Refresh=; HttpOnly; Path=/; Max-Age=0'];
  }
}
