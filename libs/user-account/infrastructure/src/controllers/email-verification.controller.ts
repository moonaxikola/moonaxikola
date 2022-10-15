import { ConfirmEmailUseCase, ResendConfirmationEmailUseCase } from '@moona-backend/user-account/use-cases';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ConfirmEmailDto, ResendConfirmationEmailDto } from '../dtos';

@Controller('email')
export class EmailVerificationController {
  constructor(
    private readonly confirmEmailUseCase: ConfirmEmailUseCase,
    private readonly resendConfirmationEmailUseCase: ResendConfirmationEmailUseCase,
  ) {}

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(@Body() body: ConfirmEmailDto) {
    return this.confirmEmailUseCase.execute(body);
  }

  @Post('resend')
  @HttpCode(HttpStatus.OK)
  async resend(@Body() body: ResendConfirmationEmailDto) {
    return this.resendConfirmationEmailUseCase.execute(body);
  }
}
