import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date();
  return NextResponse.json({
    timestamp: now.toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 3 }),
    iso: now.toISOString(),
    randomId: Math.random().toString(36).substring(2, 8).toUpperCase()
  });
}
