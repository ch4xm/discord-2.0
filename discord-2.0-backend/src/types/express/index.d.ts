export interface SessionUser {
  id: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: SessionUser;
    }
  }
}
