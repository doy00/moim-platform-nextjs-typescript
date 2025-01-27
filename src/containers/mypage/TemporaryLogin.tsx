'use client';

import { login } from '@/apis/login';
import { ILogin } from '@/types/mypage/login';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

const MOCK_LOGIN: ILogin = {
  email: 'test@email.com',
  password: 'test1234',
};

export default function TemporaryLogin() {
  const router = useRouter();

  const handleLogin = async () => {
    const response = await login(MOCK_LOGIN);
    console.log('로그인 응답:', response);

    const token = response.data?.token || response.token;
    console.log('토큰값:', token);

    setCookie('accessToken', token, { path: '/' });
    router.push('/mypage');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
