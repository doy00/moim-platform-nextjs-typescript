// import axiosInstance from './axiosInstance';
// import { ILogin, ILoginResponse } from '@/types/mypage/login';

// export const login = async (login: ILogin): Promise<ILoginResponse> => {
//   const response = await axiosInstance.post('/user/login', login);
//   console.log(response.data);
//   return response.data;
// };

import axiosInstance from '@/apis/auth/axios.api';

interface IEnrollMoim {
  moim_json: string;
  moim_image: File;
}

interface IEnrollMoimResponse {
  moimId: string;
  title: string;
  content: string;
  address: string;
  recruitmentDeadline: Date;
  startDate: Date;
  endDate: Date;
  minParticipants: number;
  maxParticipants: number;
  moimType: 'PROJECT' | 'STUDY' | 'INTERVIEW';
  status: 'RECRUIT' | 'PROGRESS' | 'END';
  likes: number;
  participants: number;
  reviewsCount: number;
  participantsMoims: any[]; // 필요한 경우 더 구체적인 타입 정의 가능
  reviews: any[]; // 필요한 경우 더 구체적인 타입 정의 가능
}

export const enrollMoim = async (moim: IEnrollMoim): Promise<IEnrollMoimResponse> => {
  const formData = new FormData();
  formData.append('moim_json', moim.moim_json);
  formData.append('moim_image', moim.moim_image);

  const response = await axiosInstance.post('/moim/enroll', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const mockMoimData = {
  title: '프로젝트 만들어요',
  content: '프로젝트 만들어요',
  address: '서울시 강남구',
  recruitmentDeadline: new Date('2025-02-05'),
  startDate: new Date('2025-02-05'),
  endDate: new Date('2025-02-11'),
  minParticipants: 3,
  maxParticipants: 5,
  moimType: 'PROJECT' as const,
  status: 'RECRUIT' as const,
};

// 이미지 파일 생성 (테스트용 빈 파일)
const mockImageFile = new File([''], 'mock-image.png', { type: 'image/png' });

// API 요청용 데이터
const requestData = {
  moim_json: JSON.stringify(mockMoimData),
  moim_image: mockImageFile,
};

try {
  const response = await enrollMoim(requestData);
  console.log('생성된 모임:', response);
} catch (error) {
  console.error('모임 생성 실패:', error);
}
