import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Waitlist from '@/models/Waitlist';

export async function GET() {
  try {
    await dbConnect();

    const count = await Waitlist.countDocuments();

    return NextResponse.json(
      { count },
      { status: 200 }
    );
  } catch (error) {
    console.error('Count error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
