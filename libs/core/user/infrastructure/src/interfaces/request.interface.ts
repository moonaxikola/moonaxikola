import { User } from '@moona/core/user/domain';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: User;
}
