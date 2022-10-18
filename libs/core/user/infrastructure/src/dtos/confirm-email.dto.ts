import { ConfirmEmailUseCasePayload } from '@moona-backend/core/user/use-cases';
import { IsNotEmpty, IsString } from 'class-validator';

export type ConfirmEmailRequest = ConfirmEmailUseCasePayload;

export class ConfirmEmailRequestDto implements ConfirmEmailRequest {
  @IsString()
  @IsNotEmpty()
  token: string;
}
