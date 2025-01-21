// API 요청 함수
import { axiosInstance } from './axios.api';
import { ApiDetailResponse } from '@/types/detail/i-moim';

// 모임 상세 데이터(모임정보, 참여자 수, 리뷰) 전체 조회
export const getDetail = async (id: number): Promise<ApiDetailResponse | null> => {
  try {
    const response = await axiosInstance.get<ApiDetailResponse>(`/moim/detail/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('API error 모임 상세 전체:', error.response || error);
    // throw {
    //   isSuccess: false,
    //   message: error.response?.data?.message || '모임상세 데이터를 불러오는데 실패했습니다.',
    //   status: error.response?.status || 500,
    //   data: null
    // }
    return null;
  }
};


// 모임 참여자 목록 조회
// export const getParticipants = async (id: number): Promise<ApiResponse<IParticipant[]>> => {
//   try {
//     const response = await axiosInstance.get<IParticipant[]>(`/moim/detail/${id}/participants`);
//     return {
//       data: response.data,
//     };
//   } catch (error) {
//     console.error('Participants를 불러오는데 실패했습니다:', error);
//     throw error;
//   }
// };

// 모임 신청하기
export const joinMoim = async (id: number): Promise<void> => {
  await axiosInstance.post(`/moim/detail/${id}/join`);
};

// 모임 신청 취소하기
export const leaveMoim = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/moim/detail/${id}/leave`)
}

// 모임 취소하기(주최자)
// export const cancelMoim = async (id: number): Promise<void> => {
//   await axiosInstance.put(`/moim/detail/${id}/cancel`);
// }