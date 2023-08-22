import { UserDto } from '../dto/UserDto';

export interface AuthenticatedRequest extends Request {
  user: UserDto;
}
