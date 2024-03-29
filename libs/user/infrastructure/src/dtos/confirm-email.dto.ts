import { ConfirmEmailUseCasePayload } from '@moona/user/use-cases';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export type ConfirmEmailRequest = ConfirmEmailUseCasePayload;

export class ConfirmEmailRequestDto implements ConfirmEmailRequest {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEmail()
  email: string;
}
