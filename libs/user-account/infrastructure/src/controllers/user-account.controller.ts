import { SignUpUseCase } from '@moona-backend/user-account/use-cases';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { SignUpDto } from '../dtos';

@Controller()
export class UserAccountController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() body: SignUpDto) {
    return this.signUpUseCase.execute(body);
  }
}
