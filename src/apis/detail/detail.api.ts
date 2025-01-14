// API 요청 함수

import { axiosInstance } from './axios.api';
import type { IDetailInfo, IParticipant, IDetailReview } from '@/types/detail';

// 모임 정보 조회
export const getDetailInfo = async (id: number): Promise<IDetailInfo> => {
  const response = await axiosInstance.get(`/gatherings/${id}`);
  return response.data;
};

// 모임 참여자 목록 조회
export const getParticipants = async (id: number): Promise<IParticipant[]> => {
  const response = await axiosInstance.get<IParticipant[]>(`/gathering/${id}/participants`);
  return response.data;
};

// 모임 리뷰 목록 조회
export const getDetailReviews = async (
  id: number,
  params: { limit?: number; offset?: number}
): Promise<IDetailReview[]> => {
  const response = await axiosInstance.get<IDetailReview[]>(`/reviews/${id}`, { 
    params: {
      ...params,
      gatheringId: id, 
    },
  });
  return response.data;
}

// 모임 신청하기
export const joinMoim = async (id: number): Promise<void> => {
  await axiosInstance.post(`/gatherings/${id}/join`);
};

// 모임 취소하기
export const cancelMoim = async (id: number): Promise<void> => {
  await axiosInstance.put(`/gatherings/${id}/cancel`);
}