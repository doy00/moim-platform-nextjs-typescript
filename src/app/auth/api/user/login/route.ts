import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email !== 'test@test.com' || password !== 'xptmxm!12') {
    return NextResponse.json(
      { code: 'INVALID_CREDENTIALS', message: '비밀번호를 확인해주세요' },
      { status: 401 },
    );
  }

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
