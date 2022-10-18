import { ForgotPasswordUseCase, ResetPasswordUseCase } from '@moona-backend/core/user/use-cases';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ForgotPasswordRequestDto, ResetPasswordRequestDto } from '../dtos';

@Controller('password')
export class ResetPasswordController {
  constructor(
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @Post('forgot')
  @HttpCode(HttpStatus.OK)
  async forgot(@Body() body: ForgotPasswordRequestDto) {
    return this.forgotPasswordUseCase.execute(body);
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  async reset(@Body() body: ResetPasswordRequestDto) {
    return this.resetPasswordUseCase.execute(body);
  }
}
