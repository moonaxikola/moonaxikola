import { Injectable } from '@nestjs/common';
import { User } from '@moona-backend/user/domain';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { UserRepository } from '../repositories';
import { JwtTokenPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository, private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: config.get('auth.accessTokenSecret'),
    });
  }

  async validate(payload: JwtTokenPayload): Promise<User> {
    return this.userRepository.findById(payload.userId);
  }
}
