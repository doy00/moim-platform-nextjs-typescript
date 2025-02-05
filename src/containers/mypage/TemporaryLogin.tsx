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

import { enrollMoim } from '@/apis/login';

const createNewMoim = async (moimData: any, imageFile: File) => {
  try {
    const moimRequest = {
      moim_json: JSON.stringify(moimData),
      moim_image: imageFile,
    };

    const response = await enrollMoim(moimRequest);
    console.log('모임이 생성되었습니다:', response);
  } catch (error) {
    console.error('모임 생성 중 오류 발생:', error);
  }
};

export const mockMoimList = [
  {
    moimId: 'mock1',
    title: '리액트 스터디',
    content: '리액트 기초부터 심화까지 함께 공부해요',
    address: '서울시 강남구',
    recruitmentDeadline: new Date('2025-02-05'),
    startDate: new Date('2025-02-05'),
    endDate: new Date('2025-02-11'),
    minParticipants: 3,
    maxParticipants: 5,
    moimType: 'STUDY' as const,
    status: 'RECRUIT' as const,
    likes: 1,
    participants: 1,
    reviewsCount: 0,
    participantsMoims: [],
    reviews: [],
  },
  {
    moimId: 'mock2',
    title: '타입스크립트 프로젝트',
    content: '실전 프로젝트로 타입스크립트 마스터하기',
    address: '서울시 서초구',
    recruitmentDeadline: new Date('2025-03-01'),
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-03-15'),
    minParticipants: 4,
    maxParticipants: 6,
    moimType: 'PROJECT' as const,
    status: 'RECRUIT' as const,
    likes: 2,
    participants: 2,
    reviewsCount: 0,
    participantsMoims: [],
    reviews: [],
  },
  {
    moimId: 'mock3',
    title: '프론트엔드 면접 스터디',
    content: '기술 면접 준비를 함께해요',
    address: '서울시 송파구',
    recruitmentDeadline: new Date('2025-02-20'),
    startDate: new Date('2025-02-20'),
    endDate: new Date('2025-02-28'),
    minParticipants: 2,
    maxParticipants: 4,
    moimType: 'INTERVIEW' as const,
    status: 'RECRUIT' as const,
    likes: 3,
    participants: 1,
    reviewsCount: 0,
    participantsMoims: [],
    reviews: [],
  },
];
