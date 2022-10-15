import { ForgotPasswordUseCase, ResetPasswordUseCase } from '@moona-backend/user/use-cases';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ForgotPasswordDto, ResetPasswordDto } from '../dtos';

@Controller('password')
export class ResetPasswordController {
  constructor(
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @Post('forgot')
  @HttpCode(HttpStatus.OK)
  async forgot(@Body() body: ForgotPasswordDto) {
    return this.forgotPasswordUseCase.execute(body);
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  async reset(@Body() body: ResetPasswordDto) {
    return this.resetPasswordUseCase.execute(body);
  }
}
