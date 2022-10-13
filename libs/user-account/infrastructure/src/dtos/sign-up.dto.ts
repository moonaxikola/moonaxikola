import { SignUpUseCasePayload } from '@moona-backend/user-account/use-cases';
import { IsAlphanumeric, IsEmail, IsString, MinLength } from 'class-validator';

interface SignUpRequest extends SignUpUseCasePayload {
  confirmPassword: string;
}

export class SignUpDto implements SignUpRequest {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsAlphanumeric()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  confirmPassword: string;
}
