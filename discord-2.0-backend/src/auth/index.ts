export interface Credentials {
  email: Email;
  password: string;
}

export interface Authenticated {
  name: string;
  accessToken: string;
}

/**
 * @format email
 * @pattern .+@.+
 */
export type Email = string;
