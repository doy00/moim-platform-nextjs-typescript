// 모임 상세 조회 API 요청
import { axiosInstance } from './axios.api';
import { IMoimDetail } from '@/types/detail/t-moim';

// 모임 상세 데이터(모임정보, 참여자, 리뷰) 전체 조회
export const getDetail = async (moimId: string): Promise<IMoimDetail> => {
  try {
    return await axiosInstance.get(`/api/moims/${moimId}`);   // 인터셉트가 처리한 데이터를 그대로 반환
  } catch (error: any) {
    console.error('API error 모임 상세 데이터 조회 실패:', error);
    throw error;    // 쿼리에서 에러 처리
  }
};

// 모임 참여하기
export const joinMoim = async (moimId: string): Promise<void> => {
  await axiosInstance.post(`/api/moims/${moimId}/join`);
};

// 모임 신청 취소하기
export const leaveMoim = async (moimId: string): Promise<void> => {
  await axiosInstance.delete(`/api/moims/${moimId}/leave`);
};

// 찜하기
export const likeMoim = async (moimId: string): Promise<void> => {
  await axiosInstance.post(`/api/moims/${moimId}/like`);
};

// 찜하기 취소
export const unlikeMoim = async (moimId: string): Promise<void> => {
  await axiosInstance.delete(`/api/moims/${moimId}/like`);
};
