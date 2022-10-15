import { BaseRepositoryport } from '@moona-backend/common/domain';
import { User } from '../entities';

export interface UserRepositoryPort extends BaseRepositoryport<User> {
  countByEmail(email: string): Promise<number>;
  countByUsername(username: string): Promise<number>;
  getEmailByConfirmationToken(token: string): Promise<string | null>;
  deleteEmailConfirmationToken(token: string): Promise<void>;
  saveEmailConfirmationToken(email: string, token: string): Promise<void>;
  markEmailAsConfirmed(email: string, token: string): Promise<void>;
}
