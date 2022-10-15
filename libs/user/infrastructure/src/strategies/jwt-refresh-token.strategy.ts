import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { JwtTokenPayload } from '../interfaces';
import { RefreshTokenRepository } from '../repositories';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    private readonly config: ConfigService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: config.get('auth.refreshTokenSecret'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtTokenPayload) {
    const refreshToken = request.cookies?.Refresh;
    return this.refreshTokenRepository.getUserFromRefreshToken(refreshToken, payload.userId);
  }
}
