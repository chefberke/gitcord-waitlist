import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Waitlist from '@/models/Waitlist';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if email already exists
    const existingEmail = await Waitlist.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Create new waitlist entry
    const newEntry = await Waitlist.create({ email });

    // Get updated count
    const count = await Waitlist.countDocuments();

    return NextResponse.json(
      {
        message: 'Successfully joined waitlist',
        email: newEntry.email,
        count
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
