// 모임 상세 조회 API 요청
import { axiosInstance } from './axios.api';
import { ApiDetailResponse } from '@/types/detail/i-moim';

// 모임 상세 데이터(모임정보, 참여자 수, 리뷰) 전체 조회
export const getDetail = async (moimId: number, token?: string) 
: Promise<ApiDetailResponse | null> => {

  try {
    // SSR시 쿠키에서 토큰 가져오기
    const response = await axiosInstance.get(`/moim/detail/${moimId}`, {
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : undefined
    });
    return response.data;
  } catch (error: any) {
    console.error('API error 모임 상세 전체 데이터 호출:', error.response || error);
    throw error;    // 쿼리에서 에러 처리
  }
};


// 모임 신청하기
export const joinMoim = async (moimId: number): Promise<void> => {
  await axiosInstance.post(`/moim/join?moimId=${moimId}`);
};

// 모임 신청 취소하기
export const leaveMoim = async (moimId: number): Promise<void> => {
  await axiosInstance.post(`/moim/join?moimId=${moimId}`)
}
