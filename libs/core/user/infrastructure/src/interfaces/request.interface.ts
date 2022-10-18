import { User } from '@moona-backend/core/user/domain';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: User;
}
