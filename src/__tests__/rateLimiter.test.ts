import { checkRateLimit } from '../utils/rateLimiter';

describe('checkRateLimit', () => {
  it('allows requests under the limit', () => {
    expect(() => checkRateLimit('test-key-allow', 3, 60_000)).not.toThrow();
    expect(() => checkRateLimit('test-key-allow', 3, 60_000)).not.toThrow();
    expect(() => checkRateLimit('test-key-allow', 3, 60_000)).not.toThrow();
  });

  it('throws after exceeding the limit', () => {
    const key = 'test-key-exceed';
    checkRateLimit(key, 2, 60_000);
    checkRateLimit(key, 2, 60_000);
    expect(() => checkRateLimit(key, 2, 60_000)).toThrow('Too many attempts');
  });

  it('resets after the window expires', () => {
    const key = 'test-key-reset';
    checkRateLimit(key, 1, 1); // window = 1ms
    // wait 5ms for the window to expire
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(() => checkRateLimit(key, 1, 1)).not.toThrow();
        resolve();
      }, 5);
    });
  });
});
