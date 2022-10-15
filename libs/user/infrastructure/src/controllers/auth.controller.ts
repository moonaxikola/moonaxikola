import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards, Body } from '@nestjs/common';
import { SignUpUseCase } from '@moona-backend/user/use-cases';

import { SignUpDto } from '../dtos';
import { RequestWithUser } from '../interfaces';
import { LocalAuthenticationGuard } from '../guards';
import { AuthService } from '../services';
import { JwtAuthenticationGuard } from '../guards';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailSignUpUseCase: SignUpUseCase,
  ) {}

  @Post('sign-up/email')
  @HttpCode(HttpStatus.CREATED)
  async emailSignUp(@Body() body: SignUpDto) {
    return this.emailSignUpUseCase.execute(body);
  }

  @Post('sign-in/email')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthenticationGuard)
  async email(@Req() request: RequestWithUser) {
    const { user } = request;

    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);

    request.res.setHeader('Set-Cookie', [accessTokenCookie]);

    return user.toProps();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  async signOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }
}
