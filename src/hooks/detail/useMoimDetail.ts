// 데이터 상태를 관리하는 Tanstack query 커스텀 훅
import { getDetail } from '@/apis/detail/detail.api';
import { IMoimDetail } from '@/types/detail/t-moim';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../auth/auth.hook';

interface ApiResponse<T> {
  data: T;
  message?: string;
}

// 가공된 데이터 타입 정의
interface ProcessedMoimDetail extends IMoimDetail {
  formattedAddress: string;
  formattedDateTime: string;
  participantCount: number;
}

interface UseMoimDetailOptions {
  enabled?: boolean;
}
  
export const useMoimDetail = (moimId: string, options: UseMoimDetailOptions= {}) => {
  const { me, isMeLoading } = useAuth();
  
  const { data, isLoading, error } = useQuery<IMoimDetail>({
    queryKey: ['detail', moimId],
    queryFn: () => getDetail(moimId),
    enabled: options.enabled,
  });

  // 데이터 처리 로직
  const processedData: ProcessedMoimDetail | null = data ? {
    ...data,
    formattedAddress: data.address,                                // 모임 장소 지역
    formattedDateTime: new Date(data.startDate).toLocaleString(),  // 모집 시작 날짜
    participantCount: data.participants,                           // 참여 인원 수
// 모집 마감 날짜
// 정원
  } : null;

  return {
    detail: processedData,
    isLoading,
    error
  };
};
