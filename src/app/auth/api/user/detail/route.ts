import { headers } from 'next/headers';

export async function GET() {
  const headersList = await headers();
  const token = headersList.get('Authorization');

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

  console.log(token);
}
