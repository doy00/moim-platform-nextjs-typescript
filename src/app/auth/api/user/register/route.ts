import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password, nickname, position, introduction, tags } = await req.json();

  const response = {
    isSuccess: true,
    message: 'string',
    status: 0,
    data: {
      email,
      password,
      nickname,
      position,
      introduction,
      tags,
    },
  };

  return NextResponse.json(response, { status: 200 });
}
