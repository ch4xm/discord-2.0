// Citation:
// Taken from Professor Harrison's authController.ts file
// from the authenticated book example

import { Body, Controller, Post, Response, Route } from 'tsoa';
import { Authenticated, Credentials } from '.';
import { AuthService } from './service';

@Route()
export class AuthController extends Controller {
  @Post('login')
  @Response(401, 'Unauthorized')
  public async login(
    @Body() credentials: Credentials
  ): Promise<Authenticated | null> {
    return new AuthService()
      .login(credentials)
      .then(
        async (user: Authenticated | null): Promise<Authenticated | null> => {
          if (!user) {
            this.setStatus(401);
          }
          return user;
        }
      );
  }
}
