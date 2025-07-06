import * as jwt from 'jsonwebtoken';
import { Authenticated, Credentials } from '.';
import { pool } from '../db';
import { SessionUser, User } from '../types/express';

export class AuthService {
  public async login(credentials: Credentials): Promise<Authenticated | null> {
    const user = await this.validateCredentials(credentials);
    if (!user) {
      return null;
    }
    const accessToken = await this.token(user.id);

    return { accessToken: accessToken };
  }

  public async check(auth?: string): Promise<SessionUser> {
    return new Promise((resolve, reject) => {
      if (!auth) {
        reject(new Error('Unauthorized'));
        return;
      }
      const token = auth.split(' ')[1];
      jwt.verify(
        token,
        `${process.env.MASTER_SECRET}`,
        async (err: jwt.VerifyErrors | null, decoded?: object | string) => {
          const id = decoded as SessionUser;
          if (err) {
            reject(err);
            return;
          }
          const user = await this.getUserById(id.id);
          if (user) {
            resolve({ id: user.id });
          }
          reject(new Error('Unauthorized'));
        }
      );
    });
  }

  private async validateCredentials(
    credentials: Credentials
  ): Promise<SessionUser | null> {
    const { email, password } = credentials;
    const query = `
      SELECT id FROM users
      WHERE email = $1 AND password = crypt($2, password);
    `;

    const { rows } = await pool.query(query, [email, password]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as SessionUser;
  }

  private async getUserById(id: string): Promise<User | null> {
    const query = `
      SELECT id, username, email, avatar
      FROM users
      WHERE id = $1`;

    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      return null;
    }

    return rows[0] as User;
  }

  private async token(id: string): Promise<string> {
    const accessToken = jwt.sign({ id: id }, `${process.env.MASTER_SECRET}`, {
      expiresIn: '6h',
      algorithm: 'HS256',
    });
    return accessToken;
  }
}
