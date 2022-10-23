import { Match, IsPassword } from '@moona/common/utils';
import { ChangePasswordRequest } from '@moona/common/contracts';

export class ChangePasswordRequestDto implements ChangePasswordRequest {
  @IsPassword()
  oldPassword: string;

  @IsPassword()
  newPassword: string;

  @Match('newPassword')
  confirmNewPassword: string;
}
