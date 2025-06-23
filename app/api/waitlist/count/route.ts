import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Waitlist from '@/models/Waitlist';
import { rateLimit } from '@/lib/rate-limit';

// Rate limiting configuration - more permissive for count endpoint
const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute per IP
  message: 'Too many requests. Please try again in a minute.'
});

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await rateLimiter(request);
    if (rateLimitResponse) return rateLimitResponse;

    await dbConnect();

    const count = await Waitlist.countDocuments();

    // Set cache headers for production
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    // Cache for 10 seconds in production
    if (process.env.NODE_ENV === 'production') {
      headers.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=30');
    }

    return NextResponse.json(
      {
        success: true,
        data: { count }
      },
      {
        status: 200,
        headers
      }
    );
  } catch (error) {
    console.error('Count error:', error);

    // Don't expose internal error details in production
    const errorMessage = process.env.NODE_ENV === 'production'
      ? 'An error occurred. Please try again later.'
      : `Internal server error: ${error}`;

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Add OPTIONS method for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
