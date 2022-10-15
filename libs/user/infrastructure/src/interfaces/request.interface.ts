import { User } from '@moona-backend/user/domain';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: User;
}
