// 데이터 상태를 관리하는 Tanstack query 커스텀 훅

import { useQuery } from "@tanstack/react-query";
import { getDetailInfo, getParticipants, getDetailReviews, joinMoim, cancelMoim } from "@/apis/detail/detail.api";

export const useMoimDetail = (id: number) => {
  // 모임 정보 조회
  const {
    data: info,
    isLoading: isInfoLoading,
    error: infoError,
  } = useQuery({
    queryKey: ['detail-info', id],
    queryFn: () => getDetailInfo(id),
  });

  // 참여자 목록 조회
  const {
    data: participants,
    isLoading: isParticipantsLoading,
    error: participantsError
  } = useQuery({
    queryKey: ['detail-participants', id],
    queryFn: () => getParticipants(id),
  });

  // 리뷰 목록 조회
  const {
    data: reviews,
    isLoading: isReviewsLoading,
    error: reviewsError
  } = useQuery({
    queryKey: ['detail-reviews', id],
    queryFn: () => getDetailReviews(id),
  });

  const isLoading = isInfoLoading || isParticipantsLoading || isReviewsLoading;
  const error = infoError || participantsError || reviewsError;

  return {
    info,
    participants,
    reviews,
    isLoading,
    error,
  };
};