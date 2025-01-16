// API 요청 함수

import { IMoimDetail } from '@/types/detail/i-moim';
import { axiosInstance } from './axios.api';
import type { IDetailInfo, IParticipant, IDetailReview, IDetailReviewResponse } from '@/types/detail';

// 모임 정보 조회
export const getDetailInfo = async (id: number): Promise<IMoimDetail> => {
  try {
    const response = await axiosInstance.get(`/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error('Info를 불러오는데 실패했습니다:', error);
    throw error;
  }
};

// 모임 참여자 목록 조회
export const getParticipants = async (id: number): Promise<IParticipant[]> => {
  try {
    const response = await axiosInstance.get<IParticipant[]>(`/detail/${id}/participants`);
    return response.data;  
  } catch (error) {
    console.error('Participants를 불러오는데 실패했습니다:', error);
    throw error;
  }
};

// 모임 리뷰 목록 조회
export const getDetailReviews = async (
  id: number,
  // params: { limit?: number; offset?: number}  
): Promise<IDetailReviewResponse> => {
  try {
    const response = await axiosInstance.get<IDetailReviewResponse>(`/detail/${id}/review`);
    return response.data;  
  } catch (error) {
    console.error('Reviews를 불러오는데 실패했습니다:', error);
    throw error;
  }
};

// 모임 신청하기
export const joinMoim = async (id: number): Promise<void> => {
  await axiosInstance.post(`/detail/${id}/join`);
};

// 모임 신청 취소하기
export const leaveMoim = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/detail/${id}/leave`)
}

// 모임 취소하기(주최자)
export const cancelMoim = async (id: number): Promise<void> => {
  await axiosInstance.put(`/detail/${id}/cancel`);
}