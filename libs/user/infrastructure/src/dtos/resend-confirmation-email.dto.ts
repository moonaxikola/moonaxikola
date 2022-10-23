import { ResendConfirmationEmailUseCasePayload } from '@moona/user/use-cases';
import { IsEmail } from 'class-validator';

type ResendConfirmationEmailRequest = ResendConfirmationEmailUseCasePayload;

export class ResendConfirmationEmailRequestDto implements ResendConfirmationEmailRequest {
  @IsEmail()
  email: string;
}
