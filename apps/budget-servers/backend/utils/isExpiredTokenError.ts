import { TokenExpiredError } from 'jsonwebtoken';

export const isExpiredTokenError = (error: TokenExpiredError): error is TokenExpiredError => {
  return typeof error.expiredAt !== undefined;
};
