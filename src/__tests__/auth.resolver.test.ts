import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { register, login } from '../resolvers/auth.resolver';
import { MyContext } from '../types/MyContext';
import { Request, Response } from 'express';

let mongod: MongoMemoryServer;
let ipCounter = 0;

const makeCtx = (): MyContext => ({
  req: {
    ip: `127.0.0.${++ipCounter}`,
    socket: { remoteAddress: `127.0.0.${ipCounter}` },
  } as unknown as Request,
  res: {} as Response,
});

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
}, 120000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
}, 30000);

afterEach(async () => {
  await mongoose.connection.dropDatabase();
});

describe('register', () => {
  it('returns error for invalid email', async () => {
    const result = await register(
      null,
      { input: { username: 'u', email: 'bad', password: 'password123' } },
      makeCtx(),
      null as any
    );
    expect(result.error.code).toBe('INVALID_INPUT');
    expect(result.error.httpStatus).toBe(400);
  });

  it('returns error for short password', async () => {
    const result = await register(
      null,
      { input: { username: 'u', email: 'u@test.com', password: '123' } },
      makeCtx(),
      null as any
    );
    expect(result.error.code).toBe('INVALID_INPUT');
    expect(result.error.message).toMatch(/8 characters/);
  });

  it('creates user and returns token', async () => {
    const result = await register(
      null,
      { input: { username: 'alice', email: 'alice@test.com', password: 'password123' } },
      makeCtx(),
      null as any
    );
    expect(result.error).toBeNull();
    expect(result.token).toBeTruthy();
    expect(result.user.username).toBe('alice');
    expect(result.httpStatus).toBe(201);
  });

  it('returns error when user already exists', async () => {
    const input = { username: 'bob', email: 'bob@test.com', password: 'password123' };
    await register(null, { input }, makeCtx(), null as any);
    const result = await register(null, { input }, makeCtx(), null as any);
    expect(result.error.code).toBe('USER_ALREADY_EXISTS');
  });
});

describe('login', () => {
  beforeEach(async () => {
    await register(
      null,
      { input: { username: 'charlie', email: 'charlie@test.com', password: 'password123' } },
      makeCtx(),
      null as any
    );
  });

  it('returns token for valid credentials', async () => {
    const result = await login(
      null,
      { input: { email: 'charlie@test.com', password: 'password123' } },
      makeCtx(),
      null as any
    );
    expect(result.error).toBeNull();
    expect(result.token).toBeTruthy();
  });

  it('returns error for wrong password', async () => {
    const result = await login(
      null,
      { input: { email: 'charlie@test.com', password: 'wrongpass' } },
      makeCtx(),
      null as any
    );
    expect(result.error.code).toBe('INVALID_CREDENTIALS');
    expect(result.error.httpStatus).toBe(401);
  });

  it('returns error for unknown email', async () => {
    const result = await login(
      null,
      { input: { email: 'nobody@test.com', password: 'password123' } },
      makeCtx(),
      null as any
    );
    expect(result.error.code).toBe('INVALID_CREDENTIALS');
  });

  it('returns error for invalid email format', async () => {
    const result = await login(
      null,
      { input: { email: 'notanemail', password: 'password123' } },
      makeCtx(),
      null as any
    );
    expect(result.error.code).toBe('INVALID_INPUT');
  });
});
