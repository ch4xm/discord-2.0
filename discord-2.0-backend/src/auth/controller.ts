// Citation:
// Taken from Professor Harrison's authController.ts file
// from the authenticated book example

import { Body, Controller, Post, Response, Route } from "tsoa";
import { Authenticated, Credentials } from ".";
import { AuthService } from "./service";

@Route("login")
export class AuthController extends Controller {
  @Post()
  @Response(401, "Unauthorized")
  public async login(
    @Body() credentials: Credentials
  ): Promise<Authenticated | null> {
    return {
      name: credentials.email,
      accessToken: "fakeAccessToken12345",
    };
    // return new AuthService()
    //   .login(credentials)
    //   .then(
    //     async (
    //       user: Authenticated | null
    //     ): Promise<Authenticated | null> => {
    //       if (!user) {
    //         this.setStatus(401);
    //       }
    //       return user;
    //     }
    //   );
  }
}
