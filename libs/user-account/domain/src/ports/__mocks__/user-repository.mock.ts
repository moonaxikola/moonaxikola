import { User } from '../../entities';
import { UserRepositoryPort } from '../user-repository.port';

export class UserRepositoryMock implements UserRepositoryPort {
  async countByEmail(email: string): Promise<number> {
    return 0;
  }

  async save(entity: User): Promise<void> {
    return;
  }
}
