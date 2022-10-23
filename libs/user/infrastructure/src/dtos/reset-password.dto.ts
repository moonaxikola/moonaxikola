import { Match, IsPassword } from '@moona/common/utils';
import { ResetPasswordUseCasePayload } from '@moona/user/use-cases';
import { IsNotEmpty, IsString } from 'class-validator';

interface ResetPasswordRequest extends ResetPasswordUseCasePayload {
  confirmNewPassword: string;
}

export class ResetPasswordRequestDto implements ResetPasswordRequest {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsPassword()
  newPassword: string;

  @Match('newPassword')
  confirmNewPassword: string;
}
