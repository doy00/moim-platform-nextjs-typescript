import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const headersList = await headers();
  const token = headersList.get('Authorization');

  if (!token) {
    return NextResponse.json(
      { isSuccess: false, message: 'Unauthorized', status: 401, data: null },
      { status: 401 },
    );
  }

  const response = {
    isSuccess: true,
    message: 'string',
    status: 0,
    data: {
      email: 'bdohhhhh@gmail.com',
      nickname: '오은',
      position: 'frontend',
      introduction: '안녕하세요',
      tags: ['react', 'typescript', 'nextjs'],
    },
  };

  return NextResponse.json(response, { status: 200 });
}
