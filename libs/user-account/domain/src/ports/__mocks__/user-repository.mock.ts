import { User } from '../../entities';
import { UserRepositoryPort } from '../user-repository.port';

export class UserRepositoryMock implements UserRepositoryPort {
  async create(entity: User): Promise<void> {
    return;
  }

  async update(entity: User): Promise<void> {
    return;
  }

  async countByEmail(email: string): Promise<number> {
    return 0;
  }
}
