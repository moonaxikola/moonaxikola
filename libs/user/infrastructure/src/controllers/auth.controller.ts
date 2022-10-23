import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards, Body } from '@nestjs/common';
import { SignUpUseCase } from '@moona/user/use-cases';

import { RefreshTokenRepository } from '../repositories';
import { SignUpRequestDto } from '../dtos';
import { RequestWithUser } from '../interfaces';
import { JwtRefreshGuard, LocalAuthenticationGuard } from '../guards';
import { AuthService } from '../services';
import { JwtAuthenticationGuard } from '../guards';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailSignUpUseCase: SignUpUseCase,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  @Post('sign-up/email')
  @HttpCode(HttpStatus.CREATED)
  async emailSignUp(@Body() body: SignUpRequestDto) {
    return this.emailSignUpUseCase.execute(body);
  }

  @Post('sign-in/email')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthenticationGuard)
  async email(@Req() request: RequestWithUser) {
    const { user } = request;

    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
    const { refreshTokenCookie, refreshToken } = this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.refreshTokenRepository.setRefreshToken(user, refreshToken);

    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  async signOut(@Req() request: RequestWithUser) {
    await this.refreshTokenRepository.removeRefreshToken(request.user);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id);

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user.toProps();
  }
}
