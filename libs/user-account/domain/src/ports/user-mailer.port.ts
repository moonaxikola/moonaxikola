import { User } from '../entities';

export interface UserMailerPort {
  sendWelcomeEmail(user: User): Promise<void>;
  sendVerificationEmail(user: User): Promise<void>;
}
