import { ResendConfirmationEmailUseCasePayload } from '@moona-backend/user/use-cases';
import { IsEmail } from 'class-validator';

type ResendConfirmationEmailRequest = ResendConfirmationEmailUseCasePayload;

export class ResendConfirmationEmailDto implements ResendConfirmationEmailRequest {
  @IsEmail()
  email: string;
}
