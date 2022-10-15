import { ConfirmEmailUseCasePayload } from '@moona-backend/user-account/use-cases';
import { IsNotEmpty, IsString } from 'class-validator';

type ConfirmEmailRequest = ConfirmEmailUseCasePayload;

export class ConfirmEmailDto implements ConfirmEmailRequest {
  @IsString()
  @IsNotEmpty()
  token: string;
}
