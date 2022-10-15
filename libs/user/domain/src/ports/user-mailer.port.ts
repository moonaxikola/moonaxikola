import { UserProps } from '../@types';
export interface UserMailerPort {
  sendWelcomeEmail(user: UserProps): Promise<void>;
  sendVerificationEmail(user: UserProps): Promise<void>;
}
