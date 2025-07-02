
export interface SessionUser {
  id: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles?: string[];
}

declare global {
  namespace Express {
    export interface Request {
      user: SessionUser;
    }
  }
}
