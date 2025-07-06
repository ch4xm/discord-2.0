export interface Credentials {
  email: Email;
  password: string;
}

export interface Authenticated {
  accessToken: string;
}

/**
 * @format email
 * @pattern .+@.+
 */
export type Email = string;
