import { Request } from 'express';

import { AuthenticatedUser } from '../model/AuthenticatedUser';

export interface AuthenticatedRequest extends Request {
    user: AuthenticatedUser;
}
