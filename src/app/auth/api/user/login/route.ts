import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const response = {
    isSuccess: true,
    message: 'string',
    status: 0,
    data: {
      accessToken: 'thisisaccessToken',
      refreshToken: 'thisisrefreshToken',
    },
  };
  return NextResponse.json(response, { status: 200 });
}
