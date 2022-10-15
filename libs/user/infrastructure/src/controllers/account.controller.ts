import { UseGuards, Controller, Get, Req } from '@nestjs/common';

import { JwtAuthenticationGuard } from '../guards';
import { RequestWithUser } from '../interfaces';

@Controller('account')
export class AccountController {
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async accountDetaills(@Req() request: RequestWithUser) {
    return request.user;
  }
}
