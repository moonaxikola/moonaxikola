import { ConfirmEmailUseCase, ResendConfirmationEmailUseCase } from '@moona/core/user/use-cases';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ConfirmEmailRequestDto, ResendConfirmationEmailRequestDto } from '../dtos';

@Controller('email')
export class EmailVerificationController {
  constructor(
    private readonly confirmEmailUseCase: ConfirmEmailUseCase,
    private readonly resendConfirmationEmailUseCase: ResendConfirmationEmailUseCase,
  ) {}

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(@Body() body: ConfirmEmailRequestDto) {
    return this.confirmEmailUseCase.execute(body);
  }

  @Post('resend')
  @HttpCode(HttpStatus.OK)
  async resend(@Body() body: ResendConfirmationEmailRequestDto) {
    return this.resendConfirmationEmailUseCase.execute(body);
  }
}
