// 'use client';

// import { login } from '@/apis/login';
// import { ILogin } from '@/types/mypage/login';
// import { useRouter } from 'next/navigation';
// import { setCookie, getCookie } from 'cookies-next';

// const MOCK_LOGIN: ILogin = {
//   email: 'dude@email.com',
//   password: 'test1234',
// };

// export default function TemporaryLogin() {
//   const router = useRouter();

//   const handleLogin = async () => {
//     const response = await login(MOCK_LOGIN);

//     const token = response.data.accessToken;

//     setCookie('accessToken', token, { path: '/' });
//     router.push('/mypage');
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button onClick={handleLogin}>로그인</button>
//     </div>
//   );
// }
