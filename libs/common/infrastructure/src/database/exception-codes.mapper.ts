import { HttpStatus } from '@nestjs/common/enums';

export const prismaHttpStatusMapping = {
  P2000: HttpStatus.BAD_REQUEST,
  P2002: HttpStatus.CONFLICT,
  P2025: HttpStatus.NOT_FOUND,
};
