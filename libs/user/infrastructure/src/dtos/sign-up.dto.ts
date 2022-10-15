import { Match, IsPassword, IsUsername } from '@moona-backend/common/utils';
import { SignUpUseCasePayload } from '@moona-backend/user/use-cases';
import { IsEmail, IsString, MinLength } from 'class-validator';

interface SignUpRequest extends SignUpUseCasePayload {
  confirmPassword: string;
}

export class SignUpDto implements SignUpRequest {
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
