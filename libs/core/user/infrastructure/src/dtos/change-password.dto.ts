import { Match, IsPassword } from '@moona/core/common/utils';
import { ChangePasswordRequest } from '@moona/core/common/contracts';

export class ChangePasswordRequestDto implements ChangePasswordRequest {
  @IsPassword()
  oldPassword: string;

  @IsPassword()
  newPassword: string;

  @Match('newPassword')
  confirmNewPassword: string;
}
