import { Match, IsPassword } from '@moona-backend/common/utils';
import { ChangePasswordUseCasePayload } from '@moona-backend/user/use-cases';

interface ChangePasswordRequest extends Omit<ChangePasswordUseCasePayload, 'user'> {
  confirmNewPassword: string;
}

export class ChangePasswordDto implements ChangePasswordRequest {
  @IsPassword()
  oldPassword: string;

  @IsPassword()
  newPassword: string;

  @Match('newPassword')
  confirmNewPassword: string;
}
