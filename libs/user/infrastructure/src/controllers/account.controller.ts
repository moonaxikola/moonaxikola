import { ChangePasswordUseCase } from '@moona-backend/user/use-cases';
import { UseGuards, Controller, Get, Req, Body, Put } from '@nestjs/common';
import { ChangePasswordDto } from '../dtos';

import { JwtAuthenticationGuard } from '../guards';
import { RequestWithUser } from '../interfaces';

@Controller('account')
export class AccountController {
  constructor(private readonly changePasswordUseCase: ChangePasswordUseCase) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async accountDetaills(@Req() request: RequestWithUser) {
    return request.user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('password')
  async changePassword(@Req() request: RequestWithUser, @Body() body: ChangePasswordDto) {
    return this.changePasswordUseCase.execute({ user: request.user, ...body });
  }
}
