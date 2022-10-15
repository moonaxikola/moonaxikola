import { ForgotPasswordUseCase } from '@moona-backend/user/use-cases';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ForgotPasswordDto } from '../dtos';

@Controller('password')
export class ResetPasswordController {
  constructor(private readonly forgotPasswordUseCase: ForgotPasswordUseCase) {}

  @Post('forgot')
  @HttpCode(HttpStatus.OK)
  async forgot(@Body() body: ForgotPasswordDto) {
    return this.forgotPasswordUseCase.execute(body);
  }
}
