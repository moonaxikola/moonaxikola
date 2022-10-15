import { Match, IsPassword } from '@moona-backend/common/utils';
import { ResetPasswordUseCasePayload } from '@moona-backend/user/use-cases';
import { IsNotEmpty, IsString } from 'class-validator';

interface ResetPasswordRequest extends ResetPasswordUseCasePayload {
  confirmNewPassword: string;
}

export class ResetPasswordDto implements ResetPasswordRequest {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsPassword()
  newPassword: string;

  @Match('newPassword')
  confirmNewPassword: string;
}
