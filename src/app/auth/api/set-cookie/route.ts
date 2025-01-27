import { setCookie } from '@/utils/auth/auth-server.util';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { accessToken, refreshToken } = body;

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  await setCookie({
    name: 'accessToken',
    value: accessToken,
    maxAge: 60 * 60,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  await setCookie({
    name: 'refreshToken',
    value: refreshToken,
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return NextResponse.json({ message: 'success' });
}
