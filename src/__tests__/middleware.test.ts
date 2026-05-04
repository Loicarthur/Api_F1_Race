import { requireAuth, requireAdmin } from '../middleware/auth';
import { MyContext } from '../types/MyContext';
import { Request, Response } from 'express';

const makeContext = (user?: Partial<{ id: string; role: string }>): MyContext => ({
  req: {} as Request,
  res: {} as Response,
  user: user as any,
});

describe('requireAuth', () => {
  it('throws when context is undefined', () => {
    expect(() => requireAuth(undefined)).toThrow('Authentication required');
  });

  it('throws when context has no user', () => {
    expect(() => requireAuth(makeContext())).toThrow('Authentication required');
  });

  it('returns user when authenticated', () => {
    const ctx = makeContext({ id: '123', role: 'user' });
    expect(requireAuth(ctx)).toEqual(ctx.user);
  });
});

describe('requireAdmin', () => {
  it('throws when not authenticated', () => {
    expect(() => requireAdmin(undefined)).toThrow('Authentication required');
  });

  it('throws when user is not admin', () => {
    expect(() => requireAdmin(makeContext({ id: '123', role: 'user' }))).toThrow(
      'Admin access required'
    );
  });

  it('returns user when admin', () => {
    const ctx = makeContext({ id: '123', role: 'admin' });
    expect(requireAdmin(ctx)).toEqual(ctx.user);
  });
});
