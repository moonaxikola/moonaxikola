import { UserProps } from '.';

export interface IUserMailer {
  sendWelcomeEmail(user: UserProps): Promise<void>;
  sendVerificationEmail(user: UserProps): Promise<void>;
  sendPasswordResetEmail(user: UserProps): Promise<void>;
}
