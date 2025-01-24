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
    // throw {
    //   isSuccess: false,
    //   message: error.response?.data?.message || '모임상세 데이터를 불러오는데 실패했습니다.',
    //   status: error.response?.status || 500,
    //   data: null
    // }
    // return null;    // 데이터 없을 때 임시로 ui만 렌더링
    throw error;    // 쿼리에서 에러 처리
  }
};


// 모임 신청하기
export const joinMoim = async (moimId: number): Promise<void> => {
  await axiosInstance.post(`/moim/join?moimId=${moimId}`);
};

// 모임 신청 취소하기
export const leaveMoim = async (moimId: number): Promise<void> => {
  await axiosInstance.delete(`/moim/join?moimId=${moimId}`)
}

// [ ] 모임 취소하기(주최자)
// export const cancelMoim = async (id: number): Promise<void> => {
//   await axiosInstance.put(`/moim/create`);
// }