// 모임 상세 조회 API 요청
import { axiosInstance } from './axios.api';
import { IMoimDetail, ILikeResponse, ILikedMoimsResponse } from '@/types/detail/t-moim';

// 모임 상세 데이터(모임정보, 참여자, 리뷰) 전체 조회
export const getDetail = async (moimId: string): Promise<IMoimDetail> => {
  try {
    return await axiosInstance.get(`/api/moims/${moimId}`);
    // const response = await axiosInstance.get(`/api/moims/${moimId}`)
    // return response.data;
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

// 특정 모임 찜 상태 조회 후 찜하기
export const likeApi = {
  // checkLike: async (moimId: string): Promise<ILikeResponse> => {
  //   return await axiosInstance.get(`/api/moims/${moimId}/like`);
  // },
  
  // getMyLikes: async (page: number = 1): Promise<MyLikesListResponse> => {
  getMyLikes: async (page: number = 1): Promise<ILikedMoimsResponse> => {
    return await axiosInstance.get(`/api/moims/liked?page=${page}`);
    // try {
    //   return await axiosInstance.get(`/api/moims/liked?page=${page}`);
    // } catch (error: any) {
    //   console.error('특정 모임 찜 상태 조회 실패', error);
    //   throw error;
    // } 
  },

  like: async (moimId: string): Promise<ILikeResponse> => {
    return await axiosInstance.post(`/api/moims/${moimId}/like`);
  },

  unlike: async (moimId: string): Promise<ILikeResponse> => {
    return await axiosInstance.delete(`/api/moims/${moimId}/like`);
  },
};