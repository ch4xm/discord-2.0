import { Request } from 'express';
import { SessionUser } from '../types/express';
import { AuthService } from './service';

export function expressAuthentication(
  request: Request,
  securityName: string,
): Promise<SessionUser> {
  console.log('securityName', securityName);
  return new AuthService().check(request.headers.authorization);
}
