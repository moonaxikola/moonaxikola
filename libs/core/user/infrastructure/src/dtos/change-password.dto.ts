import { Match, IsPassword } from '@moona-backend/core/common/utils';
import { ChangePasswordRequest } from '@moona-backend/core/common/contracts';

export class ChangePasswordRequestDto implements ChangePasswordRequest {
  @IsPassword()
  oldPassword: string;

  @IsPassword()
  newPassword: string;

  @Match('newPassword')
  confirmNewPassword: string;
}
