import { Request } from "express";
import { SessionUser } from "../types/express";
import { AuthService } from "./service";

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<SessionUser> {
  return Promise.resolve({ id: "s1" });
  //   return new AuthService().check(request.headers.authorization, scopes);
}
