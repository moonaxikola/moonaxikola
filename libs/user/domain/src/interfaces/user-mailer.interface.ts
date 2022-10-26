import { UserProps } from './user.interface';

export interface IUserMailer {
  sendWelcomeEmail(user: UserProps): Promise<void>;
  sendConfirmationEmail(user: UserProps): Promise<void>;
  sendPasswordResetEmail(user: UserProps): Promise<void>;
}
