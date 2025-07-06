import { test, beforeAll, afterAll, expect } from 'vitest';
import supertest from 'supertest';
import * as http from 'http';

import * as db from './db';
import app from '../src/app';

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

let request;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll(() => {
  db.shutdown();
  server.close();
});

export interface Member {
  email: string;
  password: string;
}

const user: Member = {
  email: 'test@gmail.com',
  password: 'testuser',
};

test('Swagger UI is available', async () => {
  await request.get('/api/v0/docs/').expect(200);
});

test('User tries to login without credentials', async () => {
  await request.post('/api/v0/login').expect(400);
});

test('User tries login with missing password', async () => {
  await request.post('/api/v0/login').send({ email: user.email }).expect(400);
});

test('User tries login with missing email', async () => {
  await request
    .post('/api/v0/login')
    .send({ password: 'password' })
    .expect(400);
});

test('User tries login with wrong password', async () => {
  await request
    .post('/api/v0/login')
    .send({ email: user.email, password: 'incorrect' })
    .expect(401);
});

test('User successfully logs in', async () => {
  await request
    .post('/api/v0/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body).toHaveProperty('accessToken');
    });
});
