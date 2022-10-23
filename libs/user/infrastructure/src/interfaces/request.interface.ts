import { User } from '@moona/user/domain';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: User;
}
