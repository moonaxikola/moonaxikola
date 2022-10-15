import { SignUpUseCase } from '@moona-backend/user/use-cases';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { SignUpDto } from '../dtos';

@Controller('sign-up')
export class SignUpController {
  constructor(private readonly emailSignUpUseCase: SignUpUseCase) {}

  @Post('email')
  @HttpCode(HttpStatus.CREATED)
  async email(@Body() body: SignUpDto) {
    return this.emailSignUpUseCase.execute(body);
  }
}
