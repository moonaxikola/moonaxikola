import { BaseRepositoryport } from '@moona/common/domain';

import { User } from '../entities';

export interface IUserRepository extends BaseRepositoryport<User> {
  countByEmail(email: string): Promise<number>;
  countByUsername(username: string): Promise<number>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  getEmailConfirmationCode(email: string): Promise<string | null>;
  getEmailByPasswordResetToken(token: string): Promise<string | null>;
  deleteEmailConfirmationCode(email: string): Promise<void>;
  deletePasswordResetToken(token: string): Promise<void>;
  saveEmailConfirmationCode(email: string, code: string): Promise<void>;
  markEmailAsConfirmed(email: string): Promise<void>;
}
