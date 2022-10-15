import { ConfirmEmailUseCase } from '@moona-backend/user-account/use-cases';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ConfirmEmailDto } from '../dtos';

@Controller('email')
export class EmailVerificationController {
  constructor(private readonly confirmEmailUseCase: ConfirmEmailUseCase) {}

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(@Body() body: ConfirmEmailDto) {
    return this.confirmEmailUseCase.execute(body);
  }
}
