import { NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    lastReset: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  windowMs: number;  // Time window in milliseconds
  max: number;       // Max requests per window
  message?: string;  // Custom error message
}

export function rateLimit(config: RateLimitConfig) {
  return async (req: Request): Promise<NextResponse | null> => {
    const ip = req.headers.get('x-forwarded-for') ||
                req.headers.get('x-real-ip') ||
                'unknown';

    const now = Date.now();
    const windowStart = now - config.windowMs;

    // Initialize or reset if window expired
    if (!store[ip] || store[ip].lastReset < windowStart) {
      store[ip] = {
        count: 0,
        lastReset: now
      };
    }

    // Increment request count
    store[ip].count++;

    // Check if limit exceeded
    if (store[ip].count > config.max) {
      return NextResponse.json(
        {
          error: config.message || 'Too many requests, please try again later.',
          retryAfter: Math.ceil(config.windowMs / 1000)
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(config.windowMs / 1000)),
            'X-RateLimit-Limit': String(config.max),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(store[ip].lastReset + config.windowMs).toISOString()
          }
        }
      );
    }

    return null; // Request is allowed
  };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  const oneHourAgo = now - 3600000;

  for (const ip in store) {
    if (store[ip].lastReset < oneHourAgo) {
      delete store[ip];
    }
  }
}, 300000); // Run every 5 minutes
