import { BaseRepositoryport } from '@moona-backend/common/domain';
import { User } from '../entities';

export interface UserRepositoryPort extends BaseRepositoryport<User> {
  countByEmail(email: string): Promise<number>;
  countByUsername(username: string): Promise<number>;
}
