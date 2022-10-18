import { ForgotPasswordUseCasePayload } from '@moona-backend/core/user/use-cases';
import { IsEmail } from 'class-validator';

export type ForgotPasswordRequest = ForgotPasswordUseCasePayload;

export class ForgotPasswordRequestDto implements ForgotPasswordRequest {
  @IsEmail()
  email: string;
}
