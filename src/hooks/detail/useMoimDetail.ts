// 데이터 상태를 관리하는 Tanstack query 커스텀 훅
import { getDetail } from '@/apis/detail/detail.api';
import { ApiDetailResponse, IMoimDetail } from '@/types/detail/i-moim';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../auth/auth.hook';

// 커스텀 훅의 반환 타입 정의
interface MoimDetailResult {
  detail: IMoimDetail | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const useMoimDetail = (moimId: number, tokekn?: string): MoimDetailResult => {
  const { me, isMeLoading } = useAuth();
  
  const detailQuery = useQuery<ApiDetailResponse | null, Error>({
    queryKey: ['detail', moimId],
    queryFn: () => getDetail(moimId),
    staleTime: 1000 * 60 * 5,
    enabled: !!me,    // 로그인 확인되었을 때만 쿼리 실행
    retry: false,
  });

  return {
    detail: detailQuery.data?.data,
    isLoading: detailQuery.isLoading,
    error: detailQuery.error,
  };
};
