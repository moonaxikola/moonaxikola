import { Match, IsPassword, IsUsername } from '@moona/core/common/utils';
import { SignUpUseCasePayload } from '@moona/core/user/use-cases';
import { IsEmail, IsString, MinLength } from 'class-validator';

export interface SignUpRequest extends SignUpUseCasePayload {
  confirmPassword: string;
}

export class SignUpRequestDto implements SignUpRequest {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsUsername()
  username: string;

  @IsPassword()
  password: string;

  @Match('password')
  confirmPassword: string;
}
